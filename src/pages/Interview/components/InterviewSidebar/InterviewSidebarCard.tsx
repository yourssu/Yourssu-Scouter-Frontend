const Title = ({ children, leftIcon }: React.PropsWithChildren<{ leftIcon?: React.ReactNode }>) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-[7px]">
        {leftIcon && <div className="size-5">{leftIcon}</div>}
        <p className="typo-b1_sb_16 text-text-basicSecondary">{children}</p>
      </div>
    </div>
  );
};

export const Content = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="text-text-basicTertiary typo-c1_rg_13 py-2.5">{children}</div>;
};

export const Warning = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="bg-status-redPrimaryBackground text-status-redPrimary typo-c1_rg_13 rounded-xl px-2.5 py-1">
      {children}
    </div>
  );
};

export const InterviewSidebarCard = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="border-line-basicMedium bg-bg-basicDefault typo-b1_rg_16 flex flex-col gap-3 rounded-[14px] border border-solid p-4">
      {children}
    </div>
  );
};

InterviewSidebarCard.Title = Title;
InterviewSidebarCard.Content = Content;
InterviewSidebarCard.Warning = Warning;
