import { useEffect } from 'react';

// eslint-disable-next-line
function useOnClickOutside(ref: any, onClick: (v: boolean) => void, byClassName?: string) {
  useEffect(() => {
    // eslint-disable-next-line
    function handleClickOutside(event: any) {
      const isInside = () => {
        if (!byClassName) return false;
        const elms = document.getElementsByClassName(byClassName);
        let l = 0;
        for (let i = 0; i < elms.length; i += 1) {
          const el = elms[i];
          if (el?.contains?.(event.target)) l += 1;
        }
        return l > 0;
      };
      if (ref.current && !ref.current.contains(event.target) && !isInside()) {
        onClick(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClick, byClassName]);
}

export default useOnClickOutside;
