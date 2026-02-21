import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useMailInfoContext, useMailVariableContext } from '@/pages/SendMail/context';
import { Recipient } from '@/pages/SendMail/mail.type';
import { applicantOptions } from '@/query/applicant/options';

export const useRecipientData = () => {
  const { currentApplicantId, currentPart, actions } = useMailVariableContext();
  const { mailInfo } = useMailInfoContext();
  const { data: applicants } = useSuspenseQuery(applicantOptions({ partId: currentPart?.partId }));

  const recipients: Recipient[] = useMemo(() => {
    if (!Array.isArray(applicants)) {
      return [];
    }

    // 받는 사람 리스트(이름들)에 포함된 지원자만 필터링합니다.
    const receiverNames = mailInfo.receiver || [];

    return applicants
      .filter((a) => receiverNames.includes(a.name))
      .map((a) => ({ id: String(a.applicantId), name: a.name }));
  }, [applicants, mailInfo.receiver]);

  // currentApplicantId가 recipients에 존재하는지 확인하고, 없으면 첫 번째 지원자의 ID로 설정
  const validId = useMemo(() => {
    const isValid = recipients.some((r) => r.id === currentApplicantId);
    return isValid ? currentApplicantId : recipients[0]?.id;
  }, [recipients, currentApplicantId]);

  const currentRecipient = recipients.find((r) => r.id === validId);

  return {
    applicants,
    recipients,
    currentRecipientId: validId,
    currentRecipientName: currentRecipient?.name,
    setCurrentRecipientId: actions.setCurrentApplicantId,
  };
};
