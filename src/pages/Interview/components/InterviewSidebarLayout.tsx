import React from 'react';

const BottomArea = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="bg-bg-basicDefault border-line-basicMedium sticky bottom-0 border-t border-l px-5 pt-4 pb-10">
      {children}
    </div>
  );
};

const CardList = ({ title, children }: React.PropsWithChildren<{ title?: string }>) => {
  return (
    <div className="flex min-h-0 flex-[1_1_0] flex-col">
      {title && (
        <div className="border-line-basicMedium typo-t4_sb_18 sticky top-0 border-b bg-white px-4 py-3 text-center">
          {title}
        </div>
      )}
      <div className="min-h-0 flex-[1_1_0] overflow-y-auto">
        <div className="flex flex-col gap-2.5 px-5 py-5">{children}</div>
      </div>
    </div>
  );
};

export const InterviewSidebarLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="bg-bg-basicLight flex size-full flex-col">{children}</div>;
};

InterviewSidebarLayout.CardList = CardList;
InterviewSidebarLayout.BottomArea = BottomArea;
