import { useState } from 'react';

import { MailDropdownSection } from '@/pages/SendMail/components/MailDropdownSection/MailDropdownSection';
import { MailEditor } from '@/pages/SendMail/components/MailEditor/MailEditor';
import { InfoSection } from '@/pages/SendMail/components/MailInfoSection/InfoSection';
import { MailSidebar } from '@/pages/SendMail/components/MailSidebar/MailSidebar';
import { SendMailModeProvider } from '@/pages/SendMail/components/SendMailMode/SendMailMode';
import { SendMailPageLayout } from '@/pages/SendMail/components/SendMailPageLayout/SendMailPageLayout';
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
          info: <InfoSection />,
          editor: <MailEditor type="normal" />,
          sidebar: <MailSidebar templateId={selectedTemplateId} />,
        }}
      />
    </SendMailModeProvider>
  );
};
