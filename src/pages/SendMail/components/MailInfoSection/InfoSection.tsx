import { Suspense, useState } from 'react';

import { AutoFillMembers } from '@/pages/SendMail/components/MailInfoSection/AutoFillIMembers';
import { MemberInputField } from '@/pages/SendMail/components/MailInfoSection/MemberInputField';
import { TextInputField } from '@/pages/SendMail/components/MailInfoSection/TextInputField';
import { useMailInfoContext } from '@/pages/SendMail/context';
import { Part } from '@/query/part/schema';
import { MailFormData, MemberInputFieldKey, MemberInputFieldTypes } from '@/types/editor';

interface InfoSectionProps {
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
}

export const InfoSection = ({ selectedPart, selectedTemplateId }: InfoSectionProps) => {
  const [formData, setFormData] = useState<MailFormData>({
    members: {
      '받는 사람': [],
      '보내는 사람': [],
      '숨은 참조': [],
    },
    subject: '',
  });

  const {
    actions: { updateMailInfo },
  } = useMailInfoContext();

  // 멤버(칩) 업데이트
  const handleMemberUpdate = (field: MemberInputFieldKey, items: string[]) => {
    setFormData((prev) => ({
      ...prev,
      members: { ...prev.members, [field]: items },
    }));
    updateMailInfo({
      [field === '받는 사람' ? 'receiver' : field === '보내는 사람' ? 'cc' : 'bcc']: items,
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
              onItemsUpdate={(items) => handleMemberUpdate(type, items)}
            />
          ))}
        </div>
      ) : (
        <Suspense>
          <AutoFillMembers
            members={formData.members}
            onMembersUpdate={handleMemberUpdate}
            selectedPart={selectedPart}
            selectedTemplateId={selectedTemplateId}
          />
        </Suspense>
      )}
      <TextInputField
        label="제목"
        onChange={(e) => {
          setFormData({ ...formData, subject: e.target.value });
        }}
        value={formData.subject}
      />
    </div>
  );
};
