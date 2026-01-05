import React from 'react';

import { PageLayout } from '@/components/layouts/PageLayout';

interface InterviewPageLayoutProps {
  slots: {
    calendar: React.ReactNode;
    header: React.ReactNode;
    sidebar: React.ReactNode;
  };
  title?: string;
  variants?: 'default' | 'sidebar-expand';
}

export const InterviewPageLayout = ({
  title,
  slots: { calendar, sidebar, header },
  variants = 'default',
}: React.PropsWithChildren<InterviewPageLayoutProps>) => {
  if (variants === 'sidebar-expand') {
    return (
      <PageLayout title={title}>
        <div className="flex w-full flex-[1_1_0]">
          <div className="border-line-basicMedium flex w-full flex-col border-t pt-2">
            <div className="border-line-basicMedium border-b pr-6">{header}</div>
            <div className="flex flex-[1_1_0] flex-col pt-12 pr-6">{calendar}</div>
          </div>
          <div className="border-line-basicMedium w-100 min-w-100 border-t border-l">{sidebar}</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={title}>
      <div className="border-line-basicMedium border-b">
        <div className="w-[70%] pr-6">{header}</div>
      </div>
      <div className="flex flex-[1_1_0] overflow-hidden">
        <div className="flex w-[70%] min-w-0 flex-col pt-12 pr-6">{calendar}</div>
        <div className="border-line-basicMedium flex-1 border-l">{sidebar}</div>
      </div>
    </PageLayout>
  );
};
