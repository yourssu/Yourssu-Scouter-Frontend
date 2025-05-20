import { TextButton } from '@yourssu/design-system-react';
import styled from 'styled-components';

export const DialogContainer = styled.div<{
  $width: number;
}>`
  width: ${({ $width }) => `${$width}px`};
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  box-shadow: 0 0 10px 0 rgba(110, 118, 135, 0.25);
  padding: 8px;
  z-index: 1;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    transition: background-color 0.3s ease;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    width: 8px;
    background-color: transparent;
    border-radius: 999px;
  }

  &:hover::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background-color: #b5b9c4;
    transition: background-color 0.3s ease;
  }
`;

export const StyledTextButton = styled(TextButton)`
  width: 100%;
  text-align: left;
  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  justify-content: flex-start;
  padding: 8px;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) =>
      theme.semantic.color.buttonTextSecondaryPressed};
    color: ${({ theme }) => theme.semantic.color.textBasicPrimary};
  }
`;
