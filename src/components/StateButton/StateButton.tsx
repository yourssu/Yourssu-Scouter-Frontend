import { IcArrowsChevronUpLine } from "@yourssu/design-system-react";
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
}

export const StateButton = ({
  options,
  selectedValue,
  onSelect,
  variant = "filledSecondary",
}: StateButtonProps) => {
  return (
    <GenericDialog options={options} onSelect={onSelect}>
      <StyledBoxButton
        size="small"
        variant={variant}
        rightIcon={<IcArrowsChevronUpLine />}
        $selectedValue={selectedValue}
      >
        {selectedValue}
      </StyledBoxButton>
    </GenericDialog>
  );
};
