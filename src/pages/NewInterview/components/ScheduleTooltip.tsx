import * as Tooltip from '@radix-ui/react-tooltip';
import { type DateArg, differenceInMinutes } from 'date-fns';
import { BiSolidCalendarCheck } from 'react-icons/bi';
import { MdPlace } from 'react-icons/md';

import { partNameKo } from '@/pages/NewInterview/type';
import { formatSemester } from '@/pages/NewInterview/utils/semester';
import { Applicant } from '@/query/applicant/schema';
import { LocationType } from '@/types/location';
import { formatTemplates } from '@/utils/date';
import { cn } from '@/utils/dom';

const tooltipShadow =
  '0 0 0 1px rgba(2,32,71,0.05), 0 10px 30px 0 rgba(2,32,71,0.05), 0 20px 40px 0 rgba(0,23,51,0.02)';

interface ScheduleTooltipProps {
  actionTextContent?: string;
  applicant: Applicant;
  contentProps?: Tooltip.TooltipContentProps;
  endTime: DateArg<Date>;
  /**
   * draft(임시) 일정에는 장소 정보가 없으므로 optional.
   * locationType 과 locationDetail 이 모두 없으면 장소 row를 렌더링하지 않습니다.
   */
  locationDetail?: null | string;
  locationType?: LocationType;
  startTime: DateArg<Date>;
}

export const ScheduleTooltip = ({
  applicant,
  children,
  actionTextContent,
  startTime,
  endTime,
  locationType,
  locationDetail,
  contentProps,
}: React.PropsWithChildren<ScheduleTooltipProps>) => {
  const duration = differenceInMinutes(endTime, startTime);
  const locationText = locationDetail || locationType;
  const { className, style, ...restContentProps } = contentProps ?? {};

  return (
    <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            align="start"
            className={cn('z-20 min-w-60 rounded-[14px] bg-[#ffffff] px-5.5 py-4.5', className)}
            side="bottom"
            sideOffset={5}
            style={{ boxShadow: tooltipShadow, ...style }}
            {...restContentProps}
          >
            <div className="flex flex-col gap-4.5 text-[15px]">
              <div className="flex flex-col gap-0.5">
                <div className="text-[17px] font-semibold">{applicant.name}</div>
                <div className="text-[13px] text-[#6b7684]">
                  {applicant.age}세 · {formatSemester(applicant.semester)}
                </div>
                <div className="text-[13px] text-[#6b7684]">
                  <span>{partNameKo[applicant.part as keyof typeof partNameKo]} 파트</span>
                  <span className="ml-1">
                    {formatTemplates['1월 1일'](applicant.applicationDate)}에 지원
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <BiSolidCalendarCheck className="size-6 text-[#8b95a1]" />
                  <span>
                    {formatTemplates['1월 1일 (월) 23:00'](startTime)} ~{' '}
                    {formatTemplates['23:00'](endTime)} ({duration}분)
                  </span>
                </div>
                {locationText && (
                  <div className="flex items-center gap-2">
                    <MdPlace className="size-6 text-[#8b95a1]" />
                    <span>{locationText}</span>
                  </div>
                )}
              </div>
              {actionTextContent && (
                <span className="text-[13px] text-[#4a3fe0]">{actionTextContent}</span>
              )}
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
