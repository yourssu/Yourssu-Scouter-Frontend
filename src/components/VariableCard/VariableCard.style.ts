import { BoxButton } from '@yourssu/design-system-react';
import styled from 'styled-components';

export const CardContainer = styled.div`
  border-radius: ${({ theme }) => theme.semantic.radius.l}px;
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  padding: 12px 16px;
  width: 398px;
`;

export const CardTitle = styled.h3`
  ${({ theme }) => theme.typo.B1_Sb_16}
  color: ${({ theme }) => theme.semantic.color.textBasicSecondary};
  margin-bottom: 12px;
`;

export const Count = styled.span`
  margin-left: 4px;
  color: ${({ theme }) => theme.semantic.color.textBrandPrimary};
`;

export const StyledBoxButton = styled(BoxButton)`
  cursor: pointer;
`;

export const NameTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

export const TextFieldContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;
