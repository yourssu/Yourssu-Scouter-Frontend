import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { partOptions } from '@/query/part/options.ts';

export const usePartFilter = () => {
  const { data: parts } = useSuspenseQuery(partOptions());

  const [partId, setPartId] = useState<null | number>(null);

  const onPartChange = (partName: string) => {
    if (partName === '전체일정 보기') {
      setPartId(null);
      return;
    }
    const partId = parts.find((p) => p.partName === partName)?.partId;
    if (partId) {
      setPartId(partId);
    }
  };

  const partName = parts.find((p) => p.partId === partId)?.partName || '파트 선택';

  return { partId, partName, onPartChange };
};
