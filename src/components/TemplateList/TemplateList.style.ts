import styled from 'styled-components';

export const TemplateItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1574px;
  height: 98px;
  border-radius: ${({ theme }) => theme.semantic.radius.s}px;
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
  cursor: pointer;
`;

export const TemplateItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

export const TemplateTitle = styled.h3`
  ${({ theme }) => theme.typo.T3_Sb_20};
  color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
`;

export const TemplateDate = styled.span`
  ${({ theme }) => theme.typo.B2_Rg_15};
  color: ${({ theme }) => theme.semantic.color.textBasicTertiary};
`;

export const TrashIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.semantic.color.iconBasicSecondary};
  }
`;
