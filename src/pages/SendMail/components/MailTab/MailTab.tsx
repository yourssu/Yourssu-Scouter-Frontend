import { useSuspenseQuery } from '@tanstack/react-query';
import { BoxButton, IcPlusLine } from '@yourssu/design-system-react';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import TableSearchBar from '@/components/TableSearchBar/TableSearchBar';
import { TemplateList } from '@/components/TemplateList/TemplateList';
import { MailEditDialog } from '@/pages/SendMail/components/MailEditDialog/MailEditDialog';
import { mailOptions } from '@/query/mail/options';
import { MailItem } from '@/query/mail/schema';
import { formatTemplates } from '@/utils/date';

interface MailTabProps {
  onCompose?: () => void;
  readOnly?: boolean;
  statuses: MailItem['status'][];
}

export const MailTab = ({ onCompose, readOnly, statuses }: MailTabProps) => {
  const methods = useForm({ defaultValues: { search: '' } });
  const { watch } = methods;
  const searchValue = watch('search');
  const { data: mails } = useSuspenseQuery(mailOptions.all());
  const [selectedMailIds, setSelectedMailIds] = useState<null | number[]>(null);

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
      if (aFailed && bFailed) {
        return new Date(a[0].reservationTime).getTime() - new Date(b[0].reservationTime).getTime();
      }
      return 0;
    });
  }, [filteredMails]);

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
              onDelete={() => {}}
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
          readOnly={readOnly}
        />
      )}
    </FormProvider>
  );
};
