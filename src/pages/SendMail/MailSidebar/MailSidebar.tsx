import { BoxButton } from '@yourssu/design-system-react';

import { VariableListContainer } from '@/pages/SendMail/MailSidebar/VariableListContainer';

export interface MailSidebarProps {
  templateId?: number;
}

export const MailSidebar = ({ templateId }: MailSidebarProps) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="typo-t4_sb_18 border-line-basicMedium flex justify-center border-b-1 px-[16px] py-[12px]">
        변수 리스트
      </div>
      {templateId && <VariableListContainer key={templateId} templateId={templateId} />}
      <div className="border-line-basicMedium border-t-1 px-[20px] pt-[16px] pb-[40px]">
        <div className="w-full [&_button]:w-full">
          <BoxButton disabled={false} size="large" variant="filledPrimary">
            메일 예약하기
          </BoxButton>
        </div>
      </div>
    </div>
  );
};
