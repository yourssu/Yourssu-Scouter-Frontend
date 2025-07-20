import { IcCalenderLine, IcClockLine } from "@yourssu/design-system-react";
import { MiniDateFieldContainer } from "./DateField.style";
import { formatTemplates } from "./date";

const iconMap = {
  IcCalendarLine: IcCalenderLine,
  IcClockLine: IcClockLine,
};

interface DateFieldProps {
    date: Date;
    icon: keyof typeof iconMap;
}

export const MiniDateField = ({
    date,
    icon = 'IcCalendarLine',
}: DateFieldProps ) => {
    const IconComponent = iconMap[icon];

    const getDateFieldString = () => {
        if (icon == 'IcClockLine' && date) {
            return formatTemplates['오전 12:00'](date);
        } else if (icon == 'IcClockLine' && !date) {
            return '오전 12:00';
        } else
            return formatTemplates['01/01(월)'](date);
    };

    return (
        <MiniDateFieldContainer>
            {/* 아이콘 색깔 바꾸기 */}
            <IconComponent width={24} height={24} color="#6E7687"/>
            <span>{getDateFieldString()}</span>
        </MiniDateFieldContainer>
    );
}