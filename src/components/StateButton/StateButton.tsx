import { IcArrowsChevronUpLine } from "@yourssu/design-system-react";
import { ReactNode } from "react";
import { GenericDialog } from "../dialog/GenericDialog";
import { StyledBoxButton } from "./StateButton.style";

export type DialogOption = {
  label: string;
  color?: string;
};

interface StateButtonProps {
  options: DialogOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  variant?: "filledPrimary" | "filledSecondary" | "outlined";
  size?: "small" | "medium";
  icon?: ReactNode;
}

export const StateButton = ({
  options,
  selectedValue,
  onSelect,
  variant = "filledSecondary",
  size = "small",
  icon = <IcArrowsChevronUpLine />,
}: StateButtonProps) => {
  return (
    <GenericDialog options={options} onSelect={onSelect}>
      {(triggerProps) => (
        <StyledBoxButton
          size={size}
          variant={variant}
          rightIcon={icon}
          $selectedValue={selectedValue}
          {...triggerProps}
        >
          {selectedValue}
        </StyledBoxButton>
      )}
    </GenericDialog>
  );
};
