import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { BoxButton, IcPlusLine } from '@yourssu/design-system-react';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import TableSearchBar from '@/components/TableSearchBar/TableSearchBar';
import { TemplateList } from '@/components/TemplateList/TemplateList';
import { MailEditDialog } from '@/pages/SendMail/components/MailEditDialog/MailEditDialog';
import { DeleteTemplateDialog } from '@/pages/Template/components/DeleteTemplateDialog/DeleteTemplateDialog';
import { deleteMailReservation } from '@/query/mail/mutation/deleteMailReservation';
import { mailOptions, MailReservationKeys } from '@/query/mail/options';
import { MailItem } from '@/query/mail/schema';
import { formatTemplates } from '@/utils/date';

interface MailTabProps {
  dialogReadOnly?: boolean; // 메일 상세 다이얼로그를 읽기 전용으로 열지 여부
  emptyText: string;
  onCompose?: () => void;
  readOnly?: boolean; // 메일 예약 목록을 읽기 전용으로 보여줄지 여부
  sortOrder?: 'asc' | 'desc';
  statuses: MailItem['status'][];
}

export const MailTab = ({
  dialogReadOnly,
  emptyText,
  onCompose,
  readOnly,
  sortOrder = 'desc',
  statuses,
}: MailTabProps) => {
  const methods = useForm({ defaultValues: { search: '' } });
  const { watch } = methods;
  const searchValue = watch('search');
  const { data: mails } = useSuspenseQuery(mailOptions.all());
  const [selectedMailIds, setSelectedMailIds] = useState<null | number[]>(null);
  const [pendingDeleteGroup, setPendingDeleteGroup] = useState<null | {
    ids: number[];
    subject: string;
  }>(null);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteReservation } = useMutation({
    mutationFn: deleteMailReservation,
  });

  const handleConfirmDelete = async () => {
    if (!pendingDeleteGroup) { return; }
    await Promise.all(
      pendingDeleteGroup.ids.map((id) => deleteReservation({ reservationId: id })),
    );
    queryClient.invalidateQueries({ queryKey: MailReservationKeys.all });
    setPendingDeleteGroup(null);
  };

  const filteredMails = useMemo(
    () =>
      mails.filter(
        (mail) =>
          statuses.includes(mail.status) &&
          mail.mailSubject.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [mails, statuses, searchValue],
  );

  const groupedMails = useMemo(() => {
    const map = new Map<string, typeof filteredMails>();
    for (const mail of filteredMails) {
      if (!map.has(mail.mailSubject)) {
        map.set(mail.mailSubject, []);
      }
      map.get(mail.mailSubject)!.push(mail);
    }
    return [...map.values()].sort((a, b) => {
      const aFailed = a.some((m) => m.status === 'PENDING_SEND');
      const bFailed = b.some((m) => m.status === 'PENDING_SEND');
      if (aFailed !== bFailed) {
        return aFailed ? -1 : 1;
      }
      const timeA = new Date(a[0].reservationTime).getTime();
      const timeB = new Date(b[0].reservationTime).getTime();
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }, [filteredMails, sortOrder]);

  const hasAnyMails = mails.some((mail) => statuses.includes(mail.status));

  if (!hasAnyMails) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <p className="typo-b1_rg_16 text-text-basicTertiary">{emptyText}</p>
        <BoxButton
          leftIcon={<IcPlusLine />}
          onClick={onCompose}
          size="medium"
          variant="filledPrimary"
        >
          메일 작성하기
        </BoxButton>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-between py-6">
        <TableSearchBar placeholder="제목으로 검색" />
        <BoxButton
          leftIcon={<IcPlusLine />}
          onClick={onCompose}
          size="medium"
          variant="filledPrimary"
        >
          메일 작성하기
        </BoxButton>
      </div>

      <div className="flex flex-col gap-3">
        {groupedMails.map((group) => {
          const isPendingSend = group.some((m) => m.status === 'PENDING_SEND');
          return (
            <TemplateList
              action={
                isPendingSend ? (
                  <BoxButton onClick={() => {}} size="small" variant="outlined">
                    재전송하기
                  </BoxButton>
                ) : undefined
              }
              date={formatTemplates['01/01(월) 00:00'](group[0].reservationTime)}
              key={group[0].mailSubject}
              onClick={() => setSelectedMailIds(group.map((m) => m.reservationId))}
              onDelete={() =>
                setPendingDeleteGroup({
                  ids: group.map((m) => m.reservationId),
                  subject: group[0].mailSubject,
                })
              }
              readonly={readOnly}
              text={isPendingSend ? '에 전송 실패' : readOnly ? '' : '에 예약됨'}
              title={group[0].mailSubject}
              variant={isPendingSend ? 'error' : undefined}
            />
          );
        })}
      </div>

      {selectedMailIds && (
        <MailEditDialog
          isOpen
          mailIds={selectedMailIds}
          onClose={() => setSelectedMailIds(null)}
          readOnly={readOnly || dialogReadOnly}
        />
      )}

      <DeleteTemplateDialog
        isOpen={!!pendingDeleteGroup}
        onClose={() => setPendingDeleteGroup(null)}
        onConfirm={handleConfirmDelete}
        templateTitle={pendingDeleteGroup?.subject ?? ''}
        title="이 메일을 삭제하시겠습니까?"
      />
    </FormProvider>
  );
};
