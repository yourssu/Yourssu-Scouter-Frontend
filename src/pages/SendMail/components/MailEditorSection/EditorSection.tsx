import { Part } from '@/query/part/schema';

import { MailEditor } from '../MailEditor/MailEditor';

interface EditorSectionProps {
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
}

export const EditorSection = ({ selectedPart, selectedTemplateId }: EditorSectionProps) => {
  return (
    <div className="border-line-basicMedium bg-bg-basicDefault mx-auto flex h-full w-full flex-col overflow-hidden rounded-xl border">
      {selectedPart && (
        <MailEditor
          key={`${selectedPart.partId}-${selectedTemplateId}`}
          selectedTemplateId={selectedTemplateId}
        />
      )}
    </div>
  );
};
