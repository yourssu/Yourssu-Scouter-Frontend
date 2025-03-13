import { DropdownMenu, Popover } from 'radix-ui';
import { ReactNode, useState } from 'react';
import {
  StyledContent,
  StyledTitleContainer,
  StyledTitle,
  StyledTopContainer,
  StyledSupportingText,
  StyledBottomContainer,
  StyledBodyContainer,
  StyledFieldList,
  StyledIconButton,
  StyledFieldContainer,
  StyledOptionContent,
} from '@/components/ApplicationDialog/ApplicationDialog.style.ts';
import {
  BoxButton,
  IcCloseLine,
  IcCopyLine,
  IcMenuLine,
  IcPlusLine,
  IcTrashLine,
  TextButton,
  TextField,
} from '@yourssu/design-system-react';
import { GenericDialog } from '@/components/dialog/GenericDialog.tsx';
import { useGetParts } from '@/hooks/useGetParts.ts';
import { Semester } from '@/scheme/semester.ts';
import { Part } from '@/scheme/part.ts';
import { usePostApplicantsFromForms } from '@/hooks/applicants/usePostApplicantsFromForms.ts';

interface ApplicationDialogProps {
  children: ReactNode;
  semester: Semester;
}

const ApplicationDialog = ({ children, semester }: ApplicationDialogProps) => {
  const { data: parts } = useGetParts();
  const options = parts.map((p) => ({ label: p.partName }));
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const postApplicantsFromFormMutation = usePostApplicantsFromForms();

  const selectPart = (partName: string) => {
    if (selectedParts.some((p) => p.partName === partName)) return;
    const part = parts.find((p) => p.partName === partName);
    if (part) {
      setSelectedParts((prevState) => [...prevState, part]);
    }
  };

  const deletePart = (partId: number) => () => {
    setSelectedParts((prevState) =>
      prevState.filter((p) => p.partId !== partId),
    );
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <StyledContent sideOffset={6} align="end">
          <StyledTopContainer>
            <StyledTitleContainer>
              <StyledTitle>파트별 지원서 입력</StyledTitle>
              <Popover.Close asChild>
                <StyledIconButton>
                  <IcCloseLine />
                </StyledIconButton>
              </Popover.Close>
            </StyledTitleContainer>
            <StyledSupportingText>
              리크루팅을 진행 중인 파트를 추가하고 파트별 지원서 Google Form
              링크를 입력하세요.
            </StyledSupportingText>
          </StyledTopContainer>
          <StyledBodyContainer>
            <StyledFieldList>
              {selectedParts.map((part) => (
                <StyledFieldContainer key={part.partId}>
                  <TextField
                    placeholder={`[${semester.semester}] 유어슈 ${part.partName} 지원서 URL`}
                  >
                    <TextField.Label>{part.partName}</TextField.Label>
                  </TextField>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <StyledIconButton>
                        <IcMenuLine />
                      </StyledIconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <StyledOptionContent align="end" sideOffset={6}>
                        <DropdownMenu.Item asChild>
                          <TextButton
                            leftIcon={<IcCopyLine />}
                            width="100%"
                            size="medium"
                            variant="textSecondary"
                          >
                            URL 복사
                          </TextButton>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                          <TextButton
                            leftIcon={<IcTrashLine />}
                            width="100%"
                            size="medium"
                            variant="textSecondary"
                            onClick={deletePart(part.partId)}
                          >
                            파트 삭제
                          </TextButton>
                        </DropdownMenu.Item>
                      </StyledOptionContent>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </StyledFieldContainer>
              ))}
            </StyledFieldList>
            <GenericDialog width={160} options={options} onSelect={selectPart}>
              {(triggerProps) => (
                <BoxButton
                  {...triggerProps}
                  variant="filledSecondary"
                  size="xsmall"
                  rightIcon={<IcPlusLine />}
                >
                  파트 추가하기
                </BoxButton>
              )}
            </GenericDialog>
          </StyledBodyContainer>
          <StyledBottomContainer>
            <BoxButton
              onClick={() => postApplicantsFromFormMutation.mutate()}
              variant="filledPrimary"
              size="large"
            >
              저장하고 불러오기
            </BoxButton>
          </StyledBottomContainer>
        </StyledContent>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ApplicationDialog;
