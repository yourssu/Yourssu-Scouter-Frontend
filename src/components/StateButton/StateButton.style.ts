import { BoxButton } from "@yourssu/design-system-react";
import styled from "styled-components";

interface StyledBoxButtonProps {
  $selectedValue: string;
}

export const StyledBoxButton = styled(BoxButton)<StyledBoxButtonProps>`
  ${(props) => {
    const colorMap = {
      gray: {
        states: ["심사 진행 중", "비액티브", "졸업"],
        colors: {
          bg: "#F1F1F4",
          text: "#9093A5",
          hover: "#DDDDE4",
        },
      },
      red: {
        states: ["탈퇴", "면접 불합", "인큐베이팅 불합", "서류 불합"],
        colors: {
          bg: "#FFEBEB",
          text: "#FF5C5C",
          hover: "#FFC2C2",
        },
      },
    };

    for (const [, config] of Object.entries(colorMap)) {
      if (config.states.includes(props.$selectedValue)) {
        return `
            background-color: ${config.colors.bg} !important;
            color: ${config.colors.text} !important;
            svg {
              fill: ${config.colors.text} !important;
            }
            &:hover { background-color: ${config.colors.hover} !important; }
         `;
      }
    }
    return "";
  }}
`;
