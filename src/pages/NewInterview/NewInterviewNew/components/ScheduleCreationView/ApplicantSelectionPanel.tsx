import { useMemo } from 'react';
import { MdCheck } from 'react-icons/md';

import { Fieldset } from '@/pages/NewInterview/_ui/Fieldset';
import { Select } from '@/pages/NewInterview/_ui/Select';
import { TabButton } from '@/pages/NewInterview/_ui/TabButton';
import { SemesterSelect } from '@/pages/NewInterview/components/SemesterSelect';
import { useScheduleCreationContext } from '@/pages/NewInterview/NewInterviewNew/context';
import { useScheduledApplicantIds } from '@/pages/NewInterview/NewInterviewNew/hooks/useScheduleApplicants';
import { partNameKo } from '@/pages/NewInterview/type';
import { Applicant } from '@/query/applicant/schema';
import { Part } from '@/query/part/schema';
import { Semester } from '@/query/semester/schema';

interface ApplicantSelectionPanelProps {
  allApplicants: Applicant[];
  applicants: Applicant[];
  isPrefillingSchedules: boolean;
  onApplicantSelect?: (applicant: Applicant) => void;
  parts: Part[];
}

export const ApplicantSelectionPanel = ({
  allApplicants,
  applicants,
  isPrefillingSchedules,
  onApplicantSelect,
  parts,
}: ApplicantSelectionPanelProps) => {
  const {
    selectedPartId,
    selectedSemester,
    activeApplicantId,
    selectPart,
    selectSemester,
    setActiveApplicant,
  } = useScheduleCreationContext();

  // O(1) 일정 존재 확인을 위한 Set
  const scheduledIds = useScheduledApplicantIds();

  // 지원자가 있는 파트만 필터링
  const partsWithApplicants = useMemo(() => {
    const partNamesWithApplicants = new Set(allApplicants.map((a) => a.part));
    return parts.filter((p) => partNamesWithApplicants.has(p.partName));
  }, [allApplicants, parts]);

  const selectedPart = parts.find((p) => p.partId === selectedPartId);

  const handlePartChange = (partNameKoValue: string) => {
    const partName = Object.entries(partNameKo).find(([, ko]) => ko === partNameKoValue)?.[0];
    const part = parts.find((p) => p.partName === partName);
    if (part) {
      selectPart(part.partId);

      // 해당 파트의 첫 번째 지원자를 자동 선택
      const partApplicants = allApplicants.filter((a) => a.part === part.partName);
      if (partApplicants.length > 0) {
        setActiveApplicant(partApplicants[0].applicantId);
        onApplicantSelect?.(partApplicants[0]);
      }
    }
  };

  const handleSemesterChange = (semester: Semester) => {
    selectSemester(semester.semesterId, semester.semester);
  };

  return (
    <div className="flex min-h-0 flex-col gap-4 pt-5">
      <SemesterSelect
        className="w-full"
        label="학기 선택"
        onValueChange={handleSemesterChange}
        size="lg"
        value={selectedSemester ?? undefined}
        variant="dimmed"
      />
      <Select
        className="w-full"
        description="지원자가 없는 파트는 표시되지 않아요."
        items={partsWithApplicants.map((p) => partNameKo[p.partName as keyof typeof partNameKo])}
        label="파트 선택"
        onValueChange={handlePartChange}
        placeholder="파트"
        size="lg"
        value={
          selectedPart ? partNameKo[selectedPart.partName as keyof typeof partNameKo] : undefined
        }
        variant="dimmed"
      />

      {selectedPartId && (
        <Fieldset className="flex min-h-0 flex-1 flex-col" label="지원자 선택">
          {isPrefillingSchedules ? (
            <div className="flex flex-1 items-center justify-center py-2 text-[15px] font-medium text-[#4e5968]">
              지원자를 불러오고 있어요...
            </div>
          ) : (
            <div className="flex max-h-[460px] min-h-0 flex-col gap-1.5 overflow-y-auto">
              {applicants.map((applicant) => {
                const isActive = activeApplicantId === applicant.applicantId;
                const scheduled = scheduledIds.has(applicant.applicantId);
                return (
                  <TabButton
                    active={isActive}
                    className="shrink-0"
                    key={applicant.applicantId}
                    onClick={() => {
                      setActiveApplicant(applicant.applicantId);
                      onApplicantSelect?.(applicant);
                    }}
                    right={scheduled && <MdCheck className="text-[#4a3fe0]" />}
                    size="lg"
                  >
                    {applicant.name}
                  </TabButton>
                );
              })}
            </div>
          )}
        </Fieldset>
      )}
    </div>
  );
};
