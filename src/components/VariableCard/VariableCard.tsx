import { CardContainer, CardTitle, Count } from './VariableCard.style';
import { BaseVariableCardProps } from './VariableCardType';

export const VariableCard = ({
  title,
  count,
  children,
}: React.PropsWithChildren<BaseVariableCardProps>) => {
  return (
    <CardContainer>
      <CardTitle>
        {title}
        {typeof count === 'number' && <Count>{count}</Count>}
      </CardTitle>
      {children}
    </CardContainer>
  );
};
