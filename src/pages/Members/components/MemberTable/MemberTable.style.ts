import { BoxButton } from '@yourssu/design-system-react';
import styled from 'styled-components';

export const ActivePeriod = styled(BoxButton)`
  pointer-events: none;
`;

export const InactivePeriod = styled(BoxButton)`
  pointer-events: none;
  color: ${({ theme }) => theme.semantic.color.textBasicTertiary} !important;
`;

export const StyledPaginationWrapper = styled.div`
  margin-top: 16px;
`;
