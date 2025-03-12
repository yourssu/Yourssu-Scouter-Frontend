import { IcEditLine } from '@yourssu/design-system-react';
import { GenericDialog } from '@/components/dialog/GenericDialog.tsx';
import { useGetParts } from '@/hooks/useGetParts.ts';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  StyledContainer,
  StyledEditIcon,
} from '@/components/Cell/Cell.style.ts';
import { Tooltip } from '@/components/Tooltip/Tooltip.tsx';

interface PartsCellProps {
  onSelect: (value: string) => void;
  children: ReactNode;
  tooltipContent: string;
}

const PartsCell = ({ tooltipContent, children, onSelect }: PartsCellProps) => {
  const { data: parts } = useGetParts();
  const options = parts.map((part) => ({ label: part.partName }));
  const ref = useRef<HTMLSpanElement | null>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }
  }, []);

  return (
    <GenericDialog width={width} options={options} onSelect={onSelect}>
      {(triggerProps) => (
        <StyledContainer $bold={false} $editable={true} ref={ref}>
          {children}
          <StyledEditIcon {...triggerProps}>
            <Tooltip content={tooltipContent}>
              <IcEditLine width={20} height={20} />
            </Tooltip>
          </StyledEditIcon>
        </StyledContainer>
      )}
    </GenericDialog>
  );
};

export default PartsCell;
