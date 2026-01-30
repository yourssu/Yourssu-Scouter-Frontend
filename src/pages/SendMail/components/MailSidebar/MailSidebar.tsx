import { BoxButton } from '@yourssu/design-system-react';
import { overlay } from 'overlay-kit';
import { Suspense } from 'react';

import { MailReservationDialog } from '@/pages/SendMail/components/MailReservationDialog/MailReservationDialog';
import { VariableList } from '@/pages/SendMail/components/MailSidebar/VariableList';
import { useMailData } from '@/pages/SendMail/hooks/useMailData';
import { useMailActions } from '@/pages/SendMail/hooks/useMailReservation';
import { useMailValidation } from '@/pages/SendMail/hooks/useMailValidation';
import { useRecipientData } from '@/pages/SendMail/hooks/useRecipientData';

export interface MailSidebarProps {
  partId: number | undefined;
  templateId: number | undefined;
}

export const MailSidebar = ({ partId, templateId }: MailSidebarProps) => {
  const { currentRecipientId } = useRecipientData();
  const { currentContent } = useMailData(templateId, currentRecipientId);
  const { sendReservation } = useMailActions();
  // const { variableValue } = useMailVariableContext();
  // const { currentApplicantId } = useCurrentApplicant();
  // const { templateVariables } = useVariableList(templateId, partId); // templateId와 partId가 있을 때만 호출되게 하려면...

  // const isReady =
  //   templateVariables.length > 0 &&
  //   currentApplicantId &&
  //   templateVariables.every((v) => {
  //     const value = v.perRecipient
  //       ? variableValue.perApplicant[currentApplicantId]?.[v.key]
  //       : variableValue.common[v.key];
  //     return value && value.trim() !== '';
  //   });

  const { isReadyForReservation } = useMailValidation(templateId);

  const handleReservationClick = () => {
    overlay.open(
      ({ isOpen, close }) => (
        <MailReservationDialog
          body={currentContent}
          onClose={close}
          onReserve={async (date: Date) => {
            await sendReservation(currentContent, date);
          }}
          open={isOpen}
        />
      ),
      { overlayId: 'mail-reservation-dialog' },
    );
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
        <div className="w-full [&_button]:w-full">
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
