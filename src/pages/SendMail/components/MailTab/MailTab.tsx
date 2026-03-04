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
    return [...map.values()];
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
        {groupedMails.map((group) => (
          <TemplateList
            date={formatTemplates['01/01(월) 00:00'](group[0].reservationTime)}
            key={group[0].mailSubject}
            onClick={() => setSelectedMailIds(group.map((m) => m.reservationId))}
            onDelete={() => console.log('메일 삭제')}
            text={readOnly ? '' : '에 예약됨'}
            title={group[0].mailSubject}
          />
        ))}
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
