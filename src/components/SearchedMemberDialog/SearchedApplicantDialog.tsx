import { useSuspenseQuery } from '@tanstack/react-query';
import { Popover } from 'radix-ui';
import { useMemo } from 'react';

import {
  StyledButton,
  StyledContent,
  StyledGroup,
  StyledItem,
  StyledWrapper,
} from '@/components/SearchedMemberDialog/SearchedMemberDialog.style';
import { applicantOptions } from '@/query/applicant/options';

interface SearchedApplicantDialogProps {
  excludeItems?: string[];
  isActive?: boolean;
  onSearchTextChange: (text: string) => void;
  onSelect: (name: string) => void;
  searchText: string; // 외부에서 관리되는 검색어
  trigger: React.ReactNode;
}

export const SearchedApplicantDialog = ({
  onSelect,
  trigger,
  searchText,
  onSearchTextChange,
  excludeItems = [],
  isActive = true,
}: SearchedApplicantDialogProps) => {
  // 1. 지원자 전체 데이터 가져오기
  const { data: allApplicants } = useSuspenseQuery(applicantOptions());

  // 2. 검색 및 필터링 로직
  const filteredApplicants = useMemo(() => {
    // 이미 추가된 지원자 제외
    const available = allApplicants.filter((applicant) => !excludeItems.includes(applicant.name));

    const term = searchText.trim().toLowerCase();
    if (!term) {
      return [];
    } // 항상 외부 모드이므로 입력값이 없으면 결과도 없음

    const matches = available.filter((applicant) => applicant.name.toLowerCase().includes(term));

    // 정렬: 이름 시작점 매칭 -> 중간 매칭 -> 가나다순
    const startsWith = matches.filter((m) => m.name.toLowerCase().startsWith(term));
    const contains = matches.filter((m) => !m.name.toLowerCase().startsWith(term));

    const sortFn = (a: any, b: any) => a.name.localeCompare(b.name);

    return [...startsWith.sort(sortFn), ...contains.sort(sortFn)];
  }, [allApplicants, searchText, excludeItems]);

  // 3. 팝오버 열림 조건: 활성화 상태 && 검색어 존재 && 결과 존재
  const isPopoverOpen = isActive && searchText.length > 0 && filteredApplicants.length > 0;

  const handleSelectApplicant = (name: string) => {
    onSelect(name);
    onSearchTextChange(''); // 선택 후 외부 입력값 초기화
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === 'Enter' && filteredApplicants.length > 0) {
      e.preventDefault();
      handleSelectApplicant(filteredApplicants[0].name);
    }
  };

  return (
    <StyledWrapper>
      <Popover.Root modal={true} open={isPopoverOpen}>
        <Popover.Anchor asChild>
          <div className="left-0 w-full" onKeyDown={handleKeyDown}>
            {trigger}
          </div>
        </Popover.Anchor>
        <Popover.Portal>
          <StyledContent
            align="start"
            onCloseAutoFocus={(e) => e.preventDefault()}
            onMouseDown={(e) => e.stopPropagation()}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <StyledGroup>
              {filteredApplicants.map((applicant) => (
                <StyledItem key={applicant.applicantId}>
                  <StyledButton
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelectApplicant(applicant.name);
                    }}
                    size="medium"
                    variant="textSecondary"
                  >
                    {/* 표시 양식: 이름(메일) [파트명] */}
                    {applicant.name}({applicant.department}) [{applicant.part}]
                  </StyledButton>
                </StyledItem>
              ))}
            </StyledGroup>
          </StyledContent>
        </Popover.Portal>
      </Popover.Root>
    </StyledWrapper>
  );
};
