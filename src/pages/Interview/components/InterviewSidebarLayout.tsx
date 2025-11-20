import React from 'react';

export const InterviewSidebarLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="bg-bg-basicLight flex h-full w-full flex-col gap-2.5 px-5 py-12">
      {children}
    </div>
  );
};
