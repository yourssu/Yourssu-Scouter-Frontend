import { styled } from 'styled-components';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
