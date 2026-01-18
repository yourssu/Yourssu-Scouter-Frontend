import { useSuspenseQueries } from '@tanstack/react-query';
import { useEffect } from 'react';

import { MemberInputField } from '@/pages/SendMail/components/MailInfoSection/MemberInputField';
import { SendToField } from '@/pages/SendMail/components/MailInfoSection/SendToField';
import { applicantOptions } from '@/query/applicant/options';
import { memberOptions } from '@/query/member/options';
import { Part } from '@/query/part/schema';
import { MailFormData, MemberInputFieldKey } from '@/types/editor';

interface AutoFillMembersProps {
  formData: MailFormData;
  selectedPart: Part;
  selectedTemplateId: number | undefined;
  setFormData: React.Dispatch<React.SetStateAction<MailFormData>>;
}

export const AutoFillMembers = ({
  selectedPart,
  selectedTemplateId,
  formData,
  setFormData,
}: AutoFillMembersProps) => {
  const [{ data: applicants }, { data: partMembers }] = useSuspenseQueries({
    queries: [
      applicantOptions({ partId: selectedPart.partId }),
      memberOptions('액티브', {
        partId: selectedPart.partId,
        search: '',
      }),
    ],
  });

  useEffect(() => {
    const sender = partMembers.filter((m) => m.role === 'Lead').map((m) => m.nickname);
    const applicantsNames = applicants.map((a) => a.name);
    const partMemberNames = partMembers.map((m) => m.nickname);
    // TODO: hr멤버들만 불러와서 숨은 참조에 추가

    setFormData((prev) => ({
      ...prev,
      members: {
        ...prev.members,
        '보내는 사람': sender,
        '받는 사람': Array.from(new Set([...applicantsNames, ...prev.members['받는 사람']])),
        '숨은 참조': Array.from(new Set([...partMemberNames, ...prev.members['숨은 참조']])),
      },
    }));
  }, [selectedPart.partId, applicants, partMembers, setFormData]);

  const handleUpdate = (field: MemberInputFieldKey, members: string[]) => {
    setFormData((prev) => ({ ...prev, members: { ...prev.members, [field]: members } }));
  };

  return (
    <div className="gap-0">
      {selectedTemplateId === undefined ? (
        <>
          <MemberInputField
            items={formData.members['보내는 사람']}
            label="보내는 사람"
            onItemsUpdate={(items: string[]) => handleUpdate('보내는 사람', items)}
          />
          <MemberInputField
            items={formData.members['받는 사람']}
            label="받는 사람"
            onItemsUpdate={(items: string[]) => handleUpdate('받는 사람', items)}
          />
          <MemberInputField
            items={formData.members['숨은 참조']}
            label="숨은 참조"
            onItemsUpdate={(items: string[]) => handleUpdate('숨은 참조', items)}
          />
        </>
      ) : (
        <SendToField
          receivers={[...formData.members['받는 사람'], ...formData.members['숨은 참조']]}
          sender={formData.members['보내는 사람']}
        />
      )}
    </div>
  );
};
