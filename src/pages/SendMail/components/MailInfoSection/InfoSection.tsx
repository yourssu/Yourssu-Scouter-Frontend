import { Suspense, useCallback, useState } from 'react';

import { AutoFillMembers } from '@/pages/SendMail/components/MailInfoSection/AutoFillIMembers';
import { MemberInputField } from '@/pages/SendMail/components/MailInfoSection/MemberInputField';
import { TextInputField } from '@/pages/SendMail/components/MailInfoSection/TextInputField';
import { useMailInfoContext } from '@/pages/SendMail/context';
import { Part } from '@/query/part/schema';
import { MailFormData, MemberInputFieldTypes } from '@/types/editor';
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

  const [formData, setFormData] = useState<MailFormData>({
    members: {
      '받는 사람': [],
      '보내는 사람': [],
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
          {MemberInputFieldTypes.map((type) => (
            <MemberInputField
              items={formData.members[type]}
              key={type}
              label={type}
              onItemsUpdate={(items) => handleMemberUpdate({ [type]: items })}
            />
          ))}
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
