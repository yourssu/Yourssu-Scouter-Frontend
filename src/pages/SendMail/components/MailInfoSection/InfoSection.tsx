import { useSuspenseQuery } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { Suspense, useCallback, useState } from 'react';

import { ApplicantInputField } from '@/pages/SendMail/components/MailInfoSection/ApplicantInputField';
import { AutoFillMembers } from '@/pages/SendMail/components/MailInfoSection/AutoFillIMembers';
import { MemberInputField } from '@/pages/SendMail/components/MailInfoSection/MemberInputField';
import { TextInputField } from '@/pages/SendMail/components/MailInfoSection/TextInputField';
import { MailReservationDialog } from '@/pages/SendMail/components/MailReservationDialog/MailReservationDialog';
import { useMailInfoContext } from '@/pages/SendMail/context';
import { meOption } from '@/query/member/me/options';
import { Part } from '@/query/part/schema';
import { MailFormData } from '@/types/editor';
import { MemberInputFieldKey } from '@/types/editor';
import { formatTemplates } from '@/utils/date';

interface InfoSectionProps {
  isTitleIncluded: boolean;
  onReservationTimeChange?: (date: Date) => void;
  readOnly?: boolean;
  reservationTime?: Date;
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
}

export const InfoSection = ({
  readOnly,
  selectedPart,
  selectedTemplateId,
  isTitleIncluded,
  reservationTime,
  onReservationTimeChange,
}: InfoSectionProps) => {
  const {
    mailInfo,
    actions: { updateMailInfo },
  } = useMailInfoContext();

  const { data: me } = useSuspenseQuery(meOption());

  const [formData, setFormData] = useState<MailFormData>({
    members: {
      '받는 사람': mailInfo.receiver || [],
      '보내는 사람': mailInfo.sender ? [mailInfo.sender] : [me.nickname],
      '숨은 참조': mailInfo.bcc || [],
    },
    subject: mailInfo.subject || '',
  });

  // 멤버(칩) 업데이트
  const handleMemberUpdate = useCallback(
    (updates: Partial<Record<MemberInputFieldKey, string[]>>) => {
      // 1. 로컬 상태 업데이트
      setFormData((prev) => ({
        ...prev,
        members: { ...prev.members, ...updates },
      }));

      // 2. 컨텍스트 상태 업데이트
      const mailUpdate: Parameters<typeof updateMailInfo>[0] = {};

      if (updates['받는 사람']) {
        mailUpdate.receiver = updates['받는 사람'];
      }
      if (updates['숨은 참조']) {
        mailUpdate.bcc = updates['숨은 참조'];
      }

      if (Object.keys(mailUpdate).length > 0) {
        updateMailInfo(mailUpdate);
      }
    },
    [updateMailInfo],
  );

  const handleSubjectUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSubject = e.target.value;
    setFormData((prev) => ({
      ...prev,
      subject: newSubject,
    }));
    updateMailInfo({
      subject: newSubject,
    });
  };

  return (
    <div className="flex flex-col gap-0">
      {!selectedPart ? (
        <div className="flex flex-col gap-0">
          <MemberInputField
            items={formData.members['보내는 사람']}
            key="보내는 사람"
            label="보내는 사람"
            onItemsUpdate={(items) => handleMemberUpdate({ '보내는 사람': items })}
            readOnly={readOnly}
          />
          <ApplicantInputField
            items={formData.members['받는 사람']}
            key="받는 사람"
            label="받는 사람"
            onItemsUpdate={(items) => handleMemberUpdate({ '받는 사람': items })}
            readOnly={readOnly}
          />
          <MemberInputField
            items={formData.members['숨은 참조']}
            key="숨은 참조"
            label="숨은 참조"
            onItemsUpdate={(items) => handleMemberUpdate({ '숨은 참조': items })}
            readOnly={readOnly}
          />
        </div>
      ) : (
        <Suspense>
          <AutoFillMembers
            key={selectedPart.partId}
            members={formData.members}
            onMembersUpdate={handleMemberUpdate}
            selectedPart={selectedPart}
            selectedTemplateId={selectedTemplateId}
          />
        </Suspense>
      )}
      {isTitleIncluded && (
        <TextInputField
          label="제목"
          onChange={handleSubjectUpdate}
          readOnly={readOnly}
          value={formData.subject}
        />
      )}
      {reservationTime && (
        <div className="border-line-basicMedium flex min-h-[56px] w-full flex-row gap-[12px] border-b-1 px-[20px] py-[10px]">
          <div className="typo-b1_sb_16 text-text-basicPrimary flex min-w-[72px] items-center">
            예약 시간
          </div>
          {onReservationTimeChange ? (
            <button
              className="typo-b1_rg_16 text-text-basicPrimary flex items-center hover:underline"
              onClick={() => {
                overlay.open(({ isOpen, close }) => (
                  <MailReservationDialog
                    initialDate={reservationTime}
                    onClose={close}
                    onReserve={async (date: Date) => {
                      onReservationTimeChange(date);
                      close();
                    }}
                    open={isOpen}
                  />
                ));
              }}
              type="button"
            >
              {formatTemplates['01/01(월) 00:00'](reservationTime)}
            </button>
          ) : (
            <span className="typo-b1_rg_16 text-text-basicPrimary flex items-center">
              {formatTemplates['01/01(월) 00:00'](reservationTime)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
