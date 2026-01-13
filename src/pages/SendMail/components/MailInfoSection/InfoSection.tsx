import { Suspense, useState } from 'react';

import { AutoFillInfoContent } from '@/pages/SendMail/components/MailInfoSection/AutoFillInfoContent';
import { InputField } from '@/pages/SendMail/components/MailInfoSection/InputField';
import { Part } from '@/query/part/schema';

const InputFieldTypes = ['받는 사람', '보내는 사람', '숨은 참조', '제목'] as const;

interface InfoSectionProps {
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
}

export const InfoSection = ({ selectedPart, selectedTemplateId }: InfoSectionProps) => {
  const [activeField, setActiveField] = useState<(typeof InputFieldTypes)[number] | null>(null);

  if (!selectedPart) {
    return (
      <div className="gap-0">
        {InputFieldTypes.map((type) => (
          <InputField
            defaultItems={[]}
            isActive={activeField === type}
            key={type}
            label={type}
            onActivate={() => setActiveField(type)}
            onDeactivate={() => setActiveField(null)}
          />
        ))}
      </div>
    );
  }
  return (
    <Suspense>
      <AutoFillInfoContent
        key={`${selectedPart.partId}-${selectedTemplateId}`}
        selectedPart={selectedPart}
        selectedTemplateId={selectedTemplateId}
      />
    </Suspense>
  );
};
