import { FormProvider, useForm } from 'react-hook-form';
import TableSearchBar from '@/components/TableSearchBar/TableSearchBar.tsx';
import {
  StyledContainer,
  StyledTopContainer,
  StyledLastUpdate,
  StyledLastUpdateTime,
  StyledTopLeftContainer,
} from '@/pages/Applicants/components/ApplicantTab/ApplicantTab.style.ts';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import { Suspense } from 'react';
import { ApplicantState } from '@/query/applicant/schema.ts';
import ApplicantTable from '@/pages/Applicants/components/ApplicantTable/ApplicantTable.tsx';
import { SemesterStateButton } from '@/components/StateButton/SemesterStateButton.tsx';
import { useSearchParams } from '@/hooks/useSearchParams.ts';
import { BoxButton, IcRetryRefreshLine } from '@yourssu/design-system-react';
import { useInvalidateApplicants } from '@/query/applicant/hooks/useInvalidateApplicants.ts';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { semesterOptions } from '@/query/semester/options.ts';
import { postApplicantsFromForms } from '@/query/applicant/mutations/postApplicantsFromForms.ts';

interface ApplicantTabProps {
  state: ApplicantState;
}

const ApplicantTab = ({ state }: ApplicantTabProps) => {
  const methods = useForm({
    defaultValues: {
      search: '',
    },
  });

  const { data: semesters } = useSuspenseQuery(semesterOptions());

  const [searchParams, setSearchParams] = useSearchParams();

  const semesterId = Number(searchParams.get('semesterId') ?? '1');

  const onSemesterChange = (semester: string) => {
    const semesterId = semesters
      .find((s) => s.semester === semester)
      ?.semesterId.toString();

    if (semesterId) setSearchParams({ semesterId });
  };

  const invalidateApplicants = useInvalidateApplicants();
  const postApplicantsFromFormMutation = useMutation({
    mutationFn: postApplicantsFromForms,
    onSuccess: invalidateApplicants,
  });

  const handleClick = () => {
    postApplicantsFromFormMutation.mutate();
  };

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
              onClick={handleClick}
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
              name={methods.watch('search')}
            />
          </Suspense>
        </ScouterErrorBoundary>
      </StyledContainer>
    </FormProvider>
  );
};

export default ApplicantTab;
