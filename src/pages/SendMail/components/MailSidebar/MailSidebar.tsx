import { BoxButton, useSnackbar } from '@yourssu/design-system-react';
import { overlay } from 'overlay-kit';
import { Suspense } from 'react';

import { MailReservationDialog } from '@/pages/SendMail/components/MailReservationDialog/MailReservationDialog';
import { VariableList } from '@/pages/SendMail/components/MailSidebar/VariableList';
import { TestMailDialog } from '@/pages/SendMail/components/TestMailDialog/TestMailDialog';
import { useMailContentContext, useMailInfoContext } from '@/pages/SendMail/context';
import { useMailData } from '@/pages/SendMail/hooks/useMailData';
import { useMailActions } from '@/pages/SendMail/hooks/useMailReservation';
import { useMailValidation } from '@/pages/SendMail/hooks/useMailValidation';
import { useRecipientData } from '@/pages/SendMail/hooks/useRecipientData';
import { useVariableValue } from '@/pages/SendMail/hooks/useVariableValue';

export interface MailSidebarProps {
  onReserveSuccess?: () => void;
  partId: number | undefined;
  templateId: number | undefined;
}

export const MailSidebar = ({ partId, templateId, onReserveSuccess }: MailSidebarProps) => {
  const { currentRecipientId } = useRecipientData();
  const { currentContent, defaultContent } = useMailData(templateId, currentRecipientId);
  const { sendReservation } = useMailActions();
  const { snackbar } = useSnackbar();
  const { mailInfo } = useMailInfoContext();
  const { mailContent } = useMailContentContext();
  const { getVariableValue } = useVariableValue();

  const { isReadyForReservation } = useMailValidation(templateId);

  const handleReservationClick = () => {
    overlay.open(({ isOpen, close }) => (
      <MailReservationDialog
        onClose={close}
        onReserve={async (date: Date) => {
          await sendReservation(currentContent, defaultContent, date);
          close();
          snackbar({
            type: 'info',
            message: '메일을 예약했어요',
            duration: 3000,
            width: '400px',
            position: 'center',
          });
          onReserveSuccess?.();
        }}
        open={isOpen}
      />
    ));
  };

  const handleTestMailClick = async () => {
    const success = await overlay.openAsync<boolean>(({ isOpen, close }) => (
      <TestMailDialog
        close={close}
        content={currentContent}
        getVariableValue={getVariableValue}
        isOpen={isOpen}
        mailContent={mailContent}
        mailInfo={mailInfo}
      />
    ));

    if (success) {
      snackbar({
        duration: 3000,
        message: '테스트 메일을 발송했어요.',
        position: 'center',
        type: 'info',
        width: '400px',
      });
    } else {
      snackbar({
        duration: 3000,
        message: '테스트 메일 발송에 실패했어요.',
        position: 'center',
        type: 'error',
      });
    }
  };

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
        <div className="flex w-full gap-[8px] [&_button]:w-full">
          <BoxButton
            disabled={!templateId || !partId || !isReadyForReservation}
            onClick={handleTestMailClick}
            size="large"
            variant="filledSecondary"
          >
            메일 테스트하기
          </BoxButton>
          <BoxButton
            disabled={!templateId || !partId || !isReadyForReservation}
            onClick={handleReservationClick}
            size="large"
            variant="filledPrimary"
          >
            메일 예약하기
          </BoxButton>
        </div>
      </div>
    </div>
  );
};
