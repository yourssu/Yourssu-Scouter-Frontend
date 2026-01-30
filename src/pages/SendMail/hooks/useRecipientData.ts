import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useMailVariableContext } from '@/pages/SendMail/context';
import { Recipient } from '@/pages/SendMail/mail.type';
import { applicantOptions } from '@/query/applicant/options';

export const useRecipientData = () => {
  const { currentApplicantId, currentPart, actions } = useMailVariableContext();

  const { data: applicants } = useSuspenseQuery(applicantOptions({ partId: currentPart?.partId }));

  const recipients: Recipient[] = useMemo(
    () =>
      Array.isArray(applicants)
        ? applicants.map((a) => ({ id: String(a.applicantId), name: a.name }))
        : [],
    [applicants],
  );

  const currentRecipientId = currentApplicantId ?? recipients[0]?.id;
  const currentRecipient = recipients.find((r) => r.id === currentRecipientId);

  return {
    applicants, // 원본 지원자 객체 리스트
    recipients, // Recipient 타입(ID/Name) 리스트
    currentRecipientId,
    currentRecipientName: currentRecipient?.name,
    setCurrentRecipientId: actions.setCurrentApplicantId,
  };
};
