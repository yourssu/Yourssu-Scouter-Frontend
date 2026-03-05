import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useMailInfoContext, useMailVariableContext } from '@/pages/SendMail/context';
import { Recipient } from '@/pages/SendMail/mail.type';
import { applicantOptions } from '@/query/applicant/options';

export const useRecipientData = () => {
  const { currentApplicantId, actions } = useMailVariableContext();
  const { mailInfo } = useMailInfoContext();
  const { data: allApplicants } = useSuspenseQuery(applicantOptions());

  // mailInfo.receiver의 이름과 allApplicants의 이름을 비교하여 recipients 배열 생성
  const recipients: Recipient[] = useMemo(() => {
    if (!Array.isArray(allApplicants)) {
      return [];
    }

    const receiverNames = mailInfo.receiver || [];

    return receiverNames
      .map((name) => {
        const found = allApplicants.find((a) => name.startsWith(a.name));

        if (found) {
          return { id: String(found.applicantId), name: found.name };
        }
        return null;
      })
      .filter((r): r is Recipient => r !== null);
  }, [allApplicants, mailInfo.receiver]);

  // currentApplicantId가 recipients에 존재하는지 확인하고, 없으면 첫 번째 지원자의 ID로 설정
  const validId = useMemo(() => {
    const isValid = recipients.some((r) => r.id === currentApplicantId);
    return isValid ? currentApplicantId : recipients[0]?.id;
  }, [recipients, currentApplicantId]);

  const currentRecipient = recipients.find((r) => r.id === validId);

  return {
    allApplicants,
    recipients,
    currentRecipientId: validId,
    currentRecipientName: currentRecipient?.name,
    setCurrentRecipientId: actions.setCurrentApplicantId,
  };
};
