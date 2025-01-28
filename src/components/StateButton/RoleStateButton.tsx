import { ROLE_STATE_OPTIONS } from "@/constants/options";
import { StateButton } from "./StateButton";

export const RoleStateButton = ({
  selectedValue,
  onStateChange,
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
}) => {
  return (
    <StateButton
      options={ROLE_STATE_OPTIONS}
      selectedValue={selectedValue}
      onSelect={onStateChange}
      variant="outlined"
    />
  );
};
