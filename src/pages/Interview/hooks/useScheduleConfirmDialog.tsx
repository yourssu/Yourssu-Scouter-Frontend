import { compareAsc } from 'date-fns';

import { useAlertDialog } from '@/hooks/useAlertDialog';
import { formatTemplates } from '@/utils/date';

interface PastScheduleInfo {
  applicantId: number;
  applicantName: string;
  endTime: string;
  part: string;
  startTime: string;
}

export const useScheduleConfirmDialog = () => {
  const openAlertDialog = useAlertDialog();

  const confirmScheduleSave = async (partName: string, pastSchedules: PastScheduleInfo[]) => {
    if (pastSchedules.length > 0) {
      return await openAlertDialog({
        title: '현재 시간보다 과거인 일정이 있어요',
        content: (
          <div className="flex w-full flex-col gap-4">
            <span className="typo-b2_rg_15 text-text-basicSecondary">
              과거인 일정이 포함되어 있어요. 이대로 저장하시겠어요?
            </span>
            <div className="flex max-h-[200px] w-full flex-col gap-5 overflow-y-auto">
              {pastSchedules
                .toSorted((a, b) => compareAsc(a.startTime, b.startTime))
                .map((schedule) => (
                  <div
                    className="flex w-full items-center justify-between"
                    key={`${schedule.applicantId}-${schedule.startTime}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-bg-basicLight flex h-8 shrink-0 items-center justify-center rounded-[40px] px-3">
                        <span className="typo-b3_rg_14 text-text-basicSecondary text-center">
                          {schedule.applicantName}
                        </span>
                      </div>
                      <p className="typo-b3_sb_14 text-text-basicTertiary truncate">
                        {schedule.part}
                      </p>
                    </div>
                    <p className="typo-b2_rg_15 text-text-basicTertiary truncate">
                      {formatTemplates['01/01(월) 00:00'](new Date(schedule.startTime))} ~{' '}
                      {formatTemplates['23:59'](new Date(schedule.endTime))}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ),
        primaryButtonText: '저장하기',
        secondaryButtonText: '취소',
      });
    }

    return await openAlertDialog({
      title: '선택한 시간표를 저장할까요?',
      content: `${partName} 팀 면접 시간표`,
      primaryButtonText: '저장하기',
      secondaryButtonText: '취소',
    });
  };

  return { confirmScheduleSave };
};
