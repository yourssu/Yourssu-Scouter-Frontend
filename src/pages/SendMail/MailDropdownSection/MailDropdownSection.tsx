import { PartDropdown, TemplateDropdown } from '@/components/MailDropdown/MailDropdown';
import { Part } from '@/query/part/schema';

interface MailDropdownSectionProps {
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
  setSelectedPart: (part: Part | undefined) => void;
  setSelectedTemplateId: (templateId: number | undefined) => void;
}

export const MailDropdownSection = ({
  selectedPart,
  setSelectedPart,
  selectedTemplateId,
  setSelectedTemplateId,
}: MailDropdownSectionProps) => {
  return (
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
  );
};
