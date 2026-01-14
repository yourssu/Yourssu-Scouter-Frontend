import { MailEditor } from '@/pages/SendMail/components/MailEditor/MailEditor';
import { Part } from '@/query/part/schema';

interface EditorSectionProps {
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
}

export const EditorSection = ({ selectedPart, selectedTemplateId }: EditorSectionProps) => {
  return <MailEditor type="tabs" />;
};
