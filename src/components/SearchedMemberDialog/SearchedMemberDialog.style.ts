import { TextButton } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1;
`;

export const StyledContent = styled(Popover.Content)`
  display: flex;
  padding: 10px;
  flex-direction: column;
  width: 100%;
  min-width: 260px;
  gap: 10px;
  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  box-shadow: 0 0 10px 0 rgba(110, 118, 135, 0.25);
`;

export const StyledGroup = styled.div`
  overflow-y: auto;
  max-height: 200px;
  width: 100%;
`;

export const StyledItem = styled.div`
  width: 100%;
`;

export const StyledButton = styled(TextButton)`
  width: 100%;
  border-radius: ${({ theme }) => theme.semantic.radius.xs}px;

  & > span {
    width: 100%;
    text-align: left;
    ${({ theme }) => theme.typo.B3_Rg_14};
    color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  }
`;
