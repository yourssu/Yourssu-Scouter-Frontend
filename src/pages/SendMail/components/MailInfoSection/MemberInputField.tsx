import { useRef, useState } from 'react';

import { SearchedMemberDialog } from '@/components/SearchedMemberDialog/SearchedMemberDialog';
import { InputChipGroup } from '@/pages/SendMail/components/MailInfoSection/InputChipGroup';

interface MemberInputFieldProps {
  items: string[];
  label: string;
  onItemsUpdate: (items: string[]) => void;
}

export const MemberInputField = ({ items, label, onItemsUpdate }: MemberInputFieldProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const readOnly = label === '보내는 사람' && items.length >= 1; // 파트 선택 전에는 보내는 사람 수정 가능 > 파트 선택 이후엔 고정

  const handleSelect = (nickname: string) => {
    if (!items.includes(nickname)) {
      onItemsUpdate([...items, nickname]);
      setInputValue('');
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
        <InputChipGroup deletable={!readOnly} items={items} onItemsUpdate={onItemsUpdate} />
        {!readOnly && (
          <div className="min-w-[60px] flex-1">
            <SearchedMemberDialog
              excludeItems={items}
              externalSearchText={inputValue}
              isActive={isActive}
              onExternalSearchTextChange={(text) => setInputValue(text)}
              onSelect={handleSelect}
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
        )}
      </div>
    </div>
  );
};
