import styled from 'styled-components';
import { DateState } from './DateCell';

export const StyledDateCell = styled.div<{
    $state: DateState;
}>`
    min-width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    gap: 10px;
    cursor: default;
    user-select: none;
    ${({ theme }) => theme.typo.B2_Rg_15}

    ${({ $state, theme }) => {
    switch ($state) {
      case 'disabled':
        return `
          color: ${theme.semantic.color.textBasicDisabled};
          background: none;
        `;
      case 'unselected':
        return `
          color: ${theme.semantic.color.textBasicPrimary};
          background: none;
        `;
      case 'hovered':
        return `
          color: ${theme.semantic.color.textBasicPrimary};
          background: ${theme.semantic.color.bgBrandSecondary};
          border-radius: 50%;
        `;
      case 'selected':
        return `
          color: ${theme.semantic.color.textBasicWhite};
          background: ${theme.semantic.color.bgBrandPrimary};
          border-radius: 50%;
        `;
      case 'today':
        return `
          color: ${theme.semantic.color.textBasicPrimary};
          background: ${theme.semantic.color.bgBasicStrong};
          border-radius: 50%;
        `;
    }
  }}    
`;