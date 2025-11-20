import { motion } from 'motion/react';
import { tv } from 'tailwind-variants';

import { useAvailableTimesModeHoverContext } from '@/pages/Interview/components/AvailableTimesMode/context';
import { Applicant } from '@/query/applicant/schema';

interface AvailableTimesHeaderChipGroupProps {
  availableApplicants: Applicant[];
}

const chip = tv({
  base: 'typo-b2_rg_15 hover:bg-chipSelected hover:text-text-brandPrimary rounded-full px-3 py-1.5 hover:font-semibold',
  variants: {
    active: {
      true: 'bg-chipSelected text-text-brandPrimary font-semibold',
      false: 'bg-chipUnselected text-text-basicSecondary',
    },
  },
});

export const AvailableTimesHeaderChipGroup = ({
  availableApplicants,
}: AvailableTimesHeaderChipGroupProps) => {
  const { hoveredBlockApplicantIds, setHoveredChipApplicantId } =
    useAvailableTimesModeHoverContext();

  const isAnyBlockHovered = hoveredBlockApplicantIds.length > 0;

  const applicants = isAnyBlockHovered
    ? availableApplicants.filter(({ applicantId }) =>
        hoveredBlockApplicantIds.includes(applicantId),
      )
    : availableApplicants;

  return (
    <div className="flex items-center gap-6">
      <div className="typo-b1_sb_16 text-text-basicSecondary">지원자</div>
      <div className="flex flex-wrap items-center gap-2">
        {applicants.map(({ name, applicantId }) => (
          <motion.div
            className={chip({ active: isAnyBlockHovered })}
            key={name}
            onHoverEnd={() => setHoveredChipApplicantId(null)}
            onHoverStart={() => setHoveredChipApplicantId(applicantId)}
          >
            {name}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
