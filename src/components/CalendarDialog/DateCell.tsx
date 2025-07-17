import { useState } from 'react';
import { StyledDateCell } from './DateCell.style';

interface CalendarDateProps {
    date: string;
    today: string;
    firstDayOfMonth: string;
    lastDayOfMonth: string;
    selectedDate?: string;
    onClick: () => void;
}

export type DateState = 'disabled' | 'unselected' | 'hovered' | 'selected' | 'today';

export const DateCell = ({
    date,
    today,
    firstDayOfMonth,
    lastDayOfMonth,
    selectedDate = '',
    onClick: handleDateClick,
}: CalendarDateProps) => {
    const [isHoverd, setIsHovered] = useState(false);
    let state: DateState;

    if (date < firstDayOfMonth || date > lastDayOfMonth) {
        state = 'disabled';
    } else if (selectedDate && date.slice(0,9) === selectedDate.slice(0,9)) {
        state = 'selected';
    } else if (date.slice(0,9) === today.slice(0,9)) {
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

    const dateNum = parseInt(date.slice(3, 5), 10);

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
