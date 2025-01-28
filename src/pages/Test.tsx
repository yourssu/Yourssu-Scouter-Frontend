import { GenericDialog } from "@/components/dialog/GenericDialog";
import {
  ApplicantStateButton,
  MemberStateButton,
  RoleStateButton,
} from "@/components/StateButton";
import { EDIT_OPTIONS } from "@/constants/IconOptions";
import {
  MEMBER_STATE_OPTIONS,
  PARTS_OPTIONS,
  ROLE_STATE_OPTIONS,
  SEMESTER_OPTIONS,
} from "@/constants/options";
import { BoxButton, Chip, TextField } from "@yourssu/design-system-react";
import { useState } from "react";

export const Test = () => {
  const [selections, setSelections] = useState({
    memberState: "액티브",
    applicantState: "심사 진행 중",
    roleState: "Lead",
    role: "",
    member: "",
    parts: "",
    edit: "",
    semester: "",
  });

  const handleSelect = (type: keyof typeof selections) => (value: string) => {
    setSelections((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div>
      <div>
        <MemberStateButton
          selectedValue={selections.memberState}
          onStateChange={handleSelect("memberState")}
        />
        <ApplicantStateButton
          selectedValue={selections.applicantState}
          onStateChange={handleSelect("applicantState")}
        />
        <RoleStateButton
          selectedValue={selections.roleState}
          onStateChange={handleSelect("roleState")}
        />
      </div>

      <div>
        <GenericDialog
          options={ROLE_STATE_OPTIONS}
          onSelect={handleSelect("role")}
          width={150}
        >
          <BoxButton size="medium" variant="outlined">
            파트 선택
          </BoxButton>
        </GenericDialog>

        <GenericDialog
          options={MEMBER_STATE_OPTIONS}
          onSelect={handleSelect("member")}
        >
          <button>다이얼로그 쓰는 방법</button>
        </GenericDialog>

        <GenericDialog
          options={PARTS_OPTIONS}
          onSelect={handleSelect("parts")}
          position="bottom"
          width={196}
        >
          <BoxButton size="large" variant="filledPrimary">
            핸디 boxbutton 버튼 썼을 때
          </BoxButton>
        </GenericDialog>

        <GenericDialog
          options={EDIT_OPTIONS}
          onSelect={handleSelect("edit")}
          position="top"
          width={128}
        >
          <Chip size="medium" role="suggestion">
            핸디 chip 썼을 때
          </Chip>
        </GenericDialog>

        <GenericDialog
          options={SEMESTER_OPTIONS}
          onSelect={handleSelect("semester")}
          position="bottom"
          width={128}
        >
          <TextField>Gradient Button</TextField>
        </GenericDialog>
      </div>

      {/* 선택된 값들 표시 */}
      <div>
        <h3>Selected Values</h3>
        <ul>
          <li>Member State Button: {selections.memberState}</li>
          <li>Applicant State Button: {selections.applicantState}</li>
          <li>Role State Button: {selections.roleState}</li>
          <li>Role State Dialog: {selections.role || "Not selected"}</li>
          <li>Member State Dialog: {selections.member || "Not selected"}</li>
          <li>Parts Dialog: {selections.parts || "Not selected"}</li>
          <li>Edit Dialog: {selections.edit || "Not selected"}</li>
          <li>Semester Dialog: {selections.semester || "Not selected"}</li>
        </ul>
      </div>
    </div>
  );
};
