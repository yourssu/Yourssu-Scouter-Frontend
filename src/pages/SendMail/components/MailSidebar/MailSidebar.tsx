import { BoxButton } from '@yourssu/design-system-react';
import { Suspense, useState } from 'react';

import { MailReservationDialog } from '@/pages/SendMail/components/MailReservationDialog/MailReservationDialog';
import { VariableList } from '@/pages/SendMail/components/MailSidebar/VariableList';

export interface MailSidebarProps {
  partId?: number;
  templateId?: number;
}

export const MailSidebar = ({ partId, templateId }: MailSidebarProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="bg-bg-basicLight flex size-full min-h-0 flex-col justify-between">
      <div className="typo-t4_sb_18 bg-bg-basicDefault border-line-basicMedium flex w-full flex-none justify-center border-b-1 px-[16px] py-[12px]">
        변수 리스트
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {templateId && partId && (
          <Suspense fallback={<div className="p-4">로딩 중...</div>}>
            <VariableList key={templateId} partId={partId} templateId={templateId} />
          </Suspense>
        )}
      </div>
      <div className="border-line-basicMedium bg-bg-basicDefault flex-none border-t-1 px-[20px] pt-[16px] pb-[40px]">
        <div className="w-full [&_button]:w-full">
          <BoxButton
            disabled={false}
            onClick={() => setIsDialogOpen(true)}
            size="large"
            variant="filledPrimary"
          >
            메일 예약하기
          </BoxButton>
        </div>
      </div>
      {isDialogOpen && (
        <MailReservationDialog
          onClose={() => setIsDialogOpen(false)}
          open={isDialogOpen}
          templateId={templateId}
        />
      )}
    </div>
  );
};
