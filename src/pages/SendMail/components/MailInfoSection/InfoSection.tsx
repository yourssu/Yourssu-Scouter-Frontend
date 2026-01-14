import { Suspense, useState } from 'react';

import { AutoFillInfoContent } from '@/pages/SendMail/components/MailInfoSection/AutoFillInfoContent';
import { InputField } from '@/pages/SendMail/components/MailInfoSection/InputField';
import { Part } from '@/query/part/schema';
import { InputFieldKey, InputFieldTypes } from '@/types/editor';

interface InfoSectionProps {
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
}

export const InfoSection = ({ selectedPart, selectedTemplateId }: InfoSectionProps) => {
  const [activeField, setActiveField] = useState<(typeof InputFieldTypes)[number] | null>(null);

  const [formData, setFormData] = useState<Record<InputFieldKey, string[]>>({
    '받는 사람': [],
    '보내는 사람': [],
    '숨은 참조': [],
    제목: [],
  });

  const handleUpdate = (field: InputFieldKey, items: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: items,
    }));
  };

  if (!selectedPart) {
    return (
      <div className="gap-0">
        {InputFieldTypes.map((type) => (
          <InputField
            isActive={activeField === type}
            items={formData[type]}
            key={type}
            label={type}
            onActivate={() => setActiveField(type)}
            onDeactivate={() => setActiveField(null)}
            onUpdate={(items) => handleUpdate(type, items)}
          />
        ))}
      </div>
    );
  }
  return (
    <Suspense>
      <AutoFillInfoContent
        formData={formData}
        key={selectedPart.partId}
        selectedPart={selectedPart}
        selectedTemplateId={selectedTemplateId}
        setFormData={setFormData}
      />
    </Suspense>
  );
};
