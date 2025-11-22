import React from 'react';

const BottomArea = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="bg-bg-basicDefault border-line-basicMedium sticky bottom-0 border-t border-l px-5 pt-4 pb-10">
      {children}
    </div>
  );
};

const CardList = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="flex flex-[1_1_0] flex-col gap-2.5 px-5 py-12">{children}</div>;
};

export const InterviewSidebarLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="bg-bg-basicLight flex size-full flex-col">{children}</div>;
};

InterviewSidebarLayout.CardList = CardList;
InterviewSidebarLayout.BottomArea = BottomArea;
