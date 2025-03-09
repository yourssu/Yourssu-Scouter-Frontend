import { FormProvider, useForm } from 'react-hook-form';
import TableSearchBar from '@/components/TableSearchBar/TableSearchBar.tsx';
import {
  StyledContainer,
  StyledTopContainer,
  StyledLastUpdate,
  StyledLastUpdateTime,
  StyledTopLeftContainer,
} from '@/pages/Applicants/ApplicantTab/ApplicantTab.style.ts';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import { Suspense } from 'react';
import { ApplicantState } from '@/scheme/applicant.ts';
import ApplicantTable from '@/pages/Applicants/ApplicantTable/ApplicantTable.tsx';
import { SemesterStateButton } from '@/components/StateButton/SemesterStateButton.tsx';
import { useSearchParams } from 'react-router';
import { useGetSemesters } from '@/hooks/useGetSemesters.ts';
import { useQueryClient } from '@tanstack/react-query';
import { BoxButton, IcRetryRefreshLine } from '@yourssu/design-system-react';
import { usePostApplicantsFromForms } from '@/hooks/usePostApplicantsFromForms.ts';

interface ApplicantTabProps {
  state: ApplicantState;
}

const ApplicantTab = ({ state }: ApplicantTabProps) => {
  const methods = useForm({
    defaultValues: {
      search: '',
    },
  });

  const { data: semesters } = useGetSemesters();

  const [searchParams, setSearchParams] = useSearchParams({ semesterId: '1' });

  const semesterId = Number(searchParams.get('semesterId') ?? '1');

  const queryClient = useQueryClient();

  const onSemesterChange = async (semester: string) => {
    const semesterId =
      semesters.find((s) => s.semester === semester)?.semesterId.toString() ??
      '0';

    setSearchParams({ semesterId });
    await queryClient.invalidateQueries({ queryKey: ['applicants'] });
  };

  const postApplicantsFromFormMutation = usePostApplicantsFromForms();

  return (
    <FormProvider {...methods}>
      <StyledContainer>
        <StyledTopContainer>
          <StyledTopLeftContainer>
            <TableSearchBar placeholder="이름으로 검색" />
            <div>
              <SemesterStateButton
                size="medium"
                selectedValue={
                  semesters.find((s) => semesterId === s.semesterId)
                    ?.semester ?? '24-1학기'
                }
                onStateChange={onSemesterChange}
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
              onClick={() => postApplicantsFromFormMutation.mutate()}
            >
              지원자 정보 불러오기
            </BoxButton>
          </StyledLastUpdate>
        </StyledTopContainer>
        <ScouterErrorBoundary>
          <Suspense>
            <ApplicantTable
              state={state}
              semesterId={semesterId}
              search={methods.watch('search')}
            />
          </Suspense>
        </ScouterErrorBoundary>
      </StyledContainer>
    </FormProvider>
  );
};

export default ApplicantTab;
