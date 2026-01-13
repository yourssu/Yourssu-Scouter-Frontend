import { Suspense, useState } from 'react';

import { AutoFillInfoContent } from '@/pages/SendMail/components/MailInfoSection/AutoFillInfoContent';
import { InputField } from '@/pages/SendMail/components/MailInfoSection/InputField';
import { Part } from '@/query/part/schema';
import { InputFieldTypes } from '@/types/editor';

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
            isActive={activeField === type}
            items={[]}
            key={type}
            label={type}
            onActivate={() => setActiveField(type)}
            onDeactivate={() => setActiveField(null)}
            onUpdate={() => {}}
          />
        ))}
      </div>
    );
  }
  return (
    <Suspense>
      <AutoFillInfoContent
        key={selectedPart.partId}
        selectedPart={selectedPart}
        selectedTemplateId={selectedTemplateId}
      />
    </Suspense>
  );
};
