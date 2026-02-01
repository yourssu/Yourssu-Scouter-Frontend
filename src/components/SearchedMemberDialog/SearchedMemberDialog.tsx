import { useSuspenseQuery } from '@tanstack/react-query';
import { SearchBar } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { memberOptions } from '@/query/member/options.ts';
import { Member } from '@/query/member/schema';

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
    const matches = allMembers.filter((member) => member.nickname.toLowerCase().includes(term));

    // a: 검색어로 시작하는 사람들
    const startsWith = matches.filter((m) => m.nickname.toLowerCase().startsWith(term));
    // b: 검색어가 중간에 포함된 사람들
    const contains = matches.filter((m) => !m.nickname.toLowerCase().startsWith(term));

    // 각 그룹 내에서 알파벳/가나다 순 정렬
    const sortFn = (a: Member, b: Member) => a.nickname.localeCompare(b.nickname);

    startsWith.sort(sortFn);
    contains.sort(sortFn);

    // a + b 합쳐서 반환
    return [...startsWith, ...contains];
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return; // 한글 입력 중일 때 엔터가 두 번 인식되는 문제 방지
    }
    if (e.key === 'Enter') {
      if (filteredMembers.length > 0) {
        e.preventDefault();
        handleSelectMember(filteredMembers[0].nickname);
      }
    }
  };

  return (
    <StyledWrapper>
      <Popover.Root
        modal={true}
        onOpenChange={isExternalMode ? undefined : setOpen}
        open={isPopoverOpen}
      >
        <Popover.Anchor asChild>
          <div
            className="left-0 w-full"
            onClick={() => !isExternalMode && setOpen(true)}
            onKeyDown={isExternalMode ? handleKeyDown : undefined}
          >
            {trigger}
          </div>
        </Popover.Anchor>
        <Popover.Portal>
          <StyledContent
            align="start"
            onCloseAutoFocus={(e) => e.preventDefault()}
            onMouseDown={(e) => e.stopPropagation()}
            onOpenAutoFocus={(e) => isExternalMode && e.preventDefault()}
          >
            {/* 내부 모드일 때만 서치바 노출 */}
            {!isExternalMode && (
              <SearchBar>
                <SearchBar.Input
                  {...register('searchText')}
                  autoFocus
                  onKeyDown={handleKeyDown}
                  placeholder="사람 변수 검색"
                />
              </SearchBar>
            )}

            <StyledGroup>
              {filteredMembers.map((member) => (
                <StyledItem key={member.memberId}>
                  <StyledButton
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelectMember(member.nickname);
                    }}
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
        </Popover.Portal>
      </Popover.Root>
    </StyledWrapper>
  );
};
