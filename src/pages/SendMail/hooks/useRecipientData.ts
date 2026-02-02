import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useMailVariables } from '@/pages/SendMail/components/MailVariable/MailVariable';
import { Recipient } from '@/pages/SendMail/mail.type';
import { applicantOptions } from '@/query/applicant/options';
import { Part } from '@/query/part/schema';

export const useRecipientData = (selectedPart: Part) => {
  const { activeApplicantId, actions } = useMailVariables();
  const applicants = useSuspenseQuery(applicantOptions({ partId: selectedPart.partId }));

  const recipients: Recipient[] = useMemo(
    () =>
      Array.isArray(applicants)
        ? applicants.map((a) => ({ id: String(a.applicantId), name: a.name }))
        : [],
    [applicants],
  );

  const currentRecipientId = activeApplicantId ?? recipients[0]?.id;
  const currentRecipient = recipients.find((r) => r.id === currentRecipientId);

  return {
    recipients,
    currentRecipientId,
    currentRecipientName: currentRecipient?.name,
    setCurrentRecipientId: actions.setActiveApplicantId,
  };
};
