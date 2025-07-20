import styled from 'styled-components';
import { Popover } from 'radix-ui';

export const CalendarDialogContainer = styled.div`
    width: 366px;
    background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
    border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
    border-radius: ${({ theme }) => theme.semantic.radius.m}px;
    box-shadow: 0px 0px 10px 0px rgba(110, 118, 135, 0.25);
    display: grid;
    padding: 12px;
    justify-items: center;
    z-index: 1;
    max-height: 438px;
    overflow-y: auto;
    gap: 20px;
`;

export const CalendarContainer = styled.div`
    width: 300px;
    display: grid;
    gap: 8px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;

export const CalendarHeaderText = styled.p`
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.B1_Rg_16}
`;

export const CalendarBody = styled.div`
  display: grid;
  gap: 8px;
`;

export const DayRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DayCell = styled.div`
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  ${({ theme }) => theme.typo.C1_Rg_13}
  text-align: center;
  justify-content: center;
  width: 36px;
`;

export const DateFieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const DatesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

export const StyledWrapper = styled.div`
  display: inline-block;
`;

export const StyledContent = styled(Popover.Content)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 16px;
  z-index: 1000;
`;

export const StyledTitle = styled.h3`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;
