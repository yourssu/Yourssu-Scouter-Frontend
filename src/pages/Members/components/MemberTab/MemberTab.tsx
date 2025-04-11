import {
  StyledContainer,
  StyledLastUpdate,
  StyledLastUpdateTime,
  StyledTopContainer,
  StyledTopLeftContainer,
} from '@/pages/Members/components/MemberTab/MemberTab.style.ts';
import TableSearchBar from '@/components/TableSearchBar/TableSearchBar.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import MemberTable from '@/pages/Members/components/MemberTable/MemberTable.tsx';
import { MemberState } from '@/query/member/schema.ts';
import { Suspense } from 'react';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import {
  BoxButton,
  IcRetryRefreshLine,
  useSnackbar,
} from '@yourssu/design-system-react';
import { useInvalidateMembers } from '@/query/member/hooks/useInvalidateMembers.ts';
import {
  useMutation,
  usePrefetchQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { postMembersFromApplicants } from '@/query/member/mutations/postMembersFromApplicants.ts';
import MemberTableFallback from '@/pages/Members/components/MemberTableFallback/MemberTableFallback.tsx';
import { memberRoleOptions } from '@/query/member/memberRole/options.ts';
import { PartStateButton } from '@/components/StateButton/PartStateButton.tsx';
import { usePartFilter } from '@/hooks/usePartFilter.ts';
import { memberLastUpdatedTimeOptions } from '@/query/member/lastUpdatedTime/options.ts';

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

  const invalidateMembers = useInvalidateMembers(state);
  const postMembersFromApplicantsMutation = useMutation({
    mutationFn: postMembersFromApplicants,
    onSuccess: invalidateMembers,
    onError: () => {
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

  const { data: lastUpdatedTime } = useSuspenseQuery(
    memberLastUpdatedTimeOptions(),
  );

  usePrefetchQuery(memberRoleOptions());

  return (
    <FormProvider {...methods}>
      <StyledContainer>
        <StyledTopContainer>
          <StyledTopLeftContainer>
            <TableSearchBar placeholder="이름 혹은 닉네임으로 검색" />
            <div>
              <PartStateButton
                selectedValue={partName}
                onStateChange={onPartChange}
              />
            </div>
          </StyledTopLeftContainer>
          <StyledLastUpdate>
            {lastUpdatedTime && (
              <StyledLastUpdateTime>
                <span>마지막 업데이트</span>
                <span>{lastUpdatedTime}</span>
              </StyledLastUpdateTime>
            )}
            <BoxButton
              leftIcon={<IcRetryRefreshLine />}
              variant="outlined"
              size="medium"
              onClick={handleClick}
              disabled={postMembersFromApplicantsMutation.isPending}
            >
              업데이트
            </BoxButton>
          </StyledLastUpdate>
        </StyledTopContainer>
        <ScouterErrorBoundary>
          <Suspense fallback={<MemberTableFallback state={state} />}>
            <MemberTable
              partId={partId}
              state={state}
              search={methods.watch('search')}
            />
          </Suspense>
        </ScouterErrorBoundary>
      </StyledContainer>
    </FormProvider>
  );
};

export default MemberTab;
