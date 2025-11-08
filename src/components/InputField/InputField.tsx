interface InputFieldProps {
  textLabel: string;
}

export const InputField = ({ textLabel }: InputFieldProps) => {
  return (
    <div className="border-line-basicMedium flex h-[56px] w-[1136px] flex-row gap-[12px] border-b-1 px-[20px] py-[16px]">
      <div className="typo-b1_sb_16 h-[24px] w-[72px]">{textLabel}</div>
      <input className="typo-b1_rg_16 flex-1 border-0" />
    </div>
  );
};
