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
import { Suspense, useState } from 'react';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import { BoxButton, IcRetryRefreshLine } from '@yourssu/design-system-react';
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
import { partOptions } from '@/query/part/options.ts';

interface MemberTabProps {
  state: MemberState;
}

const MemberTab = ({ state }: MemberTabProps) => {
  const methods = useForm({
    defaultValues: {
      search: '',
    },
  });

  const invalidateMembers = useInvalidateMembers(state);
  const postMembersFromApplicantsMutation = useMutation({
    mutationFn: postMembersFromApplicants,
    onSuccess: invalidateMembers,
  });

  const { data: parts } = useSuspenseQuery(partOptions());

  const handleClick = () => {
    postMembersFromApplicantsMutation.mutate();
  };

  usePrefetchQuery(memberRoleOptions());

  const [partId, setPartId] = useState(1);

  const onPartChange = (partName: string) => {
    const partId = parts.find((p) => p.partName === partName)?.partId;
    if (partId) setPartId(partId);
  };

  return (
    <FormProvider {...methods}>
      <StyledContainer>
        <StyledTopContainer>
          <StyledTopLeftContainer>
            <TableSearchBar placeholder="이름 혹은 닉네임으로 검색" />
            <div>
              <PartStateButton
                selectedValue={
                  parts.find((p) => p.partId === partId)?.partName || ''
                }
                onStateChange={onPartChange}
              />
            </div>
          </StyledTopLeftContainer>
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
