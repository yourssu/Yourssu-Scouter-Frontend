import { APPLICANT_STATE_OPTIONS } from "@/constants/options";
import { StateButton } from "./StateButton";

export const ApplicantStateButton = ({
  selectedValue,
  onStateChange,
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
}) => {
  return (
    <StateButton
      options={APPLICANT_STATE_OPTIONS}
      selectedValue={selectedValue}
      onSelect={onStateChange}
      variant="filledSecondary"
    />
  );
};
