'use client';
import { useEffect } from 'react';
import AOS from 'aos';

function Aos(options: AOS.AosOptions = {}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    AOS.init({
      offset: 150,
      ...options,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default Aos;
