import { TextButton } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import styled from 'styled-components';

export const StyledContent = styled(Popover.Content)<{ $gap: boolean }>`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  gap: ${({ $gap }) => ($gap ? 10 : 0)}px;

  &[data-side='bottom'] {
    flex-direction: column-reverse;
  }

  &[data-side='top'] {
    flex-direction: column;
  }

  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  box-shadow: 0 0 10px 0 rgba(110, 118, 135, 0.25);
`;

export const StyledGroup = styled.div`
  display: flex;
  max-height: 200px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow: auto;
`;

export const StyledItem = styled.div`
  width: 100%;
`;

export const StyledButton = styled(TextButton)`
  width: 100%;

  & > span {
    width: 100%;
    text-align: left;
  }
`;
