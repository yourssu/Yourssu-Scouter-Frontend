import styled from "styled-components";
import {BoxButton} from "@yourssu/design-system-react";

export const ActivePeriod = styled(BoxButton)`
    pointer-events: none;
`;

export const InactivePeriod = styled(BoxButton)`
    pointer-events: none;
    color: ${({theme}) => theme.semantic.color.textBasicTertiary} !important;
`;