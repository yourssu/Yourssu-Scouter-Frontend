import { IcCalenderLine, IcClockLine } from "@yourssu/design-system-react";
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MiniDateFieldContainer } from "./DateField.style";

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
            return format(date, 'hh:mm a', { locale: ko });
        } else if (icon == 'IcClockLine' && !date) {
            return '오전 12:00';
        } else
            return format(date, 'MM/dd(E)', { locale: ko });
    };

    return (
        <MiniDateFieldContainer>
            {/* 아이콘 색깔 바꾸기 */}
            <IconComponent width={24} height={24} color="#6E7687"/>
            <span>{getDateFieldString()}</span>
        </MiniDateFieldContainer>
    );
}