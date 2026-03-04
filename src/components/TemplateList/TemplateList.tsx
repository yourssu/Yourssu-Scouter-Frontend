import { IcTrashLine } from '@yourssu/design-system-react';

import {
  TemplateDate,
  TemplateItemContainer,
  TemplateItemContent,
  TemplateTitle,
  TrashIconButton,
} from './TemplateList.style';

export interface TemplateListProps {
  action?: React.ReactNode;
  date: string;
  onClick?: () => void;
  onDelete: () => void;
  text: string;
  title: string;
  variant?: 'error';
}

export const TemplateList = ({ action, title, date, onDelete, onClick, text, variant }: TemplateListProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <TemplateItemContainer $variant={variant} onClick={onClick}>
      <TemplateItemContent>
        <TemplateTitle>{title}</TemplateTitle>
        <TemplateDate $variant={variant}>
          {date}
          {text}
        </TemplateDate>
      </TemplateItemContent>
      {action ? (
        <div onClick={(e) => e.stopPropagation()}>{action}</div>
      ) : (
        <TrashIconButton onClick={handleDelete}>
          <IcTrashLine />
        </TrashIconButton>
      )}
    </TemplateItemContainer>
  );
};
