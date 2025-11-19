import { Applicant } from '@/query/applicant/schema';

interface AvailableTimesHeaderChipGroupProps {
  availableApplicants: Applicant[];
}

export const AvailableTimesHeaderChipGroup = ({
  availableApplicants,
}: AvailableTimesHeaderChipGroupProps) => {
  return (
    <div className="flex items-center gap-6">
      <div className="typo-b1_sb_16 text-text-basicSecondary">지원자</div>
      <div className="flex flex-wrap items-center gap-2">
        {availableApplicants.map(({ name }) => (
          <div
            className="typo-b2_rg_15 text-text-basicSecondary bg-chipUnselected rounded-full px-3 py-1.5"
            key={name}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};
