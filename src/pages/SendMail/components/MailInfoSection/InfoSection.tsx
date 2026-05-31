import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { EditorContent, Extension, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { overlay } from 'overlay-kit';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { VariableChipNode } from '@/components/VariableChip/VariableChipNode';
import { PlainTextPaste } from '@/extensions/PlainTextPaste';
import { ApplicantInputField } from '@/pages/SendMail/components/MailInfoSection/ApplicantInputField';
import { AutoFillMembers } from '@/pages/SendMail/components/MailInfoSection/AutoFillIMembers';
import { MemberInputField } from '@/pages/SendMail/components/MailInfoSection/MemberInputField';
import { MailReservationDialog } from '@/pages/SendMail/components/MailReservationDialog/MailReservationDialog';
import { useMailInfoContext } from '@/pages/SendMail/context';
import { meOption } from '@/query/member/me/options';
import { Part } from '@/query/part/schema';
import { templateOptions } from '@/query/template/options';
import { MailFormData } from '@/types/editor';
import { MemberInputFieldKey } from '@/types/editor';
import { formatTemplates } from '@/utils/date';
import { transformBodyHtmlToContent } from '@/utils/transformTemplate';

interface InfoSectionProps {
  isTitleIncluded: boolean;
  onReservationTimeChange?: (date: Date) => void;
  readOnly?: boolean;
  reservationTime?: Date;
  selectedPart: Part | undefined;
  selectedTemplateId: number | undefined;
}

const StyledSubjectEditor = styled(EditorContent)`
  width: 100%;
  outline: none;
  display: flex;
  align-items: center;

  .tiptap {
    outline: none;
    width: 100%;

    p {
      margin: 0;
    }
  }
`;

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

  // 템플릿 정보 가져오기
  const templateResults = useSuspenseQueries({
    queries: [...(selectedTemplateId ? [templateOptions.detail(selectedTemplateId)] : [])],
  });
  const templateDetail = templateResults[0]?.data;

  // 제목 에디터 설정
  const subjectEditor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        underline: false,
      }),
      PlainTextPaste,
      VariableChipNode,
      Extension.create({
        name: 'singleLine',
        addKeyboardShortcuts() {
          return {
            Enter: () => true,
            'Shift-Enter': () => true,
          };
        },
      }),
    ],
    content:
      selectedTemplateId && templateDetail
        ? transformBodyHtmlToContent(templateDetail.subject || '', templateDetail.variables)
        : '',
    editable: false,
    immediatelyRender: false,
  });

  // 템플릿 변경 감지 및 에디터 내용 동기화
  useEffect(() => {
    if (subjectEditor) {
      const nextContent =
        selectedTemplateId && templateDetail
          ? transformBodyHtmlToContent(templateDetail.subject || '', templateDetail.variables)
          : '';
      const nextHtml = nextContent ? `<p>${nextContent}</p>` : '<p></p>';
      if (subjectEditor.getHTML() !== nextHtml) {
        subjectEditor.commands.setContent(nextHtml);
      }
    }
  }, [subjectEditor, selectedTemplateId, templateDetail]);

  const [formData, setFormData] = useState<MailFormData>({
    members: {
      '받는 사람': mailInfo.receiver || [],
      '보내는 사람': mailInfo.sender ? [mailInfo.sender] : [me.nickname],
      '숨은 참조': mailInfo.bcc || [],
    },
    subject: mailInfo.subject || '',
  });

  // 템플릿 변경 감지 및 제목 동기화
  useEffect(() => {
    if (selectedTemplateId && templateDetail) {
      const nextSubject = templateDetail.subject || '';
      setFormData((prev) => ({
        ...prev,
        subject: nextSubject,
      }));
      updateMailInfo({
        subject: nextSubject,
      });
    } else if (!selectedTemplateId) {
      setFormData((prev) => ({
        ...prev,
        subject: '',
      }));
      updateMailInfo({
        subject: '',
      });
    }
  }, [templateDetail, selectedTemplateId, updateMailInfo]);

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
        <div className="border-line-basicMedium flex min-h-[56px] w-full flex-row gap-[12px] border-b-1 px-[20px] py-[10px]">
          <div className="typo-b1_sb_16 text-text-basicPrimary flex min-w-[72px] items-center">
            제목
          </div>
          {selectedTemplateId ? (
            <div className="typo-b1_rg_16 text-text-basicPrimary flex min-h-[36px] w-full items-center">
              <StyledSubjectEditor editor={subjectEditor} />
            </div>
          ) : (
            <input
              className="typo-b1_rg_16 text-text-basicPrimary h-[36px] w-full border-0 bg-transparent p-0 outline-none focus:ring-0"
              onChange={handleSubjectUpdate}
              placeholder="메일 제목을 입력하세요"
              readOnly={readOnly}
              value={formData.subject}
            />
          )}
        </div>
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
