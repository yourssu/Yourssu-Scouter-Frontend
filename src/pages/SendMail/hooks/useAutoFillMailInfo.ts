import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { applicantOptions } from '@/query/applicant/options';
import { memberOptions } from '@/query/member/options';
import { Part } from '@/query/part/schema';

interface AutoFillMembers {
  selectedPart: Part;
}

export const useAutoFillMembers = ({ selectedPart }: AutoFillMembers) => {
  const { data: allMembers } = useSuspenseQuery(memberOptions('액티브'));
  const { data: applicantData } = useSuspenseQuery(
    applicantOptions({ partId: selectedPart.partId }),
  );

  return useMemo(() => {
    if (!allMembers) {
      return { lead: [], applicants: [], partMembers: [], hrMembers: [] };
    }

    // 1. 선택된 파트의 리더
    const lead = allMembers
      .filter((m) => m.parts.some((p) => p.part === selectedPart.partName) && m.role === 'Lead')
      .map((m) => m.nickname);

    // 2. 선택된 파트의 모든 지원자
    const applicants = applicantData
      .filter((m) => m.part === selectedPart.partName)
      .map((m) => m.name);

    // 3. 선택된 파트의 모든 팀원 (리더 제외)
    const partMembers = allMembers
      .filter((m) => m.parts.some((p) => p.part === selectedPart.partName) && m.role !== 'Lead')
      .map((m) => m.nickname);

    // 4. HR 팀의 모든 팀원
    const hrMembers = allMembers
      .filter((m) => m.parts.some((p) => p.part === 'HR'))
      .map((m) => m.nickname);

    return { lead, applicants, partMembers, hrMembers };
  }, [allMembers, selectedPart, applicantData]);
};
