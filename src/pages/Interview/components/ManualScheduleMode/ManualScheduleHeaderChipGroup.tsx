import { IcCheckLine } from '@yourssu/design-system-react';
import { tv } from 'tailwind-variants';

import { Applicant } from '@/query/applicant/schema';

interface ManualScheduleHeaderChipGroupProps {
  applicants: Applicant[];
  completedApplicants: Applicant[];
  onSelectedApplicantChange: (v: Applicant) => void;
  selectedApplicant: Applicant;
}

const chip = tv({
  base: 'typo-b2_rg_15 flex cursor-pointer items-center gap-0.5 rounded-full px-3 py-1.5',
  variants: {
    active: {
      true: 'bg-chipSelected text-text-brandPrimary font-semibold',
      false: 'bg-chipUnselected text-text-basicSecondary',
    },
  },
});

export const ManualScheduleHeaderChipGroup = ({
  applicants,
  selectedApplicant,
  completedApplicants,
  onSelectedApplicantChange,
}: ManualScheduleHeaderChipGroupProps) => {
  return (
    <div className="flex items-center gap-6">
      <div className="typo-b1_sb_16 text-text-basicSecondary">지원자</div>
      <div className="flex flex-wrap items-center gap-2">
        {applicants.map((applicant) => (
          <button
            className={chip({ active: applicant.applicantId === selectedApplicant.applicantId })}
            key={applicant.name}
            onClick={() => onSelectedApplicantChange(applicant)}
          >
            {completedApplicants.find((v) => v.applicantId === applicant.applicantId) && (
              <IcCheckLine size="20px" />
            )}
            {applicant.name}
          </button>
        ))}
      </div>
    </div>
  );
};
