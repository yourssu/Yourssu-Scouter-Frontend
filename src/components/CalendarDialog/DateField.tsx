import { DateFieldContainer } from "./DateField.style"
import { IcCalenderLine } from "@yourssu/design-system-react";
import { weekdays } from "./CalendarDialog";

interface DateFieldProps {
    date: Date;
}

export const DateField = ({
    date,
}: DateFieldProps ) => {

    const getFormattedDate = (target: Date): string => {
        const month = String(target.getMonth() + 1).padStart(2, '0');
        const date = String(target.getDate()).padStart(2, '0');
        const day = weekdays[target.getDay()];
        const hours = String(target.getHours()).padStart(2, '0');
        const minutes = String(target.getMinutes()).padStart(2, '0');

        return `${month}/${date}(${day}) ${hours}:${minutes}`;
    };

    return (
        <DateFieldContainer>
            <p>{getFormattedDate(date)}</p>
            <IcCalenderLine width={20} height={20} />
        </DateFieldContainer>
    );
}