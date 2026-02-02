import { useState } from 'react';

import { MailDropdownSection } from '@/pages/SendMail/components/MailDropdownSection/MailDropdownSection';
import { EditorSection } from '@/pages/SendMail/components/MailEditorSection/EditorSection';
import { InfoSection } from '@/pages/SendMail/components/MailInfoSection/InfoSection';
import { MailSidebar } from '@/pages/SendMail/components/MailSidebar/MailSidebar';
import { MailVariableProvider } from '@/pages/SendMail/components/MailVariable/MailVariable';
import { SendMailModeProvider } from '@/pages/SendMail/components/SendMailMode/SendMailMode';
import { SendMailPageLayout } from '@/pages/SendMail/components/SendMailPageLayout/SendMailPageLayout';
import { Part } from '@/query/part/schema';

export const SendMail = () => {
  const [selectedPart, setSelectedPart] = useState<Part | undefined>(undefined);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | undefined>(undefined);

  return (
    <SendMailModeProvider>
      <MailVariableProvider>
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
              <InfoSection selectedPart={selectedPart} selectedTemplateId={selectedTemplateId} />
            ),
            editor: (
              <EditorSection selectedPart={selectedPart} selectedTemplateId={selectedTemplateId} />
            ),
            sidebar: <MailSidebar templateId={selectedTemplateId} />,
          }}
        />
      </MailVariableProvider>
    </SendMailModeProvider>
  );
};
