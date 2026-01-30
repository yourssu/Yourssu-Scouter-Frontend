import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { assert, uniq } from 'es-toolkit';
import { useEffect, useRef } from 'react';

import { SendToField } from '@/pages/SendMail/components/MailInfoSection/SendToField';
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
  selectedTemplateId,
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

  const [{ data: applicants }, { data: partMembers }, { data: hrMembers }] = useSuspenseQueries({
    queries: [
      applicantOptions({ partId: selectedPart.partId }),
      memberOptions('액티브', {
        partId: selectedPart.partId,
        search: '',
      }),
      memberOptions('액티브', {
        partId: hrPartId,
        search: '',
      }),
    ],
  });

  useEffect(() => {
    // 초기화가 이미 된 경우에는 실행하지 않음
    if (isInitialized.current) {
      return;
    }

    onMembersUpdate({
      '받는 사람': applicants.map((a) => a.name),
      '숨은 참조': uniq([...partMembers, ...hrMembers].map((m) => m.nickname)),
    });

    isInitialized.current = true;
  }, [applicants, partMembers, hrMembers, onMembersUpdate]);

  return (
    <div className="gap-0">
      {selectedTemplateId === undefined ? (
        <>
          <MemberInputField
            items={members['보내는 사람']}
            label="보내는 사람"
            onItemsUpdate={(items: string[]) => onMembersUpdate({ '보내는 사람': items })}
          />
          <MemberInputField
            items={mailInfo.receiver || []}
            label="받는 사람"
            onItemsUpdate={(items: string[]) => onMembersUpdate({ '받는 사람': items })}
          />
          <MemberInputField
            items={mailInfo.bcc || []}
            label="숨은 참조"
            onItemsUpdate={(items: string[]) => onMembersUpdate({ '숨은 참조': items })}
          />
        </>
      ) : (
        <SendToField
          receivers={[...mailInfo.receiver, ...mailInfo.bcc]}
          sender={members['보내는 사람']}
        />
      )}
    </div>
  );
};
