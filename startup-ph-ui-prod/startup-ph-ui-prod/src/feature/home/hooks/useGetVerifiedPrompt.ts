import { useState, useEffect } from 'react';
import { TStartup } from '../../startup/types';

function useGetVerifiedPrompt(
  data: TStartup | undefined,
  isVerifiable: boolean | string | undefined
) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isVerifiable) {
      const tmr = setTimeout(() => {
        setShow(true);
      }, 200);
      return () => {
        clearTimeout(tmr);
      };
    }
  }, [isVerifiable]);
  return {
    showGetVerified: show,
    toggleGetVerified: setShow,
    isUnverified: data?.status === 'UNVERIFIED',
  };
}

export default useGetVerifiedPrompt;
