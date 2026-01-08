import { useSuspenseQuery } from '@tanstack/react-query';
import { IcArrowsChevronDownLine } from '@yourssu/design-system-react';
import { DropdownMenu } from 'radix-ui';
import { PropsWithChildren, useState } from 'react';

import { partOptions } from '@/query/part/options.ts';
import { Part } from '@/query/part/schema';
import { templateOptions } from '@/query/template/options';

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
  isDisabled?: boolean;
  onSelectPart?: (part: Part) => void;
  selectedPart?: Part;
}

export const PartDropdown = ({
  children,
  onSelectPart,
  selectedPart,
  isDisabled,
}: PartDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: parts = [] } = useSuspenseQuery(partOptions());

  const handleSelect = (part: Part) => {
    if (onSelectPart) {
      onSelectPart(part);
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu.Root onOpenChange={setIsOpen} open={isOpen}>
      <StyledTrigger asChild disabled={isDisabled}>
        {children || (
          <StyledDropdownContainer>
            <StyledLabel>{selectedPart ? selectedPart.partName : '파트 선택'}</StyledLabel>
            <IcArrowsChevronDownLine color={isDisabled ? '#B5B9C4' : '#000'} />
          </StyledDropdownContainer>
        )}
      </StyledTrigger>

      <DropdownMenu.Portal>
        <StyledContent align="start" sideOffset={5}>
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

interface TemplateDropdownProps extends PropsWithChildren {
  isDisabled?: boolean;
  onSelectTemplateId?: (templateId: number) => void;
  selectedTemplateId?: number;
}

export const TemplateDropdown = ({
  children,
  selectedTemplateId,
  onSelectTemplateId,
  isDisabled,
}: TemplateDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: templates = [] } = useSuspenseQuery(templateOptions.all());
  const selectedTemplate = templates.find((template) => template.id === selectedTemplateId);

  const handleSelect = (templateId: number) => {
    if (onSelectTemplateId) {
      onSelectTemplateId(templateId);
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu.Root onOpenChange={setIsOpen} open={isOpen}>
      <StyledTrigger asChild disabled={isDisabled}>
        {children || (
          <StyledDropdownContainer>
            <StyledSelectedLabel $isDisabled={isDisabled}>
              {selectedTemplate ? selectedTemplate.title : '템플릿 선택'}
            </StyledSelectedLabel>
            <IcArrowsChevronDownLine color={isDisabled ? '#B5B9C4' : '#000'} />
          </StyledDropdownContainer>
        )}
      </StyledTrigger>

      <DropdownMenu.Portal>
        <StyledContent align="start" sideOffset={5}>
          <StyledItemsContainer>
            {templates.map((template, index) => (
              <StyledItem key={index} onClick={() => handleSelect(template.id)}>
                <StyledItemText>{template.title}</StyledItemText>
              </StyledItem>
            ))}
          </StyledItemsContainer>
        </StyledContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
