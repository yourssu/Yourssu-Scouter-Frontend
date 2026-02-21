import clsx from 'clsx';
import { assert } from 'es-toolkit';
import { RadioGroup } from 'radix-ui';

import { AutoScheduleSaveButton } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleSaveButton';
import { AutoScheduleThumbnail } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleThumbnail';
import { AutoScheduleCandidate } from '@/pages/Interview/components/AutoScheduleMode/type';
import { InterviewSidebarLayout } from '@/pages/Interview/components/InterviewSidebarLayout';
import { ManualScheduleSidebarMethodCard } from '@/pages/Interview/components/ManualScheduleMode/ManualScheduleSidebarMethodCard';

interface AutoScheduleSidebarProps {
  method: '대면' | '비대면';
  onCandidateChange: (v: AutoScheduleCandidate) => void;
  onChangeMethod: (method: '대면' | '비대면') => void;
  scheduleCandidates: AutoScheduleCandidate[];
  selectedCandidate: AutoScheduleCandidate;
}

export const AutoScheduleSidebar = ({
  method,
  onCandidateChange,
  onChangeMethod,
  scheduleCandidates,
  selectedCandidate,
}: AutoScheduleSidebarProps) => {
  const onValueChange = (value: string) => {
    const target = scheduleCandidates.find(({ id }) => value === id);
    assert(!!target, '생성된 시간표 RadioGroup에 존재하지 않는 시간표가 있어요.');
    onCandidateChange(target);
  };

  return (
    <InterviewSidebarLayout>
      <InterviewSidebarLayout.CardList>
        <ManualScheduleSidebarMethodCard method={method} onChangeMethod={onChangeMethod} />
      </InterviewSidebarLayout.CardList>
      <InterviewSidebarLayout.CardList title="생성된 시간표">
        <RadioGroup.Root onValueChange={onValueChange} value={selectedCandidate.id}>
          <div className="flex flex-col gap-5">
            {scheduleCandidates.map(({ id, schedules }) => {
              const checked = id === selectedCandidate.id;
              return (
                <div className="flex items-center gap-5" key={id}>
                  <RadioGroup.Item
                    className={clsx(
                      'size-5 shrink-0 cursor-pointer rounded-full border bg-white p-1',
                      checked
                        ? 'border-button-radioSelected'
                        : 'border-button-radioUnselected hover:bg-gray200',
                    )}
                    id={id}
                    value={id}
                  >
                    <RadioGroup.Indicator className="after:bg-button-radioSelected after:block after:size-full after:rounded-full" />
                  </RadioGroup.Item>
                  <label className="block w-full cursor-pointer" htmlFor={id}>
                    <AutoScheduleThumbnail schedules={schedules} />
                  </label>
                </div>
              );
            })}
          </div>
        </RadioGroup.Root>
      </InterviewSidebarLayout.CardList>
      <InterviewSidebarLayout.BottomArea>
        <AutoScheduleSaveButton method={method} scheduleCandidate={selectedCandidate} />
      </InterviewSidebarLayout.BottomArea>
    </InterviewSidebarLayout>
  );
};
