import { useMutation, usePrefetchQuery, useSuspenseQuery } from '@tanstack/react-query';
import { BoxButton, IcRetryRefreshLine, useSnackbar } from '@yourssu/design-system-react';
import { Suspense } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { authService } from '@/apis/auth.service';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import { PartStateButton } from '@/components/StateButton/PartStateButton.tsx';
import TableSearchBar from '@/components/TableSearchBar/TableSearchBar.tsx';
import { useAlertDialog } from '@/hooks/useAlertDialog';
import { usePartFilter } from '@/hooks/usePartFilter.ts';
import {
  StyledContainer,
  StyledLastUpdate,
  StyledLastUpdateTime,
  StyledTopContainer,
  StyledTopLeftContainer,
} from '@/pages/Members/components/MemberTab/MemberTab.style.ts';
import MemberTable from '@/pages/Members/components/MemberTable/MemberTable.tsx';
import MemberTableFallback from '@/pages/Members/components/MemberTableFallback/MemberTableFallback.tsx';
import { useInvalidateMembers } from '@/query/member/hooks/useInvalidateMembers.ts';
import { memberLastUpdatedTimeOptions } from '@/query/member/lastUpdatedTime/options.ts';
import { memberRoleOptions } from '@/query/member/memberRole/options.ts';
import { postMembersFromApplicants } from '@/query/member/mutations/postMembersFromApplicants.ts';
import { MemberState } from '@/query/member/schema.ts';
import { ReconsentError } from '@/utils/error.ts';

interface MemberTabProps {
  state: MemberState;
}

const MemberTab = ({ state }: MemberTabProps) => {
  const methods = useForm({
    defaultValues: {
      search: '',
    },
  });

  const { snackbar } = useSnackbar();
  const openAlertDialog = useAlertDialog();

  const invalidateMembers = useInvalidateMembers(state);
  const postMembersFromApplicantsMutation = useMutation({
    mutationFn: postMembersFromApplicants,
    onSuccess: invalidateMembers,
    onError: async (error) => {
      // 403 에러 시 재동의 유도
      if (error instanceof ReconsentError) {
        const confirmed = await openAlertDialog({
          title: '권한 재동의가 필요합니다',
          content: '구글 계정의 권한 동의가 필요합니다. 확인을 누르면 로그인 페이지로 이동합니다.',
          primaryButtonText: '확인',
        });

        if (confirmed) {
          authService.initiateGoogleLogin();
        }
        return;
      }
      // 기타 에러
      snackbar({
        type: 'error',
        width: '400px',
        message: '에러가 발생했습니다.',
        duration: 3000,
        position: 'center',
      });
    },
  });

  const handleClick = () => {
    postMembersFromApplicantsMutation.mutate();
  };

  const { partId, partName, onPartChange } = usePartFilter();

  const { data: lastUpdatedTime } = useSuspenseQuery(memberLastUpdatedTimeOptions());

  usePrefetchQuery(memberRoleOptions());

  return (
    <StyledContainer>
      <StyledTopContainer>
        <StyledTopLeftContainer>
          <FormProvider {...methods}>
            <TableSearchBar placeholder="이름 혹은 닉네임으로 검색" />
          </FormProvider>
          <div>
            <PartStateButton onStateChange={onPartChange} selectedValue={partName ?? '파트 선택'} />
          </div>
          {partId !== null && (
            <div>
              <BoxButton
                onClick={() => {
                  onPartChange(null);
                }}
                size="medium"
                variant="filledSecondary"
              >
                필터 초기화
              </BoxButton>
            </div>
          )}
        </StyledTopLeftContainer>
        <StyledLastUpdate>
          {lastUpdatedTime && (
            <StyledLastUpdateTime>
              <span>마지막 업데이트</span>
              <span>{lastUpdatedTime}</span>
            </StyledLastUpdateTime>
          )}
          <BoxButton
            disabled={postMembersFromApplicantsMutation.isPending}
            leftIcon={<IcRetryRefreshLine />}
            onClick={handleClick}
            size="medium"
            variant="outlined"
          >
            업데이트
          </BoxButton>
        </StyledLastUpdate>
      </StyledTopContainer>
      <ScouterErrorBoundary>
        <Suspense fallback={<MemberTableFallback state={state} />}>
          <MemberTable partId={partId} search={methods.watch('search')} state={state} />
        </Suspense>
      </ScouterErrorBoundary>
    </StyledContainer>
  );
};

export default MemberTab;
