import { SendMailEditor } from '@/pages/SendMail/components/MailEditorSection/SendMailEditor';
import { Part } from '@/query/part/schema';

interface EditorSectionProps {
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
}

export const EditorSection = ({ selectedPart, selectedTemplateId }: EditorSectionProps) => {
  return (
    <div className="border-line-basicMedium bg-bg-basicDefault mx-auto flex h-full max-h-[690px] w-full flex-col rounded-xl border">
      {selectedPart && (
        <SendMailEditor
          key={selectedPart.partId && selectedTemplateId}
          selectedPart={selectedPart}
          selectedTemplateId={selectedTemplateId}
        />
      )}
    </div>
  );
};
