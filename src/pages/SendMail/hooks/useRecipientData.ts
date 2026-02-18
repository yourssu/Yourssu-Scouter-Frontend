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

  // 탭이 지워져서 현재 선택된 ID가 리스트에 없으면 첫 번째 사람으로 변경
  const currentRecipientId = recipients.some((r) => r.id === currentApplicantId)
    ? currentApplicantId
    : recipients[0]?.id;

  const currentRecipient = recipients.find((r) => r.id === currentRecipientId);

  return {
    applicants, // 원본 지원자 객체 리스트
    recipients, // Recipient 타입(ID/Name) 리스트
    currentRecipientId,
    currentRecipientName: currentRecipient?.name,
    setCurrentRecipientId: actions.setCurrentApplicantId,
  };
};
