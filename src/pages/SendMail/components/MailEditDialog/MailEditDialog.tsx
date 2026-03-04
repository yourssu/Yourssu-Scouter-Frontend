import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useQueryClient, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { BoxButton, IcCloseLine } from '@yourssu/design-system-react';
import { Dialog } from 'radix-ui';
import { Suspense, useMemo } from 'react';

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
  useMailContentContext,
  useMailInfoContext,
} from '@/pages/SendMail/context';
import { applicantOptions } from '@/query/applicant/options';
import { putMailReservation } from '@/query/mail/mutation/putMailReservation';
import { mailOptions, MailReservationKeys } from '@/query/mail/options';
import { MailDetail } from '@/query/mail/schema';
import { memberOptions } from '@/query/member/options';

interface MailEditDialogProps {
  isOpen: boolean;
  mailIds: number[];
  onClose: () => void;
  readOnly?: boolean;
}

const MailDialogSaveButton = ({
  allApplicants,
  allMembers,
  mailDetails,
  onClose,
}: {
  allApplicants: { applicantId: number; email: string; name: string }[];
  allMembers: { email: string; nickname: string }[];
  mailDetails: MailDetail[];
  onClose: () => void;
}) => {
  const { mailInfo } = useMailInfoContext();
  const { mailContent } = useMailContentContext();
  const queryClient = useQueryClient();

  const convertNameToEmail = (name: string) => {
    const applicant = allApplicants.find((a) => a.name === name);
    if (applicant) {
      return applicant.email;
    }
    const member = allMembers.find((m) => m.nickname === name);
    if (member) {
      return member.email;
    }
    return name;
  };

  const handleSave = async () => {
    await Promise.all(
      mailDetails.map((detail) => {
        const applicant = allApplicants.find((a) =>
          detail.receiverEmailAddresses.includes(a.email),
        );
        const body = applicant
          ? (mailContent.body[String(applicant.applicantId)] ?? detail.mailBody)
          : detail.mailBody;

        return putMailReservation({
          reservationId: detail.reservationId,
          mailSubject: mailInfo.subject,
          mailBody: body,
          bodyFormat: detail.bodyFormat as 'HTML' | 'TEXT',
          receiverEmailAddresses: detail.receiverEmailAddresses,
          ccEmailAddresses: mailInfo.cc.map(convertNameToEmail),
          bccEmailAddresses: mailInfo.bcc.map(convertNameToEmail),
          reservationTime: detail.reservationTime,
          attachmentReferences: [],
        });
      }),
    );
    queryClient.invalidateQueries({ queryKey: MailReservationKeys.all });
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
        (email) => allMembers.find((m) => m.email === email)?.nickname ?? email,
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

  return (
    <MailInfoProvider initialMailInfo={{ bcc, cc, receiver: allReceivers, subject }}>
      <MailContentProvider initialBody={initialBody}>
        <MailVariableProvider currentPart={undefined}>
          <StyledHeader>
            <StyledTitleInput readOnly value={subject} />
            <IcCloseLine onClick={onClose} />
          </StyledHeader>

          <InfoSection
            readOnly={readOnly}
            selectedPart={undefined}
            selectedTemplateId={undefined}
          />
          <div className="border-line-basicMedium bg-bg-basicDefault flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border">
            <MailEditor readOnly={readOnly} />
          </div>

          {!readOnly && (
            <MailDialogSaveButton
              allApplicants={allApplicants}
              allMembers={allMembers}
              mailDetails={mailDetails}
              onClose={onClose}
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
