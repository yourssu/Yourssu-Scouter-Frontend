import { useEffect, useRef, useState } from 'react';

export const useHasScrollElement = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [hasScroll, setHasScroll] = useState(true);

  const checkForScroll = () => {
    if (ref.current) {
      setHasScroll(ref.current.scrollWidth > ref.current.clientWidth);
    }
  };

  useEffect(() => {
    checkForScroll();

    window.addEventListener('resize', checkForScroll);

    return () => {
      window.removeEventListener('resize', checkForScroll);
    };
  }, []);

  return { ref, hasScroll };
};
