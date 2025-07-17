import { useState } from 'react';
import { StyledDateCell } from './DateCell.style';

interface CalendarDateProps {
    date: Date;
    firstDayOfMonth: Date;
    lastDayOfMonth: Date;
    selectedDate?: string;
    onClick: () => void;
}

export type DateState = 'disabled' | 'unselected' | 'hovered' | 'selected' | 'today';

export const DateCell = ({
    date,
    firstDayOfMonth,
    lastDayOfMonth,
    selectedDate,
    onClick: handleDateClick,
}: CalendarDateProps) => {
    const [isHoverd, setIsHovered] = useState(false);
    let state: DateState;

    if (date < firstDayOfMonth || date > lastDayOfMonth) {
        state = 'disabled';
    } else if (selectedDate && date.toLocaleDateString() === selectedDate) {
        state = 'selected';
    } else if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
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

    return (
        <StyledDateCell
            $state={state}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {date.getDate()}
        </StyledDateCell>
    )

};
