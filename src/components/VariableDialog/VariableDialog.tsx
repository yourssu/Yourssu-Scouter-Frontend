import {
  BoxButton,
  IcArrowsChevronLeftLine,
  IcCalenderLine,
  IcEditLine,
  IcExternalLinkLine,
  IcUserLine,
  Switch,
  TextField,
} from '@yourssu/design-system-react';
import { DropdownMenu } from 'radix-ui';
import { useState } from 'react';
import {
  StyledBackButton,
  StyledContainer,
  StyledContent,
  StyledHeader,
  StyledInputContainer,
  StyledItem,
  StyledItemIcon,
  StyledItemText,
  StyledSwitchContainer,
  StyledSwitchLabel,
  StyledTitle,
  StyledTrigger,
  StyledVariableType,
} from './VariableDialog.style';

export type VariableType = '사람' | '날짜' | '링크' | '텍스트';

const variableTypes = [
  { type: '사람', icon: <IcUserLine width={20} /> },
  { type: '날짜', icon: <IcCalenderLine width={20} /> },
  { type: '링크', icon: <IcExternalLinkLine width={20} /> },
  { type: '텍스트', icon: <IcEditLine width={20} /> },
];

interface VariableDialogProps {
  onSelect: (
    type: VariableType,
    name: string,
    differentForEachPerson: boolean,
  ) => void;
  trigger: React.ReactNode;
}

export const VariableDialog = ({ onSelect, trigger }: VariableDialogProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'type' | 'name'>('type');
  const [selectedType, setSelectedType] = useState<VariableType | null>(null);
  const [variableName, setVariableName] = useState('');
  const [differentForEachPerson, setDifferentForEachPerson] = useState(false);

  const handleSelectType = (e: React.MouseEvent, type: VariableType) => {
    e.preventDefault();
    setSelectedType(type);
    setStep('name');
  };

  const handleBack = () => {
    setStep('type');
  };

  const handleSubmit = () => {
    if (selectedType && variableName.trim()) {
      onSelect(selectedType, variableName, differentForEachPerson);
      setOpen(false);
      resetState();
    }
  };

  const resetState = () => {
    setStep('type');
    setSelectedType(null);
    setVariableName('');
    setDifferentForEachPerson(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetState();
    }
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={handleOpenChange} modal={true}>
      <StyledTrigger asChild>{trigger}</StyledTrigger>
      <DropdownMenu.Portal>
        <StyledContent sideOffset={5} align="start">
          {step === 'type' ? (
            <>
              <StyledTitle>변수 유형</StyledTitle>
              {variableTypes.map(({ type, icon }) => (
                <StyledItem
                  key={type}
                  onClick={(e) => handleSelectType(e, type as VariableType)}
                >
                  <StyledItemIcon>{icon}</StyledItemIcon>
                  <StyledItemText>{type}</StyledItemText>
                </StyledItem>
              ))}
            </>
          ) : (
            <StyledContainer>
              <StyledHeader>
                <StyledBackButton onClick={handleBack}>
                  <IcArrowsChevronLeftLine width={16} />
                </StyledBackButton>
                변수 이름
              </StyledHeader>

              <StyledInputContainer>
                <TextField
                  value={variableName}
                  onChange={(e) => setVariableName(e.target.value)}
                  placeholder="변수 이름"
                  autoFocus
                />
                <StyledSwitchContainer>
                  <StyledSwitchLabel>
                    받는 사람마다 다르게 설정
                  </StyledSwitchLabel>
                  <Switch
                    size="medium"
                    isSelected={differentForEachPerson}
                    onSelectedChange={setDifferentForEachPerson}
                  />
                </StyledSwitchContainer>
                <StyledVariableType>
                  유형
                  <span>{selectedType}</span>
                </StyledVariableType>
              </StyledInputContainer>

              <BoxButton
                size="small"
                variant="filledPrimary"
                disabled={!variableName.trim()}
                onClick={handleSubmit}
                style={{ width: '100%' }}
              >
                추가하기
              </BoxButton>
            </StyledContainer>
          )}
        </StyledContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
