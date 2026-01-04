import { HiSparkles } from 'react-icons/hi2';

import { AutoScheduleRefetchButton } from '@/pages/Interview/components/AutoScheduleMode/AutoScheduleRefetchButton';
import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeaderLayout';
import { ScheduleModeToggleButton } from '@/pages/Interview/components/ScheduleModeToggleButton';

interface AutoScheduleHeaderProps {
  indicator: {
    month: number;
    onNextWeek: () => void;
    onPrevWeek: () => void;
    week: number;
  };
}

export const AutoScheduleHeader = ({
  indicator: { month, week, onNextWeek, onPrevWeek },
}: AutoScheduleHeaderProps) => {
  return (
    <InterviewHeaderLayout>
      <InterviewHeaderLayout.Row>
        <InterviewHeaderLayout.Indicator
          date={{ month, week }}
          onNextWeek={onNextWeek}
          onPrevWeek={onPrevWeek}
        />
        <div className="flex items-center gap-2.5">
          <AutoScheduleRefetchButton />
          <ScheduleModeToggleButton />
        </div>
      </InterviewHeaderLayout.Row>
      <InterviewHeaderLayout.Row>
        <div className="bg-bg-brandSecondary text-text-brandPrimary typo-b3_rg_14 flex w-full max-w-90 items-center gap-2 rounded-md px-2.5 py-2">
          <HiSparkles />
          AI가 자동생성한 시간표예요.
        </div>
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
