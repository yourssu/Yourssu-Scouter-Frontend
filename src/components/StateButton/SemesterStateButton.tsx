import { useGetSemesters } from "@/hooks/useGetSemesters.ts";
import { IcArrowsChevronDownLine } from "@yourssu/design-system-react";
import { StateButton } from "./StateButton";

export const SemesterStateButton = ({
  selectedValue,
  onStateChange,
  size = "small",
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
  size?: "small" | "medium";
}) => {
  const { data: semesters } = useGetSemesters();
  const options = semesters.map((semester) => ({ label: semester.semester }));

  return (
    <StateButton
      options={options}
      selectedValue={selectedValue}
      onSelect={onStateChange}
      variant="outlined"
      size={size}
      icon={<IcArrowsChevronDownLine />}
    />
  );
};
