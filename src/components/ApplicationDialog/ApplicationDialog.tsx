import {Popover} from "radix-ui";
import {ReactNode, useState} from "react";
import {
    StyledContent,
    StyledTitleContainer,
    StyledTitle,
    StyledTopContainer,
    StyledSupportingText,
    StyledCloseIcon,
    StyledBottomContainer,
    StyledBodyContainer,
    StyledFieldList
} from "@/components/ApplicationDialog/ApplicationDialog.style.ts";
import {BoxButton, IcCloseLine, IcPlusLine, TextField} from "@yourssu/design-system-react";
import {GenericDialog} from "@/components/dialog/GenericDialog.tsx";
import {useGetParts} from "@/hooks/useGetParts.ts";
import {Semester} from "@/scheme/semester.ts";
import {Part} from "@/scheme/part.ts";

interface ApplicationDialogProps {
    children: ReactNode;
    semester: Semester;
}

const ApplicationDialog = ({children, semester}: ApplicationDialogProps) => {
    const {data: parts} = useGetParts();
    const options = parts.map(p => ({label: p.partName}));
    const [selectedParts, setSelectedParts] = useState<Part[]>([]);

    const selectPart = (partName: string) => {
        if (selectedParts.some(p => p.partName === partName)) return;
        const part = parts.find(p => p.partName === partName);
        if (part) {
            setSelectedParts(prevState => [...prevState, part]);
        }
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                {children}
            </Popover.Trigger>
            <Popover.Portal>
                <StyledContent sideOffset={6} align="end">
                    <StyledTopContainer>
                        <StyledTitleContainer>
                            <StyledTitle>파트별 지원서 입력</StyledTitle>
                            <Popover.Close asChild>
                                <StyledCloseIcon>
                                    <IcCloseLine/>
                                </StyledCloseIcon>
                            </Popover.Close>
                        </StyledTitleContainer>
                        <StyledSupportingText>
                            리크루팅을 진행 중인 파트를 추가하고 파트별 지원서 Google Form 링크를 입력하세요.
                        </StyledSupportingText>
                    </StyledTopContainer>
                    <StyledBodyContainer>
                        <StyledFieldList>
                            {
                                selectedParts.map(part => (
                                    <TextField key={part.partId} placeholder={`[${semester.semester}] 유어슈 ${part.partName} 지원서 URL`}>
                                        <TextField.Label>{part.partName}</TextField.Label>
                                    </TextField>
                                ))
                            }
                        </StyledFieldList>
                        <GenericDialog width={160} options={options} onSelect={selectPart}>
                            {(triggerProps) => (
                                <BoxButton {...triggerProps} variant="filledSecondary" size="xsmall"
                                           rightIcon={<IcPlusLine/>}>파트 추가하기</BoxButton>
                            )}
                        </GenericDialog>
                    </StyledBodyContainer>
                    <StyledBottomContainer>
                        <BoxButton variant="filledPrimary" size="large">
                            저장하고 불러오기
                        </BoxButton>
                    </StyledBottomContainer>
                </StyledContent>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default ApplicationDialog;