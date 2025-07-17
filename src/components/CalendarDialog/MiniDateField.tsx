import { MiniDateFieldContainer } from "./DateField.style"
import { IcCalenderLine, IcClockLine } from "@yourssu/design-system-react";

const iconMap = {
  IcCalendarLine: IcCalenderLine,
  IcClockLine: IcClockLine,
};

interface DateFieldProps {
    date: string;
    icon: keyof typeof iconMap;
}

export const MiniDateField = ({
    date = '',
    icon = 'IcCalendarLine',
}: DateFieldProps ) => {
    const IconComponent = iconMap[icon];

    return (
        <MiniDateFieldContainer $width={366} $height={48}>
            {/* 아이콘 색깔 바꾸기 */}
            <IconComponent width={24} height={24} color="#6E7687"/>
            <span>{date}</span>
        </MiniDateFieldContainer>
    );
}