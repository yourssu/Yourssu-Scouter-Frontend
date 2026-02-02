import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { assert, uniq } from 'es-toolkit';

import { MemberInputField } from '@/pages/SendMail/components/MailInfoSection/MemberInputField';
import { SendToField } from '@/pages/SendMail/components/MailInfoSection/SendToField';
import { applicantOptions } from '@/query/applicant/options';
import { memberOptions } from '@/query/member/options';
import { partOptions } from '@/query/part/options';
import { Part } from '@/query/part/schema';
import { MemberInputFieldKey } from '@/types/editor';

interface AutoFillMembersProps {
  members: Record<MemberInputFieldKey, string[]>;
  onMembersUpdate: (members: Record<MemberInputFieldKey, string[]>) => void;
  selectedPart: Part;
  selectedTemplateId: number | undefined;
}

export const AutoFillMembers = ({
  selectedPart,
  selectedTemplateId,
  members,
  onMembersUpdate,
}: AutoFillMembersProps) => {
  const {
    data: { partId: hrPartId },
  } = useSuspenseQuery({
    ...partOptions(),
    select: (data) => {
      const hrPart = data.find((p) => p.partName === 'HR');
      assert(!!hrPart, 'HR 파트 정보를 불러올 수 없어요.');
      return hrPart;
    },
  });

  const [{ data: applicants }, { data: partMembers }, { data: hrMembers }] = useSuspenseQueries({
    queries: [
      applicantOptions({ partId: selectedPart.partId }),
      memberOptions('액티브', {
        partId: selectedPart.partId,
        search: '',
      }),
      memberOptions('액티브', {
        partId: hrPartId,
        search: '',
      }),
    ],
  });

  // 부모에서 받은 members가 비어있으면 초기값 사용, 아니면 부모 값 사용
  const mailingList = {
    '보내는 사람':
      members['보내는 사람'].length > 0
        ? members['보내는 사람']
        : partMembers.filter((m) => m.role === 'Lead').map((m) => m.nickname),
    '받는 사람':
      members['받는 사람'].length > 0 ? members['받는 사람'] : uniq(applicants.map((a) => a.name)),
    '숨은 참조':
      members['숨은 참조'].length > 0
        ? members['숨은 참조']
        : uniq([...partMembers, ...hrMembers].map((m) => m.nickname)),
  };

  const handleMembersUpdate = (field: MemberInputFieldKey, memberNames: string[]) => {
    onMembersUpdate({ ...mailingList, [field]: memberNames });
  };

  return (
    <div className="gap-0">
      {selectedTemplateId === undefined ? (
        <>
          <MemberInputField
            items={mailingList['보내는 사람']}
            label="보내는 사람"
            onItemsUpdate={(items: string[]) => handleMembersUpdate('보내는 사람', items)}
          />
          <MemberInputField
            items={mailingList['받는 사람']}
            label="받는 사람"
            onItemsUpdate={(items: string[]) => handleMembersUpdate('받는 사람', items)}
          />
          <MemberInputField
            items={mailingList['숨은 참조']}
            label="숨은 참조"
            onItemsUpdate={(items: string[]) => handleMembersUpdate('숨은 참조', items)}
          />
        </>
      ) : (
        <SendToField
          receivers={[...mailingList['받는 사람'], ...mailingList['숨은 참조']]}
          sender={mailingList['보내는 사람']}
        />
      )}
    </div>
  );
};
