import { partOptions } from '@/query/part/options.ts';
import { Part } from '@/query/part/schema';
import { useSuspenseQuery } from '@tanstack/react-query';
import { IcArrowsChevronDownLine } from '@yourssu/design-system-react';
import { DropdownMenu } from 'radix-ui';
import { PropsWithChildren, useState } from 'react';
import {
  StyledContent,
  StyledDropdownContainer,
  StyledItem,
  StyledItemsContainer,
  StyledItemText,
  StyledLabel,
  StyledSelectedLabel,
  StyledTrigger,
} from './MailDropdown.style';

interface PartDropdownProps extends PropsWithChildren {
  onSelectPart?: (part: Part) => void;
}

export const PartDropdown = ({ children, onSelectPart }: PartDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const { data: parts = [] } = useSuspenseQuery(partOptions());

  const handleSelect = (part: Part) => {
    setSelectedPart(part);
    if (onSelectPart) {
      onSelectPart(part);
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <StyledTrigger asChild>
        {children || (
          <StyledDropdownContainer>
            <StyledLabel>
              {selectedPart ? selectedPart.partName : '파트 선택'}
            </StyledLabel>
            <IcArrowsChevronDownLine />
          </StyledDropdownContainer>
        )}
      </StyledTrigger>

      <DropdownMenu.Portal>
        <StyledContent sideOffset={5} align="start">
          <StyledItemsContainer>
            {parts.map((part, index) => (
              <StyledItem key={index} onClick={() => handleSelect(part)}>
                <StyledItemText>{part.partName}</StyledItemText>
              </StyledItem>
            ))}
          </StyledItemsContainer>
        </StyledContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

type MailType = '합격' | '불합격';
type MailLevel = '1차' | '최종';

interface MailTemplate {
  level: MailLevel;
  type: MailType;
  label: string;
}

interface TemplateDropdownProps extends PropsWithChildren {
  onSelectTemplate?: (template: MailTemplate) => void;
}

const templates: MailTemplate[] = [
  { level: '1차', type: '합격', label: '[1차 서류 합격 메일]' },
  { level: '1차', type: '불합격', label: '[1차 서류 불합격 메일]' },
  { level: '최종', type: '합격', label: '[최종 합격 메일]' },
  { level: '최종', type: '불합격', label: '[최종 불합격 메일]' },
];

export const TemplateDropdown = ({
  children,
  onSelectTemplate,
}: TemplateDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<MailTemplate | null>(
    null,
  );

  const handleSelect = (template: MailTemplate) => {
    setSelectedTemplate(template);
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <StyledTrigger asChild>
        {children || (
          <StyledDropdownContainer>
            <StyledSelectedLabel>
              {selectedTemplate ? selectedTemplate.label : '템플릿 선택'}
            </StyledSelectedLabel>
            <IcArrowsChevronDownLine />
          </StyledDropdownContainer>
        )}
      </StyledTrigger>

      <DropdownMenu.Portal>
        <StyledContent sideOffset={5} align="start">
          <StyledItemsContainer>
            {templates.map((template, index) => (
              <StyledItem key={index} onClick={() => handleSelect(template)}>
                <StyledItemText>{template.label}</StyledItemText>
              </StyledItem>
            ))}
          </StyledItemsContainer>
        </StyledContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
