import { useState } from 'react';

import { InputField } from '@/components/InputField/InputField';
import { PageLayout } from '@/components/layouts/PageLayout';
import { PartDropdown, TemplateDropdown } from '@/components/MailDropdown/MailDropdown';
import { MailEditor } from '@/pages/SendMail/MailEditor/MailEditor';
import { Part } from '@/query/part/schema';

export const SendMail = () => {
  const [selectedPart, setSelectedPart] = useState<Part | undefined>(undefined);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | undefined>(undefined);

  return (
    <PageLayout>
      <div className="flex h-full flex-row">
        <div className="flex w-full flex-col gap-[20px] p-[40px]">
          <div className="flex w-full flex-row gap-[12px]">
            <PartDropdown
              disabled={selectedTemplateId !== undefined}
              onSelectPart={setSelectedPart}
              selectedPart={selectedPart}
            />
            <TemplateDropdown
              disabled={selectedPart === undefined}
              onSelectTemplateId={setSelectedTemplateId}
              selectedTemplateId={selectedTemplateId}
            />
          </div>
          <div className="flex h-full w-full flex-col gap-[20px]">
            <div className="gap-0">
              <InputField label="보내는 사람" />
              <InputField label="받는 사람" />
              <InputField label="숨은 참조" />
              <InputField label="제목" />
            </div>
            <div className="flex h-full w-full">
              <MailEditor type="normal" />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
