import { BoxButton } from '@yourssu/design-system-react';

import { VariableListContainer } from '@/pages/SendMail/MailSidebar/VariableListContainer';

export interface MailSidebarProps {
  templateId?: number;
}

export const MailSidebar = ({ templateId }: MailSidebarProps) => {
  return (
    <div className="bg-bg-basicLight flex size-full min-h-0 flex-col justify-between">
      <div className="typo-t4_sb_18 bg-bg-basicDefault border-line-basicMedium flex w-full flex-none justify-center border-b-1 px-[16px] py-[12px]">
        변수 리스트
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {templateId && <VariableListContainer key={templateId} templateId={templateId} />}
      </div>
      <div className="border-line-basicMedium bg-bg-basicDefault flex-none border-t-1 px-[20px] pt-[16px] pb-[40px]">
        <div className="w-full [&_button]:w-full">
          <BoxButton disabled={false} size="large" variant="filledPrimary">
            메일 예약하기
          </BoxButton>
        </div>
      </div>
    </div>
  );
};
