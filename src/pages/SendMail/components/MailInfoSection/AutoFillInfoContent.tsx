import { useEffect, useState } from 'react';

import { InputField } from '@/pages/SendMail/components/MailInfoSection/InputField';
import { SendToField } from '@/pages/SendMail/components/MailInfoSection/SendToField';
import { useAutoFillMembers } from '@/pages/SendMail/hooks/useAutoFillMailInfo';
import { Part } from '@/query/part/schema';
import { InputFieldKey } from '@/types/editor';

interface AutoFillInfoContentProps {
  formData: Record<InputFieldKey, string[]>;
  selectedPart: Part;
  selectedTemplateId: number | undefined;
  setFormData: React.Dispatch<React.SetStateAction<Record<InputFieldKey, string[]>>>;
}

export const AutoFillInfoContent = ({
  selectedPart,
  selectedTemplateId,
  formData,
  setFormData,
}: AutoFillInfoContentProps) => {
  const [activeField, setActiveField] = useState<null | string>(null);

  const { lead, applicants, partMembers, hrMembers } = useAutoFillMembers({ selectedPart });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      '받는 사람': applicants,
      '보내는 사람': lead,
      '숨은 참조': Array.from(new Set([...hrMembers, ...partMembers])),
    }));
  }, [selectedPart.partId, lead, applicants, partMembers, hrMembers, setFormData]);

  const handleUpdate = (field: InputFieldKey, items: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: items }));
  };

  // 템플릿 선택 여부에 따른 분기 로직
  if (selectedTemplateId === undefined) {
    return (
      <div className="gap-0">
        <InputField
          isActive={activeField === '받는 사람'}
          items={formData['받는 사람']}
          label="받는 사람"
          onActivate={() => setActiveField('받는 사람')}
          onDeactivate={() => setActiveField(null)}
          onUpdate={(items) => handleUpdate('받는 사람', items)}
        />
        <InputField
          isActive={activeField === '보내는 사람'}
          items={formData['보내는 사람']}
          label="보내는 사람"
          onActivate={() => setActiveField('보내는 사람')}
          onDeactivate={() => setActiveField(null)}
          onUpdate={(items) => handleUpdate('보내는 사람', items)}
        />
        <InputField
          isActive={activeField === '숨은 참조'}
          items={formData['숨은 참조']}
          label="숨은 참조"
          onActivate={() => setActiveField('숨은 참조')}
          onDeactivate={() => setActiveField(null)}
          onUpdate={(items) => handleUpdate('숨은 참조', items)}
        />
        <InputField
          isActive={activeField === '제목'}
          items={formData['제목']}
          label="제목"
          onActivate={() => setActiveField('제목')}
          onDeactivate={() => setActiveField(null)}
          onUpdate={(items) => handleUpdate('제목', items)}
        />
      </div>
    );
  }

  return (
    <div className="gap-0">
      <SendToField
        receivers={[...formData['받는 사람'], ...formData['숨은 참조']]}
        sender={formData['보내는 사람']}
      />
      <InputField
        isActive={activeField === '제목'}
        items={formData['제목']}
        label="제목"
        onActivate={() => setActiveField('제목')}
        onDeactivate={() => setActiveField(null)}
        onUpdate={(items) => handleUpdate('제목', items)}
      />
    </div>
  );
};
