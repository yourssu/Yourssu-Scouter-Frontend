import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { Dialog } from 'radix-ui';
import { Suspense, useMemo, useState } from 'react';

import {
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledOverlay,
  StyledTitleInput,
} from '@/pages/SendMail/components/MailEditDialog/MailEditDialog.style';
import { MailEditor } from '@/pages/SendMail/components/MailEditor/MailEditor';
import { InfoSection } from '@/pages/SendMail/components/MailInfoSection/InfoSection';
import {
  MailContentProvider,
  MailInfoProvider,
  MailVariableProvider,
} from '@/pages/SendMail/context';
import { useMailActions } from '@/pages/SendMail/hooks/useMailReservation';
import { applicantOptions } from '@/query/applicant/options';
import { mailOptions } from '@/query/mail/options';
import { MailDetail } from '@/query/mail/schema';
import { memberOptions } from '@/query/member/options';

interface MailEditDialogProps {
  isOpen: boolean;
  mailIds: number[];
  onClose: () => void;
  readOnly?: boolean;
}

const MailDialogSaveButton = ({
  mailDetails,
  onClose,
  reservationTime,
}: {
  mailDetails: MailDetail[];
  onClose: () => void;
  reservationTime: Date;
}) => {
  const { updateReservation } = useMailActions();

  const handleSave = async () => {
    await updateReservation(mailDetails, reservationTime);
    onClose();
  };

  return (
    <StyledFooter>
      <BoxButton onClick={handleSave} size="large" variant="filledPrimary">
        저장하기
      </BoxButton>
    </StyledFooter>
  );
};

const MailDialogContent = ({
  mailIds,
  onClose,
  readOnly,
}: {
  mailIds: number[];
  onClose: () => void;
  readOnly?: boolean;
}) => {
  const results = useSuspenseQueries({
    queries: mailIds.map((id) => mailOptions.detail(id)),
  });
  const { data: allApplicants } = useSuspenseQuery(applicantOptions());
  const { data: allMembers } = useSuspenseQuery(memberOptions('액티브'));
  const mailDetails = results.map((r) => r.data);
  const subject = mailDetails[0]?.mailSubject ?? '';
  const cc = mailDetails[0]?.ccEmailAddresses ?? [];

  const allReceivers = useMemo(
    () =>
      [...new Set(mailDetails.flatMap((d) => d.receiverEmailAddresses))].map(
        (email) => allApplicants.find((a) => a.email === email)?.name ?? email,
      ),
    [allApplicants, mailDetails],
  );

  const bcc = useMemo(
    () =>
      (mailDetails[0]?.bccEmailAddresses ?? []).map(
        (email) => allMembers.members.find((m) => m.email === email)?.nickname ?? email,
      ),
    [allMembers, mailDetails],
  );

  const initialBody = useMemo(() => {
    const body: Record<string, string> = {};
    mailDetails.forEach((detail) => {
      detail.receiverEmailAddresses.forEach((email) => {
        const applicant = allApplicants.find((a) => a.email === email);
        if (applicant) {
          body[String(applicant.applicantId)] = detail.mailBody;
        }
      });
    });
    return body;
  }, [allApplicants, mailDetails]);

  const [reservationTime, setReservationTime] = useState<Date>(
    new Date(mailDetails[0]?.reservationTime),
  );

  return (
    <MailInfoProvider initialMailInfo={{ bcc, cc, receiver: allReceivers, subject }}>
      <MailContentProvider initialBody={initialBody}>
        <MailVariableProvider currentPart={undefined}>
          <StyledHeader>
            <StyledTitleInput readOnly value={subject} />
            <IcCloseLine onClick={onClose} />
          </StyledHeader>

          <InfoSection
            isTitleIncluded={false}
            onReservationTimeChange={readOnly ? undefined : setReservationTime}
            readOnly={readOnly}
            reservationTime={reservationTime}
            selectedPart={undefined}
            selectedTemplateId={undefined}
          />
          <div className="border-line-basicMedium bg-bg-basicDefault flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border">
            <MailEditor readOnly={readOnly} />
          </div>

          {!readOnly && (
            <MailDialogSaveButton
              mailDetails={mailDetails}
              onClose={onClose}
              reservationTime={reservationTime}
            />
          )}
        </MailVariableProvider>
      </MailContentProvider>
    </MailInfoProvider>
  );
};

export const MailEditDialog = ({ isOpen, mailIds, onClose, readOnly }: MailEditDialogProps) => {
  return (
    <Dialog.Root onOpenChange={onClose} open={isOpen}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <VisuallyHidden>
            <Dialog.Title />
            <Dialog.Description />
          </VisuallyHidden>
          <Suspense fallback={null}>
            <MailDialogContent mailIds={mailIds} onClose={onClose} readOnly={readOnly} />
          </Suspense>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
