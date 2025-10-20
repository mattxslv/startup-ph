import { useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

const useDebounceEffect = (fn: (x: any) => void, value: any) => {
  const fnRef = useRef<any>(fn);
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceChange = useCallback(
    debounce((v: any) => {
      fnRef.current(v);
    }, 500),
    []
  );
  useEffect(() => {
    debounceChange(value);
  }, [debounceChange, value]);
};

export default useDebounceEffect;
