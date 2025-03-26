import {
  StyledContainer,
  StyledLastUpdate,
  StyledLastUpdateTime,
  StyledTopContainer,
} from '@/pages/Members/components/MemberTab/MemberTab.style.ts';
import TableSearchBar from '@/components/TableSearchBar/TableSearchBar.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import MemberTable from '@/pages/Members/components/MemberTable/MemberTable.tsx';
import { MemberState } from '@/query/member/schema.ts';
import { Suspense } from 'react';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import { BoxButton, IcRetryRefreshLine } from '@yourssu/design-system-react';
import { usePostMembersFromApplicants } from '@/hooks/query/member/usePostMembersFromApplicants.ts';
import { useInvalidateMembers } from '@/hooks/query/member/useInvalidateMembers.ts';

interface MemberTabProps {
  state: MemberState;
}

const MemberTab = ({ state }: MemberTabProps) => {
  const methods = useForm({
    defaultValues: {
      search: '',
    },
  });

  const postMembersFromApplicantsMutation = usePostMembersFromApplicants();
  const invalidateMembers = useInvalidateMembers(state);

  const postMembersFromApplicants = async () => {
    await postMembersFromApplicantsMutation.mutateAsync();
    await invalidateMembers();
  };

  return (
    <FormProvider {...methods}>
      <StyledContainer>
        <StyledTopContainer>
          <TableSearchBar placeholder="이름 혹은 닉네임으로 검색" />
          <StyledLastUpdate>
            <StyledLastUpdateTime>
              <span>마지막 업데이트</span>
              <span>2024. 07. 21</span>
              <span>23:00</span>
            </StyledLastUpdateTime>
            <BoxButton
              leftIcon={<IcRetryRefreshLine />}
              variant="outlined"
              size="medium"
              onClick={postMembersFromApplicants}
              disabled={postMembersFromApplicantsMutation.isPending}
            >
              업데이트
            </BoxButton>
          </StyledLastUpdate>
        </StyledTopContainer>
        <ScouterErrorBoundary>
          <Suspense>
            <MemberTable state={state} search={methods.watch('search')} />
          </Suspense>
        </ScouterErrorBoundary>
      </StyledContainer>
    </FormProvider>
  );
};

export default MemberTab;
