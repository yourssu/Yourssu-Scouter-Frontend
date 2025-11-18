import React from 'react';

import { PageLayout } from '@/components/layouts/PageLayout';

interface InterviewPageLayoutProps {
  slots: {
    calendar: React.ReactNode;
    header: React.ReactNode;
    sidebar: React.ReactNode;
  };
  title?: string;
}

export const InterviewPageLayout = ({
  title,
  slots: { calendar, sidebar, header },
}: React.PropsWithChildren<InterviewPageLayoutProps>) => {
  return (
    <PageLayout title={title}>
      {header}
      <div className="flex flex-[1_1_0] overflow-hidden">
        <div className="flex w-[70%] min-w-0 flex-col pt-12 pr-6">{calendar}</div>
        <div className="flex-1">{sidebar}</div>
      </div>
    </PageLayout>
  );
};
