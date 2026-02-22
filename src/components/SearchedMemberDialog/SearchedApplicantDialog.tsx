import { useSuspenseQuery } from '@tanstack/react-query';
import { orderBy } from 'es-toolkit';
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
import { Part } from '@/query/part/schema';
import { getChosung } from '@/utils/hangul';

interface SearchedApplicantDialogProps {
  excludeItems?: string[];
  isActive?: boolean;
  onSearchTextChange: (text: string) => void;
  onSelect: (name: string) => void;
  searchText: string; // 외부에서 관리되는 검색어
  selectedPart?: Part;
  trigger: React.ReactNode;
}

export const SearchedApplicantDialog = ({
  onSelect,
  trigger,
  searchText,
  onSearchTextChange,
  excludeItems = [],
  isActive = true,
  selectedPart,
}: SearchedApplicantDialogProps) => {
  // 1. 지원자 전체 데이터 가져오기
  const { data: allApplicants } = useSuspenseQuery(applicantOptions());

  // 2. 검색 및 필터링 로직
  const filteredApplicants = useMemo(() => {
    // 1. 기본 필터링 (중복 제외 & 파트 필터링)
    const baseList = allApplicants.filter((a) => {
      const isExcluded = excludeItems.includes(a.name);
      const isCorrectPart = !selectedPart || a.part === selectedPart.partName;
      return !isExcluded && isCorrectPart;
    });

    const term = searchText.trim().toLowerCase();
    const termCho = getChosung(term);

    // 2. 가중치 부여 및 정렬(검색어 일치 > 포함 > 초성 포함 > 가나다순)
    return orderBy(
      baseList,
      [
        (a) => {
          if (!term) {
            return 0;
          } // 검색어 없으면 모두 동일 점수
          const name = a.name.toLowerCase();
          const nameCho = getChosung(name);

          if (name.startsWith(term)) {
            return -3;
          } // 검색어로 시작하면 1순위
          if (name.includes(term)) {
            return -2;
          } // 검색어 포함하면 2순위
          if (nameCho.includes(termCho)) {
            return -1;
          } // 초성 포함하면 3순위
          return 0; // 관련 없으면 꼴찌
        },
        (a) => a.name, // 점수가 같다면 이름 가나다순 정렬
      ],
      ['asc', 'asc'], // 점수는 낮은 순(음수 사용), 이름은 오름차순
    );
  }, [allApplicants, searchText, excludeItems, selectedPart]);

  // 3. 팝오버 열림 조건: 활성화 상태 && 필터링된 지원자 존재 && 검색어가 비어있지 않음
  const isPopoverOpen = isActive && filteredApplicants.length > 0 && searchText.trim() !== '';

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
