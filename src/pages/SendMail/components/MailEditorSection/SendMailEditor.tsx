import { useSuspenseQueries } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { MailEditorContent } from '@/pages/SendMail/components/MailEditorContent/MailEditorContent';
import { MailHeader } from '@/pages/SendMail/components/MailHeader/MailHeader';
import { useMailVariables } from '@/pages/SendMail/components/MailVariable/MailVariable';
import { applicantOptions } from '@/query/applicant/options';
import { Part } from '@/query/part/schema';
import { templateOptions } from '@/query/template/options';

import { Recipient } from '../../mail.type';

export const SendMailEditor = ({
  selectedPart,
  selectedTemplateId,
}: {
  selectedPart: Part;
  selectedTemplateId?: number;
}) => {
  const { actions } = useMailVariables();

  const results = useSuspenseQueries({
    queries: [
      applicantOptions({ partId: selectedPart.partId }),
      ...(selectedTemplateId ? [templateOptions.detail(selectedTemplateId)] : []),
    ],
  });

  const applicants = results[0].data;
  const templateDetail = results[1]?.data;

  const recipients: Recipient[] = Array.isArray(applicants)
    ? applicants.map((a) => ({
        id: a.applicantId,
        name: a.name,
      }))
    : [];

  const [activeTabId, setActiveTabId] = useState<string | undefined>(recipients[0]?.id);
  const activeRecipientName = recipients.find((r) => r.id === activeTabId)?.name;

  useEffect(() => {
    actions.setActiveApplicantId(activeTabId);
  }, [activeTabId, actions]);

  return (
    <div className="border-line-basicMedium bg-bg-basicDefault mx-auto flex h-full max-h-[690px] w-full flex-col rounded-xl border-[1px]">
      <MailHeader onTabChange={(id) => setActiveTabId(id)} recipients={recipients} type="tabs" />
      <MailEditorContent
        initialContent={templateDetail?.content || ''}
        key={selectedTemplateId || 'default'}
        recipientName={activeRecipientName}
      />
    </div>
  );
};
