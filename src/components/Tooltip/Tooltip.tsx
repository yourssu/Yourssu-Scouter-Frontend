import { useState } from "react";
import { TooltipContent, TooltipWrapper } from "./Tooltip.style";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  offset?: number;
}

export const Tooltip = ({
  content,
  children,
  position = "top",
  offset = 10,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipWrapper
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <TooltipContent $position={position} $offset={offset}>
          {content}
        </TooltipContent>
      )}
    </TooltipWrapper>
  );
};
