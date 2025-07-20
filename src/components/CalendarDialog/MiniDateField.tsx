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

    if (icon == 'IcClockLine' && date) {
        const [hours, minutes] = date.split(':');
        let hoursNum = parseInt(hours, 10);
        if (hoursNum < 12) {
            hoursNum = hoursNum === 0 ? 12 : hoursNum;
            date = `오전 ${hoursNum}:${minutes}`;
        } else {
            hoursNum = hoursNum === 12 ? 12 : hoursNum - 12;
            date = `오후 ${hoursNum}:${minutes}`;
        }
    }
    else if (icon == 'IcClockLine' && !date)
        date = '오전 12:00';
    else if (icon == 'IcCalendarLine' && !date)
        date = '날짜 선택 안됨';

    return (
        <MiniDateFieldContainer>
            {/* 아이콘 색깔 바꾸기 */}
            <IconComponent width={24} height={24} color="#6E7687"/>
            <span>{date}</span>
        </MiniDateFieldContainer>
    );
}