import { isSameDay } from 'date-fns';
import { useState } from 'react';
import { StyledDateCell } from './DateCell.style';

interface CalendarDateProps {
    date: Date;
    today: Date;
    firstDayOfMonth: Date;
    lastDayOfMonth: Date;
    selectedDate?: Date;
    onClick: () => void;
}

export type DateState = 'disabled' | 'unselected' | 'hovered' | 'selected' | 'today';

export const DateCell = ({
    date,
    today,
    firstDayOfMonth,
    lastDayOfMonth,
    selectedDate = undefined,
    onClick: handleDateClick,
}: CalendarDateProps) => {
    const [isHoverd, setIsHovered] = useState(false);
    let state: DateState;

    if (date < firstDayOfMonth || date > lastDayOfMonth) {
        state = 'disabled';
    } else if (selectedDate && isSameDay(date, selectedDate)) {
        state = 'selected';
    } else if (isSameDay(date, today)) {
        state = 'today';
    } else if (isHoverd) {
        state = 'hovered';
    } else {
        state = 'unselected';
    }

    const handleClick = () => {
        if (state !== 'disabled') {
            handleDateClick();
        }
    };

    const dateNum = date.getDate();

    return (
        <StyledDateCell
            $state={state}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {dateNum}
        </StyledDateCell>
    )

};
