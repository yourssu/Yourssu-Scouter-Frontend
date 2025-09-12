import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { BoxButton, IcRetryRefreshLine, useSnackbar } from '@yourssu/design-system-react';
import { Suspense, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import { PartStateButton } from '@/components/StateButton/PartStateButton.tsx';
import { SemesterStateButton } from '@/components/StateButton/SemesterStateButton.tsx';
import TableSearchBar from '@/components/TableSearchBar/TableSearchBar.tsx';
import { usePartFilter } from '@/hooks/usePartFilter.ts';
import { useSearchParams } from '@/hooks/useSearchParams.ts';
import {
  StyledContainer,
  StyledLastUpdate,
  StyledLastUpdateTime,
  StyledTopContainer,
  StyledTopLeftContainer,
} from '@/pages/Applicants/components/ApplicantTab/ApplicantTab.style.ts';
import ApplicantTable from '@/pages/Applicants/components/ApplicantTable/ApplicantTable.tsx';
import ApplicantTableFallback from '@/pages/Applicants/components/ApplicantTableFallback/ApplicantTableFallback.tsx';
import { useInvalidateApplicants } from '@/query/applicant/hooks/useInvalidateApplicants.ts';
import { applicantLastUpdatedTimeOptions } from '@/query/applicant/lastUpdatedTime.ts';
import { postApplicantsFromForms } from '@/query/applicant/mutations/postApplicantsFromForms.ts';
import { ApplicantState } from '@/query/applicant/schema.ts';
import { semesterNowOptions } from '@/query/semester/now/options.ts';
import { semesterOptions } from '@/query/semester/options.ts';

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
    setSemesterId(Number(searchParams.get('semesterId') ?? semesterNow.semesterId));
  }, [searchParams, semesterNow]);

  const onSemesterChange = (semester: string) => {
    const semesterId = semesters.find((s) => s.semester === semester)?.semesterId.toString();

    if (semesterId) {
      setSearchParams({ semesterId });
    }
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

  const { data: lastUpdatedTime } = useSuspenseQuery(applicantLastUpdatedTimeOptions());

  return (
    <FormProvider {...methods}>
      <StyledContainer>
        <StyledTopContainer>
          <StyledTopLeftContainer>
            <TableSearchBar placeholder="이름으로 검색" />
            <div>
              <SemesterStateButton
                onStateChange={onSemesterChange}
                selectedValue={semesters.find((s) => semesterId === s.semesterId)?.semester ?? ''}
                size="medium"
              />
            </div>
            <div>
              <PartStateButton onStateChange={onPartChange} selectedValue={partName} />
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
              disabled={postApplicantsFromFormMutation.isPending}
              leftIcon={<IcRetryRefreshLine />}
              onClick={handleClick}
              size="medium"
              variant="outlined"
            >
              지원자 정보 불러오기
            </BoxButton>
          </StyledLastUpdate>
        </StyledTopContainer>
        <ScouterErrorBoundary>
          <Suspense fallback={<ApplicantTableFallback />}>
            <ApplicantTable
              name={methods.watch('search')}
              partId={partId}
              semesterId={semesterId}
              state={state}
            />
          </Suspense>
        </ScouterErrorBoundary>
      </StyledContainer>
    </FormProvider>
  );
};

export default ApplicantTab;
