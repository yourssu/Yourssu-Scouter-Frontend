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
    if (isInitialized.current) {
      return;
    }

    const hasData =
      (mailInfo.receiver && mailInfo.receiver.length > 0) ||
      (mailInfo.bcc && mailInfo.bcc.length > 0);

    if (hasData) {
      isInitialized.current = true;
      return;
    }

    const applicantsData = results[0].data;
    const partMembersData = results[1].data;
    const hrMembersData = isSelectedPartHR ? partMembersData : (results[2]?.data ?? []);

    if (applicantsData && partMembersData) {
      onMembersUpdate({
        '받는 사람': applicantsData.map((a) => a.name),
        '숨은 참조': uniq([...partMembersData, ...hrMembersData].map((m) => m.nickname)),
      });
      isInitialized.current = true;
    }
  }, [results, isSelectedPartHR, onMembersUpdate, mailInfo]);

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
