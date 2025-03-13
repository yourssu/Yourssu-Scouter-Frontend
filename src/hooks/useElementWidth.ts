import { useEffect, useRef, useState } from 'react';

export const useElementWidth = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  const updateWidth = () => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }
  };

  useEffect(() => {
    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return { ref, width };
};
