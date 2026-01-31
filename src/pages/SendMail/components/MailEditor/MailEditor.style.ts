import { styled } from 'styled-components';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  border-radius: ${({ theme }) => theme.semantic.radius.xl}px;
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicMedium};
  width: 1160px;
  max-height: 690px;
  height: 100%;
  margin: 0 auto;
`;
