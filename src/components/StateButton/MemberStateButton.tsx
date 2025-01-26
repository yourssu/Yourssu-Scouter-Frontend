import { MEMBER_STATE_OPTIONS } from "@/constants/options";
import { StateButton } from "./StateButton";

export const MemberStateButton = ({
  selectedValue,
  onStateChange,
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
}) => {
  return (
    <StateButton
      options={MEMBER_STATE_OPTIONS}
      selectedValue={selectedValue}
      onSelect={onStateChange}
      variant="filledSecondary"
    />
  );
};
