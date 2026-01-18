import { useRef } from 'react';

interface TextInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onUpdate: (value: string) => void;
  value: string;
}

export const TextInputField = ({ label, value, onUpdate, ...props }: TextInputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(e.target.value);
  };

  return (
    <div className="border-line-basicMedium flex min-h-[56px] w-full flex-row gap-[12px] border-b-1 px-[20px] py-[10px]">
      <div className="typo-b1_sb_16 text-text-basicPrimary flex min-w-[72px] items-center">
        {label}
      </div>
      <input
        {...props}
        className="typo-b1_rg_16 text-text-basicPrimary h-[36px] w-full border-0 bg-transparent p-0 outline-none focus:ring-0"
        onChange={handleInputChange}
        ref={inputRef}
        value={value}
      />
    </div>
  );
};
