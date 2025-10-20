import { useEffect, useRef, useState } from "react";

function useCountdown(init: number, cb: () => void, enabled: boolean) {
  const [state, setState] = useState(init);
  const timeout = useRef<any>(null);
  const cbRef = useRef<any>(null);
  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);
  useEffect(() => {
    if (enabled && state < 1) {
      cbRef.current?.();
    }
    if (!enabled || state < 1) {
      clearTimeout(timeout.current);
      return;
    }
    timeout.current = setTimeout(() => {
      setState((s) => s - 1);
    }, 1000);
  }, [state, enabled])
  return [state];
}

export default useCountdown;