import { Part } from '@/query/part/schema';

import { MailEditor } from '../MailEditor/MailEditor';

interface EditorSectionProps {
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
}

export const EditorSection = ({ selectedPart, selectedTemplateId }: EditorSectionProps) => {
  return (
    <div className="border-line-basicMedium bg-bg-basicDefault mx-auto flex h-full max-h-[690px] w-full flex-col rounded-xl border">
      {selectedPart && (
        <MailEditor
          key={selectedPart.partId && selectedTemplateId}
          selectedTemplateId={selectedTemplateId}
        />
      )}
    </div>
  );
};
