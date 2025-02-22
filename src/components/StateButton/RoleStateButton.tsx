import { StateButton } from "./StateButton";
import {useGetMemberRoles} from "@/hooks/useGetMemberRoles.ts";

export const RoleStateButton = ({
  selectedValue,
  onStateChange,
}: {
  selectedValue: string;
  onStateChange: (value: string) => void;
}) => {
  const {data: roles} = useGetMemberRoles();
  const options = roles.map(role => ({ label: role }));

  return (
    <StateButton
      options={options}
      selectedValue={selectedValue}
      onSelect={onStateChange}
      variant="outlined"
    />
  );
};
