import { IcTrashLine } from '@yourssu/design-system-react';
import {
  TemplateDate,
  TemplateItemContainer,
  TemplateItemContent,
  TemplateTitle,
  TrashIconButton,
} from './TemplateList.style';

export interface TemplateListProps {
  title: string;
  date: string;
  onDelete: () => void;
}

export const TemplateList = ({ title, date, onDelete }: TemplateListProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <TemplateItemContainer>
      <TemplateItemContent>
        <TemplateTitle>{title}</TemplateTitle>
        <TemplateDate>{date}</TemplateDate>
      </TemplateItemContent>
      <TrashIconButton onClick={handleDelete}>
        <IcTrashLine />
      </TrashIconButton>
    </TemplateItemContainer>
  );
};
