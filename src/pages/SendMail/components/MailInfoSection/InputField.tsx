import { useState } from 'react';

import { InputChipGroup } from '@/pages/SendMail/MailInfoSection/InputChipGroup';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputField = ({ label }: InputFieldProps) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="border-line-basicMedium flex h-[56px] flex-row gap-[12px] border-b-1 px-[20px] py-[16px]">
      <div className="typo-b1_sb_16 h-[24px] min-w-[72px]">{label}</div>
      <div className="flex w-full items-center gap-[8px]">
        <InputChipGroup items={[]} />
        <input
          className="typo-b1_rg_16 text-text-basicPrimary flex-1 border-0 bg-transparent outline-none focus:ring-0"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
    </div>
  );
};
