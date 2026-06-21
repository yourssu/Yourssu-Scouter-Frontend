import { useSuspenseQuery } from '@tanstack/react-query';
import { startTransition } from 'react';

import { useSearchState } from '@/hooks/useSearchState';
import { InlineButton } from '@/pages/NewInterview/_ui/InlineButton';
import { divisionColorMap, partColorMap, partNameKo } from '@/pages/NewInterview/type';
import { partOptions } from '@/query/part/options';
import { cn } from '@/utils/dom';
import { objectEntries } from '@/utils/object';

export const PartLegend = () => {
  const [search, setSearch] = useSearchState();
  const { data: parts } = useSuspenseQuery(partOptions());

  const pid = Number(search.get('pid'));

  return (
    <div className="flex items-center gap-1 pt-3">
      {parts
        .filter((part) => part.partName !== 'Head lead')
        .map((part) => {
          const color = partColorMap[part.partName as keyof typeof partColorMap];
          const isActive = pid === part.partId;
          return (
            <InlineButton
              className={cn(
                'flex items-center gap-1.5 text-[13px]',
                isActive ? 'bg-[rgba(2,32,71,0.05)] font-medium text-[#333d4b]' : 'text-[#4e5968]',
              )}
              key={part.partId}
              onClick={() =>
                startTransition(() =>
                  setSearch((prev) => ({
                    ...Object.fromEntries(prev),
                    pid: isActive ? '' : part.partId.toString(),
                  })),
                )
              }
            >
              <div className="size-1.5 rounded-full" style={{ backgroundColor: color.base }} />
              {partNameKo[part.partName as keyof typeof partNameKo]}
            </InlineButton>
          );
        })}
    </div>
  );
};

export const DivisionLegend = () => {
  return (
    <div className="flex items-center gap-3 pt-3">
      {objectEntries(divisionColorMap).map(([division, color]) => (
        <div className="flex items-center gap-1.5" key={division}>
          <div className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-[13px] text-[#4e5968]">{division}</span>
        </div>
      ))}
    </div>
  );
};
