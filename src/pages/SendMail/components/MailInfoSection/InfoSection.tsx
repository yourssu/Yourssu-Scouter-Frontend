import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useCallback, useState } from 'react';

import { ApplicantInputField } from '@/pages/SendMail/components/MailInfoSection/ApplicantInputField';
import { AutoFillMembers } from '@/pages/SendMail/components/MailInfoSection/AutoFillIMembers';
import { MemberInputField } from '@/pages/SendMail/components/MailInfoSection/MemberInputField';
import { TextInputField } from '@/pages/SendMail/components/MailInfoSection/TextInputField';
import { useMailInfoContext } from '@/pages/SendMail/context';
import { meOption } from '@/query/member/me/options';
import { Part } from '@/query/part/schema';
import { MailFormData } from '@/types/editor';
import { MemberInputFieldKey } from '@/types/editor';

interface InfoSectionProps {
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
}

export const InfoSection = ({ selectedPart, selectedTemplateId }: InfoSectionProps) => {
  const {
    mailInfo,
    actions: { updateMailInfo },
  } = useMailInfoContext();

  const { data: me } = useSuspenseQuery(meOption());

  const [formData, setFormData] = useState<MailFormData>({
    members: {
      '받는 사람': [],
      '보내는 사람': [me.nickname],
      '숨은 참조': [],
    },
    subject: mailInfo.subject || '',
  });

  // 멤버(칩) 업데이트
  const handleMemberUpdate = useCallback(
    (updates: Partial<Record<MemberInputFieldKey, string[]>>) => {
      // 1. 로컬 상태 업데이트
      setFormData((prev) => ({
        ...prev,
        members: { ...prev.members, ...updates },
      }));

      // 2. 컨텍스트 상태 업데이트
      const mailUpdate: Parameters<typeof updateMailInfo>[0] = {};

      if (updates['받는 사람']) {
        mailUpdate.receiver = updates['받는 사람'];
      }
      if (updates['숨은 참조']) {
        mailUpdate.bcc = updates['숨은 참조'];
      }

      if (Object.keys(mailUpdate).length > 0) {
        updateMailInfo(mailUpdate);
      }
    },
    [updateMailInfo],
  );

  const handleSubjectUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSubject = e.target.value;
    setFormData((prev) => ({
      ...prev,
      subject: newSubject,
    }));
    updateMailInfo({
      subject: newSubject,
    });
  };

  return (
    <div className="flex flex-col gap-0">
      {!selectedPart ? (
        <div className="flex flex-col gap-0">
          <MemberInputField
            items={formData.members['보내는 사람']}
            key="보내는 사람"
            label="보내는 사람"
            onItemsUpdate={(items) => handleMemberUpdate({ '보내는 사람': items })}
          />
          <ApplicantInputField
            items={formData.members['받는 사람']}
            key="받는 사람"
            label="받는 사람"
            onItemsUpdate={(items) => handleMemberUpdate({ '받는 사람': items })}
          />
          <MemberInputField
            items={formData.members['숨은 참조']}
            key="숨은 참조"
            label="숨은 참조"
            onItemsUpdate={(items) => handleMemberUpdate({ '숨은 참조': items })}
          />
        </div>
      ) : (
        <Suspense>
          <AutoFillMembers
            key={selectedPart.partId}
            members={formData.members}
            onMembersUpdate={handleMemberUpdate}
            selectedPart={selectedPart}
            selectedTemplateId={selectedTemplateId}
          />
        </Suspense>
      )}
      <TextInputField label="제목" onChange={handleSubjectUpdate} value={formData.subject} />
    </div>
  );
};
