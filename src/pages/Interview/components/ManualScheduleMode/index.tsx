import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';

export const ManualScheduleMode = () => {
  return (
    <InterviewPageLayout
      slots={{
        header: <div />,
        calendar: <div />,
        sidebar: <div />,
      }}
    />
  );
};
