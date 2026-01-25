import { useSuspenseQueries } from '@tanstack/react-query';
import { Suspense } from 'react';

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
  const { activeApplicantId, actions } = useMailVariables();

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
        id: String(a.applicantId),
        name: a.name,
      }))
    : [];

  const currentId = activeApplicantId ?? recipients[0]?.id;
  const activeRecipientName = recipients.find((r) => r.id === currentId)?.name;

  const handleTabChange = (id: string) => {
    actions.setActiveApplicantId(id); // useEffect 대신 즉시 호출 권장
  };

  return (
    <div className="border-line-basicMedium bg-bg-basicDefault mx-auto flex h-full max-h-[690px] w-full flex-col rounded-xl border-[1px]">
      <MailHeader
        activeTabId={currentId}
        onTabChange={handleTabChange}
        recipients={recipients}
        type="tabs"
      />
      <Suspense>
        <MailEditorContent
          initialContent={templateDetail?.content || ''}
          key={currentId}
          recipientName={activeRecipientName}
        />
      </Suspense>
    </div>
  );
};
