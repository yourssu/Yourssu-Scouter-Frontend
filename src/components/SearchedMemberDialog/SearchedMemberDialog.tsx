import { useSuspenseQuery } from '@tanstack/react-query';
import { SearchBar } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { memberOptions } from '@/query/member/options.ts';

import {
  StyledButton,
  StyledContent,
  StyledGroup,
  StyledItem,
  StyledWrapper,
} from './SearchedMemberDialog.style';

interface SearchedMemberDialogProps {
  externalSearchText?: string; // 외부 검색 모드
  isActive?: boolean;
  onExternalSearchTextChange?: (text: string) => void; // 외부 검색 모드
  onSelect: (nickname: string) => void;
  trigger: React.ReactNode;
}

export const SearchedMemberDialog = ({
  onSelect,
  trigger,
  externalSearchText,
  onExternalSearchTextChange,
  isActive = true,
}: SearchedMemberDialogProps) => {
  const [open, setOpen] = useState(false);

  const { register, watch, reset } = useForm({
    defaultValues: { searchText: '' },
  });
  const internalSearchText = watch('searchText');

  // 모드 및 현재 검색어 설정
  const isExternalMode = externalSearchText !== undefined;
  const currentSearchText = isExternalMode ? externalSearchText : internalSearchText;

  // 멤버 가져오기
  const { data: allMembers } = useSuspenseQuery(memberOptions('액티브'));

  // 필터링
  const filteredMembers = useMemo(() => {
    const term = currentSearchText.trim().toLowerCase();
    if (!term) {
      return isExternalMode ? [] : allMembers;
    }
    return allMembers.filter((member) => member.nickname.toLowerCase().includes(term));
  }, [allMembers, currentSearchText, isExternalMode]);

  // 팝오버 열림 조건 설정
  // 외부 검색 모드: 입력값이 있고 && 검색 결과가 1개 이상일 때만 자동으로 열림
  // 내부 검색 모드: Popover 자체 open 상태에 따름
  const isPopoverOpen =
    isActive && isExternalMode ? currentSearchText.length > 0 && filteredMembers.length > 0 : open;

  const handleSelectMember = (nickname: string) => {
    onSelect(nickname);
    setOpen(false);
    if (isExternalMode) {
      onExternalSearchTextChange?.(''); // 외부 입력값 초기화
    } else {
      reset({ searchText: '' }); // 내부 입력값 초기화
    }
  };

  return (
    <StyledWrapper>
      <Popover.Root onOpenChange={isExternalMode ? undefined : setOpen} open={isPopoverOpen}>
        <Popover.Anchor asChild>
          <div className="left-0 w-full" onClick={() => !isExternalMode && setOpen(true)}>
            {trigger}
          </div>
        </Popover.Anchor>

        <StyledContent align="start" onOpenAutoFocus={(e) => isExternalMode && e.preventDefault()}>
          {/* 내부 모드일 때만 서치바 노출 */}
          {!isExternalMode && (
            <SearchBar>
              <SearchBar.Input {...register('searchText')} autoFocus placeholder="사람 변수 검색" />
            </SearchBar>
          )}

          <StyledGroup>
            {filteredMembers.map((member) => (
              <StyledItem key={member.memberId}>
                <StyledButton
                  onClick={() => handleSelectMember(member.nickname)}
                  size="medium"
                  variant="textSecondary"
                >
                  {member.nickname} [{member.parts.map((p) => p.part).join('/')}]
                </StyledButton>
              </StyledItem>
            ))}
            {filteredMembers.length === 0 && (
              <div className="p-4 text-center text-gray-400">검색 결과가 없습니다.</div>
            )}
          </StyledGroup>
        </StyledContent>
      </Popover.Root>
    </StyledWrapper>
  );
};
