import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { partOptions } from '@/query/part/options.ts';

export const usePartFilter = () => {
  const { data: parts } = useSuspenseQuery(partOptions());

  const [partId, setPartId] = useState<null | number>(null);
  const partName = parts.find((p) => p.partId === partId)?.partName ?? null;

  const onPartChange = (partName: null | string) => {
    setPartId(() => parts.find((p) => p.partName === partName)?.partId ?? null);
  };

  return { partId, partName, onPartChange };
};
