import styled, { css } from 'styled-components';

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
  height: fit-content;
`;

interface TooltipContentProps {
  $position?: 'top' | 'bottom' | 'left' | 'right';
  $offset?: number;
}

export const TooltipContent = styled.div<TooltipContentProps>`
  position: absolute;
  white-space: nowrap;
  z-index: 1;
  padding: 8px 12px;
  background: #373a43;
  border-radius: ${({ theme }) => theme.semantic.radius.xs}px;
  color: ${({ theme }) => theme.semantic.color.textBasicWhite};
  ${({ theme }) => theme.typo.C1_Rg_13};

  &::after {
    content: '';
    position: absolute;
  }

  ${({ $position = 'top', $offset = 10 }) => {
    switch ($position) {
      case 'bottom':
        return css`
          top: calc(100% + ${$offset}px);
          left: 50%;
          transform: translateX(-50%);

          &::after {
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid #373a43;
          }
        `;
      case 'left':
        return css`
          right: calc(100% + ${$offset}px);
          top: 50%;
          transform: translateY(-50%);
          margin-bottom: 0;

          &::after {
            right: -8px;
            top: 50%;
            transform: translateY(-50%);
            border-left: 8px solid #373a43;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
          }
        `;
      case 'right':
        return css`
          left: calc(100% + ${$offset}px);
          top: 50%;
          transform: translateY(-50%);
          margin-bottom: 0;

          &::after {
            left: -8px;
            top: 50%;
            transform: translateY(-50%);
            border-right: 8px solid #373a43;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
          }
        `;
      default:
        return css`
          bottom: calc(100% + ${$offset}px);
          left: 50%;
          transform: translateX(-50%);

          &::after {
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #373a43;
          }
        `;
    }
  }}
`;
