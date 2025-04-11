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
import { Suspense, useEffect, useState } from 'react';
import { ApplicantState } from '@/query/applicant/schema.ts';
import ApplicantTable from '@/pages/Applicants/components/ApplicantTable/ApplicantTable.tsx';
import { SemesterStateButton } from '@/components/StateButton/SemesterStateButton.tsx';
import { useSearchParams } from '@/hooks/useSearchParams.ts';
import {
  BoxButton,
  IcRetryRefreshLine,
  useSnackbar,
} from '@yourssu/design-system-react';
import { useInvalidateApplicants } from '@/query/applicant/hooks/useInvalidateApplicants.ts';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { semesterOptions } from '@/query/semester/options.ts';
import { postApplicantsFromForms } from '@/query/applicant/mutations/postApplicantsFromForms.ts';
import ApplicantTableFallback from '@/pages/Applicants/components/ApplicantTableFallback/ApplicantTableFallback.tsx';
import { semesterNowOptions } from '@/query/semester/now/options.ts';
import { PartStateButton } from '@/components/StateButton/PartStateButton.tsx';
import { usePartFilter } from '@/hooks/usePartFilter.ts';
import { applicantLastUpdatedTimeOptions } from '@/query/applicant/lastUpdatedTime.ts';

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

  const { data: semesterNow } = useSuspenseQuery(semesterNowOptions());

  const [searchParams, setSearchParams] = useSearchParams();

  const [semesterId, setSemesterId] = useState(
    Number(searchParams.get('semesterId') ?? semesterNow.semesterId),
  );

  useEffect(() => {
    setSemesterId(
      Number(searchParams.get('semesterId') ?? semesterNow.semesterId),
    );
  }, [searchParams, semesterNow]);

  const onSemesterChange = (semester: string) => {
    const semesterId = semesters
      .find((s) => s.semester === semester)
      ?.semesterId.toString();

    if (semesterId) setSearchParams({ semesterId });
  };

  const { snackbar } = useSnackbar();

  const invalidateApplicants = useInvalidateApplicants();
  const postApplicantsFromFormMutation = useMutation({
    mutationFn: postApplicantsFromForms,
    onSuccess: invalidateApplicants,
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
    postApplicantsFromFormMutation.mutate();
  };

  const { partId, partName, onPartChange } = usePartFilter();

  const { data: lastUpdatedTime } = useSuspenseQuery(
    applicantLastUpdatedTimeOptions(),
  );

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
                    ?.semester ?? ''
                }
                onStateChange={onSemesterChange}
              />
            </div>
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
              disabled={postApplicantsFromFormMutation.isPending}
            >
              지원자 정보 불러오기
            </BoxButton>
          </StyledLastUpdate>
        </StyledTopContainer>
        <ScouterErrorBoundary>
          <Suspense fallback={<ApplicantTableFallback />}>
            <ApplicantTable
              partId={partId}
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
