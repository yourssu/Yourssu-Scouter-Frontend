import { useState } from 'react';

import { InputField } from '@/pages/SendMail/components/MailInfoSection/InputField';

const InputFieldTypes = ['받는 사람', '보내는 사람', '숨은 참조', '제목'] as const;

export const InfoSection = () => {
  const [activeField, setActiveField] = useState<(typeof InputFieldTypes)[number] | null>(null);
  return (
    <div className="gap-0">
      {InputFieldTypes.map((type) => (
        <InputField
          isActive={activeField === type}
          key={type}
          label={type}
          onActivate={() => setActiveField(type)}
          onDeactivate={() => setActiveField(null)}
        />
      ))}
    </div>
  );
};
