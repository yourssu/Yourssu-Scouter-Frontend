import { InterviewPageLayout } from '@/pages/Interview/components/InterviewPageLayout';

export const AutoScheduleMode = () => {
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
