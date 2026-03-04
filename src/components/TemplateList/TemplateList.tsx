import { IcTrashLine } from '@yourssu/design-system-react';

import {
  TemplateDate,
  TemplateItemContainer,
  TemplateItemContent,
  TemplateTitle,
  TrashIconButton,
} from './TemplateList.style';

export interface TemplateListProps {
  date: string;
  onClick?: () => void;
  onDelete: () => void;
  text: string;
  title: string;
}

export const TemplateList = ({ title, date, onDelete, onClick, text }: TemplateListProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <TemplateItemContainer onClick={onClick}>
      <TemplateItemContent>
        <TemplateTitle>{title}</TemplateTitle>
        <TemplateDate>
          {date}
          {text}
        </TemplateDate>
      </TemplateItemContent>
      <TrashIconButton onClick={handleDelete}>
        <IcTrashLine />
      </TrashIconButton>
    </TemplateItemContainer>
  );
};
