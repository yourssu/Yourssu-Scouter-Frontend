import { useRef, useState } from 'react';

import { SearchedApplicantDialog } from '@/components/SearchedMemberDialog/SearchedApplicantDialog';
import { InputChipGroup } from '@/pages/SendMail/components/MailInfoSection/InputChipGroup';

interface ApplicantInputFieldProps {
  items: string[];
  label: string;
  onItemsUpdate: (items: string[]) => void;
}

export const ApplicantInputField = ({ items, label, onItemsUpdate }: ApplicantInputFieldProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (name: string) => {
    if (!items.includes(name)) {
      onItemsUpdate([...items, name]);
      setInputValue(''); // 선택 후 입력값 초기화
      setIsActive(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isActive) {
      setIsActive(true);
    }
  };

  return (
    <div className="border-line-basicMedium flex min-h-[56px] w-full flex-row gap-[12px] border-b-1 px-[20px] py-[10px]">
      <div className="typo-b1_sb_16 text-text-basicPrimary flex min-w-[72px] items-center">
        {label}
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-x-[8px] gap-y-[6px]">
        <InputChipGroup deletable={true} items={items} onItemsUpdate={onItemsUpdate} />
        <div className="min-w-[60px] flex-1">
          <SearchedApplicantDialog
            excludeItems={items}
            isActive={isActive}
            onSearchTextChange={setInputValue} // 검색어 변경 핸들러 전달
            onSelect={handleSelect}
            searchText={inputValue} // 외부 검색어 전달
            trigger={
              <input
                className="typo-b1_rg_16 text-text-basicPrimary h-[36px] w-full flex-1 border-0 bg-transparent p-0 outline-none focus:ring-0"
                onChange={handleInputChange}
                onFocus={() => setIsActive(true)}
                ref={inputRef}
                value={inputValue}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};
