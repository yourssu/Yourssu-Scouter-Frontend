import { useState } from 'react';

import { InputField } from '@/components/InputField/InputField';
import { MailDropdownSection } from '@/pages/SendMail/MailDropdownSection/MailDropdownSection';
import { MailEditor } from '@/pages/SendMail/MailEditor/MailEditor';
import { SendMailModeProvider } from '@/pages/SendMail/SendMailMode/SendMailMode';
import { SendMailPageLayout } from '@/pages/SendMail/SendMailPageLayout/SendMailPageLayout';
import { Part } from '@/query/part/schema';

export const SendMail = () => {
  const [selectedPart, setSelectedPart] = useState<Part | undefined>(undefined);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | undefined>(undefined);

  return (
    <SendMailModeProvider>
      <SendMailPageLayout
        slots={{
          dropdown: (
            <MailDropdownSection
              selectedPart={selectedPart}
              selectedTemplateId={selectedTemplateId}
              setSelectedPart={setSelectedPart}
              setSelectedTemplateId={setSelectedTemplateId}
            />
          ),
          info: (
            <div className="gap-0">
              <InputField label="보내는 사람" />
              <InputField label="받는 사람" />
              <InputField label="숨은 참조" />
              <InputField label="제목" />
            </div>
          ),
          editor: <MailEditor type="normal" />,
          sidebar: <div>Sidebar Content</div>,
        }}
      />
    </SendMailModeProvider>
  );
};
