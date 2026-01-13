import { useState } from 'react';

import { InputField } from '@/pages/SendMail/components/MailInfoSection/InputField';
import { SendToField } from '@/pages/SendMail/components/MailInfoSection/SendToField';
import { useAutoFillMembers } from '@/pages/SendMail/hooks/useAutoFillMailInfo';
import { Part } from '@/query/part/schema';

interface AutoFillInfoContentProps {
  selectedPart: Part;
  selectedTemplateId: number | undefined;
}

export const AutoFillInfoContent = ({
  selectedPart,
  selectedTemplateId,
}: AutoFillInfoContentProps) => {
  const [activeField, setActiveField] = useState<null | string>(null);

  const { lead, applicants, partMembers, hrMembers } = useAutoFillMembers({ selectedPart });

  // 템플릿 선택 여부에 따른 분기 로직
  if (selectedTemplateId === undefined) {
    return (
      <div className="gap-0">
        <InputField
          defaultItems={applicants}
          isActive={activeField === '받는 사람'}
          label="받는 사람"
          onActivate={() => setActiveField('받는 사람')}
          onDeactivate={() => setActiveField(null)}
        />
        <InputField
          defaultItems={lead ?? []}
          isActive={activeField === '보내는 사람'}
          label="보내는 사람"
          onActivate={() => setActiveField('보내는 사람')}
          onDeactivate={() => setActiveField(null)}
        />
        <InputField
          defaultItems={partMembers}
          isActive={activeField === '숨은 참조'}
          label="숨은 참조"
          onActivate={() => setActiveField('숨은 참조')}
          onDeactivate={() => setActiveField(null)}
        />
        <InputField
          defaultItems={[]}
          isActive={activeField === '제목'}
          label="제목"
          onActivate={() => setActiveField('제목')}
          onDeactivate={() => setActiveField(null)}
        />
      </div>
    );
  }

  return (
    <div className="gap-0">
      <SendToField receivers={[...applicants, ...partMembers, ...hrMembers]} sender={lead ?? []} />
      <InputField
        defaultItems={[]}
        isActive={activeField === '제목'}
        label="제목"
        onActivate={() => setActiveField('제목')}
        onDeactivate={() => setActiveField(null)}
      />
    </div>
  );
};
