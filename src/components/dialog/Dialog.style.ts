import { TextButton } from "@yourssu/design-system-react";
import styled from "styled-components";

export const DialogContainer = styled.div<{
  $isOpen: boolean;
  $position: "top" | "bottom";
  $width: number;
}>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: absolute;
  ${({ $position }) => ($position === "top" ? "bottom: 110%" : "top: 110%")};
  width: ${({ $width }) => `${$width}px`};
  background: ${({ theme }) => theme.semantic.color.bgBasicDefault};
  border: 1px solid ${({ theme }) => theme.semantic.color.lineBasicLight};
  border-radius: ${({ theme }) => theme.semantic.radius.m}px;
  box-shadow: 0px 0px 10px 0px rgba(110, 118, 135, 0.25);
  padding: 8px;
  z-index: 1;
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
