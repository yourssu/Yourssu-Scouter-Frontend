import { InterviewHeaderLayout } from '@/pages/Interview/components/InterviewHeaderLayout';
import { InterviewScheduleAddButton } from '@/pages/Interview/components/InterviewScheduleMode/InterviewScheduleAddButton';
import { PartFilterDropdown } from '@/pages/Interview/components/PartFilterDropdown';

interface InterviewScheduleHeaderProps {
  indicator: {
    month: number;
    onNextWeek: () => void;
    onPrevWeek: () => void;
    week: number;
  };
  onJumpToLastSchedule?: () => void;
}

export const InterviewScheduleHeader = ({
  indicator: { month, week, onNextWeek, onPrevWeek },
  onJumpToLastSchedule,
}: InterviewScheduleHeaderProps) => {
  return (
    <InterviewHeaderLayout>
      <InterviewHeaderLayout.Row>
        <InterviewHeaderLayout.Indicator
          date={{ month, week }}
          onNextWeek={onNextWeek}
          onPrevWeek={onPrevWeek}
          rightAddon={
            onJumpToLastSchedule ? (
              <button
                className="text-text-brandPrimary px-2 py-1 text-[14px] font-medium underline transition-opacity hover:opacity-80"
                onClick={onJumpToLastSchedule}
                type="button"
              >
                마지막 일정 보기
              </button>
            ) : null
          }
        />
        <InterviewHeaderLayout.ButtonGroup>
          <PartFilterDropdown />
          <InterviewScheduleAddButton />
        </InterviewHeaderLayout.ButtonGroup>
      </InterviewHeaderLayout.Row>
    </InterviewHeaderLayout>
  );
};
