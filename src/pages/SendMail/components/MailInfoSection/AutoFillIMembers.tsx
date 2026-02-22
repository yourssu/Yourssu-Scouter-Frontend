import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { assert, uniq } from 'es-toolkit';
import { useEffect, useRef } from 'react';

import { ApplicantInputField } from '@/pages/SendMail/components/MailInfoSection/ApplicantInputField';
import { useMailInfoContext } from '@/pages/SendMail/context';
import { applicantOptions } from '@/query/applicant/options.ts';
import { memberOptions } from '@/query/member/options.ts';
import { partOptions } from '@/query/part/options.ts';
import { Part } from '@/query/part/schema';
import { MemberInputFieldKey } from '@/types/editor';

import { MemberInputField } from '../MailInfoSection/MemberInputField';

interface AutoFillMembersProps {
  members: Record<MemberInputFieldKey, string[]>;
  onMembersUpdate: (updates: Partial<Record<MemberInputFieldKey, string[]>>) => void;
  selectedPart: Part;
  selectedTemplateId: number | undefined;
}

export const AutoFillMembers = ({
  selectedPart,
  members,
  selectedTemplateId,
  onMembersUpdate,
}: AutoFillMembersProps) => {
  const isInitialized = useRef(false); // 초기화 여부 확인용
  const {
    mailInfo,
    // actions: { updateMailInfo },
  } = useMailInfoContext();
  const {
    data: { partId: hrPartId },
  } = useSuspenseQuery({
    ...partOptions(),
    select: (data) => {
      const hrPart = data.find((p) => p.partName === 'HR');
      assert(!!hrPart, 'HR 파트 정보를 불러올 수 없어요.');
      return hrPart;
    },
  });

  const isSelectedPartHR = selectedPart.partId === hrPartId;

  const results = useSuspenseQueries({
    queries: [
      applicantOptions({ partId: selectedPart.partId }), // 지원자
      memberOptions('액티브', { partId: selectedPart.partId, search: '' }), // 선택 파트 멤버
      // 선택된 파트가 HR이 아닐 때만 별도로 HR 멤버를 불러옴
      ...(isSelectedPartHR ? [] : [memberOptions('액티브', { partId: hrPartId, search: '' })]), // HR 멤버
    ],
  });

  useEffect(() => {
    // 해당 파트Id에 대해 이미 초기화(병합)를 완료했다면 중복 실행 방지
    if (isInitialized.current) {
      return;
    }

    const applicantsData = results[0].data;
    const partMembersData = results[1].data;
    const hrMembersData = isSelectedPartHR ? partMembersData : (results[2]?.data ?? []);

    if (applicantsData && partMembersData && !selectedTemplateId) {
      // 1. 현재 컨텍스트에 담긴 '이미 선택된 명단'을 가져옴
      const currentReceivers = mailInfo.receiver || [];
      const currentBcc = mailInfo.bcc || [];

      // 2. 선택된 파트의 기본 지원자 명단을 가져옴
      const partReceivers = applicantsData.map((a) => a.name);
      const partBcc = [...partMembersData, ...hrMembersData].map((m) => m.nickname);

      // 3. [기존 명단 + 새 명단]을 합치고 중복을 제거
      onMembersUpdate({
        '받는 사람': uniq([...currentReceivers, ...partReceivers]),
        '숨은 참조': uniq([...currentBcc, ...partBcc]),
      });

      isInitialized.current = true;
    }
  }, [
    results,
    isSelectedPartHR,
    onMembersUpdate,
    mailInfo.receiver,
    mailInfo.bcc,
    selectedPart.partId,
    selectedTemplateId,
  ]);

  return (
    <div className="gap-0">
      <MemberInputField
        items={members['보내는 사람']}
        label="보내는 사람"
        onItemsUpdate={(items: string[]) => onMembersUpdate({ '보내는 사람': items })}
      />
      <ApplicantInputField
        items={mailInfo.receiver || []}
        label="받는 사람"
        onItemsUpdate={(items: string[]) => onMembersUpdate({ '받는 사람': items })}
      />
      <MemberInputField
        items={mailInfo.bcc || []}
        label="숨은 참조"
        onItemsUpdate={(items: string[]) => onMembersUpdate({ '숨은 참조': items })}
      />
    </div>
  );
};
