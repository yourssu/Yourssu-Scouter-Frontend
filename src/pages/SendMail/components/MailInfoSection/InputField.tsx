import { useState } from 'react';

import { SearchedMemberDialog } from '@/components/SearchedMemberDialog/SearchedMemberDialog';
import { InputChipGroup } from '@/pages/SendMail/components/MailInfoSection/InputChipGroup';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isActive: boolean;
  label: string;
  onActivate: () => void;
  onDeactivate: () => void;
}

export const InputField = ({ label, isActive, onActivate, onDeactivate }: InputFieldProps) => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<string[]>([]); // 선택된 멤버 닉네임 배열

  const handleSelect = (nickname: string) => {
    if (!items.includes(nickname)) {
      setItems((prevItems) => [...prevItems, nickname]);
      setInputValue(''); // 선택 후 입력창 초기화
      onDeactivate();
    }
  };

  const handleChipDelete = (nickname: string) => {
    setItems((prevItems) => prevItems.filter((item) => item !== nickname));
  };

  return (
    <div className="border-line-basicMedium flex min-h-[56px] w-full flex-row gap-[12px] border-b-1 px-[20px] py-[10px]">
      <div className="typo-b1_sb_16 text-text-basicPrimary flex min-w-[72px] items-center">
        {label}
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-x-[8px] gap-y-[6px]">
        <InputChipGroup items={items} onDelete={handleChipDelete} />
        <div className="min-w-[60px] flex-1">
          <SearchedMemberDialog
            externalSearchText={inputValue}
            isActive={isActive}
            onExternalSearchTextChange={(text) => setInputValue(text)}
            onSelect={handleSelect}
            trigger={
              <input
                className="typo-b1_rg_16 text-text-basicPrimary h-[36px] w-full flex-1 border-0 bg-transparent p-0 outline-none focus:ring-0"
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={onActivate}
                value={inputValue}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};
