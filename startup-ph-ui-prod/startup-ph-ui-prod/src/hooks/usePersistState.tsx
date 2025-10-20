import { isEqual } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

export const storage = {
  get: (key: string, value: any) => {
    try {
      const l1 = JSON.parse(sessionStorage.getItem(key) ?? '');
      return typeof l1 === 'string' ? JSON.parse(l1) : l1 || value;
    } catch (err) {
      return value;
    }
  },
  set: (key: string, newValue: any) => {
    sessionStorage.setItem(key, JSON.stringify(newValue));
  },
  remove: (key: string) => {
    sessionStorage.removeItem(key);
  },
};

function usePersistState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState(storage.get(key, defaultValue));
  const currentValue = useRef(storage.get(key, defaultValue));
  const setter = useCallback(
    (newValue: any) => {
      const v = typeof newValue === 'function' ? newValue(currentValue?.current) : newValue;
      if (isEqual(v, currentValue?.current)) return;
      storage.set(key, JSON.stringify(v));
      currentValue.current = v;
      setState(newValue);
    },
    [key]
  );
  useEffect(() => {
    return () => {
      storage.remove(key);
    };
  }, [key]);
  return [state, setter];
}

export default usePersistState;
