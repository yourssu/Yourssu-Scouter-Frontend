import { useRef, useState } from 'react';

import { SearchedMemberDialog } from '@/components/SearchedMemberDialog/SearchedMemberDialog';
import { InputChipGroup } from '@/pages/SendMail/components/MailInfoSection/InputChipGroup';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isActive: boolean;
  isReadOnly: boolean;
  isTitleField: boolean;
  items: string[];
  label: string;
  onActivate: () => void;
  onDeactivate: () => void;
  onUpdate: (items: string[]) => void;
}

export const InputField = ({
  label,
  isActive,
  onActivate,
  onDeactivate,
  items,
  onUpdate,
  isTitleField,
  isReadOnly,
}: InputFieldProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isTitleField) {
      onUpdate([value]);
    } else {
      setInputValue(value);
      if (value.length > 0 && !isActive) {
        onActivate();
      }
    }
  };

  const handleSelect = (nickname: string) => {
    if (!items.includes(nickname)) {
      onUpdate([...items, nickname]);
      setInputValue(''); // 선택 후 입력창 초기화
      onDeactivate();
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  };

  const handleChipDelete = (nickname: string) => {
    onUpdate(items.filter((item) => item !== nickname));
  };

  if (isTitleField) {
    return (
      <div className="border-line-basicMedium flex min-h-[56px] w-full flex-row gap-[12px] border-b-1 px-[20px] py-[10px]">
        <div className="typo-b1_sb_16 text-text-basicPrimary flex min-w-[72px] items-center">
          {label}
        </div>
        <input
          className="typo-b1_rg_16 text-text-basicPrimary h-[36px] w-full border-0 bg-transparent p-0 outline-none focus:ring-0"
          onChange={handleInputChange}
          ref={inputRef}
          value={items[0] || ''}
        />
      </div>
    );
  }
  return (
    <div className="border-line-basicMedium flex min-h-[56px] w-full flex-row gap-[12px] border-b-1 px-[20px] py-[10px]">
      <div className="typo-b1_sb_16 text-text-basicPrimary flex min-w-[72px] items-center">
        {label}
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-x-[8px] gap-y-[6px]">
        <InputChipGroup deletable={!isReadOnly} items={items} onDelete={handleChipDelete} />
        {!isReadOnly && (
          <div className="min-w-[60px] flex-1">
            <SearchedMemberDialog
              externalSearchText={inputValue}
              isActive={isActive}
              onExternalSearchTextChange={(text) => setInputValue(text)}
              onSelect={handleSelect}
              trigger={
                <input
                  className="typo-b1_rg_16 text-text-basicPrimary h-[36px] w-full flex-1 border-0 bg-transparent p-0 outline-none focus:ring-0"
                  onChange={handleInputChange}
                  onFocus={onActivate}
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
