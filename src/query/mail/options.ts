import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { MailDetailSchema, MailGroupListSchema, MailListSchema } from '@/query/mail/schema';
import { BaseTemplateSchema } from '@/query/template/schema';

const resolveGroupSubject = (
  templateSubject: string,
  variables: Array<{ displayName: string; key: string; perRecipient: boolean; type: string }>,
  resolvedSubject: string,
): string => {
  const placeholderMatches = [...templateSubject.matchAll(/\{\{([^}]+)\}\}/g)];
  const variableKeys = placeholderMatches.map((m) => m[1]);

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  let regexString = '^';
  let lastIndex = 0;
  placeholderMatches.forEach((match) => {
    const matchIndex = match.index!;
    regexString += escapeRegExp(templateSubject.substring(lastIndex, matchIndex));
    regexString += '(.*?)';
    lastIndex = matchIndex + match[0].length;
  });
  regexString += escapeRegExp(templateSubject.substring(lastIndex));
  regexString += '$';

  const regex = new RegExp(regexString);
  const matchResult = resolvedSubject.match(regex);

  const resolvedValues: Record<string, string> = {};
  if (matchResult) {
    variableKeys.forEach((key, index) => {
      resolvedValues[key] = matchResult[index + 1];
    });
  }

  let finalSubject = templateSubject;
  variables.forEach((v) => {
    const isPerRecipient = v.perRecipient || v.type === 'APPLICANT';
    const placeholder = `{{${v.key}}}`;
    if (isPerRecipient) {
      finalSubject = finalSubject.replaceAll(placeholder, `{{${v.displayName}}}`);
    } else {
      const val = resolvedValues[v.key];
      if (val !== undefined) {
        finalSubject = finalSubject.replaceAll(placeholder, val);
      } else {
        finalSubject = finalSubject.replaceAll(placeholder, `{{${v.displayName}}}`);
      }
    }
  });

  return finalSubject;
};

export const MailReservationKeys = {
  all: ['mailReservations'] as const,
  detail: (id: number) => [...MailReservationKeys.all, id] as const,
};

export const mailOptions = {
  all: () =>
    queryOptions({
      queryKey: MailReservationKeys.all,
      queryFn: async () => {
        const [groupsData, listData] = await Promise.all([
          api.get('api/mails/reservation/groups').json().then(MailGroupListSchema.parse),
          api.get('api/mails/reservation').json().then(MailListSchema.parse),
        ]);

        const validGroups = groupsData.groups.filter((g) => g.mailIds && g.mailIds.length > 0);

        const templateIds = [
          ...new Set(
            validGroups
              .map((g) => g.templateId)
              .filter((id): id is number => id !== null && id !== undefined),
          ),
        ];
        const templatesData = await Promise.all(
          templateIds.map((id) =>
            api
              .get(`api/mails/templates/${id}`)
              .json()
              .then(BaseTemplateSchema.parse)
              .catch((err) => {
                console.error(`Failed to fetch template ${id}`, err);
                return null;
              }),
          ),
        );
        const templateMap = new Map(
          templatesData
            .filter((t): t is Exclude<typeof t, null> => t !== null)
            .map((t) => [t.id, t]),
        );

        return validGroups
          .filter((group) => {
            if (group.templateId === null || group.templateId === undefined) {
              return true;
            }
            return templateMap.has(group.templateId);
          })
          .map((group) => {
            const matchingMail = listData.items.find((item) => group.mailIds.includes(item.mailId));

            // TODO: 백엔드에서 reservationIds 대신 mailIds를 잘못 내려주고 있어 각각 예약 메일 단건 조회가 불가능한 이슈 우회.
            // 전체 예약 목록에서 mailId에 대응하는 reservationId를 매핑하여 상세 조회/삭제/재시도 시 사용하도록 처리.
            // Slack thread: https://yourssu.slack.com/archives/C082XCSQK0F/p1780224372483989
            const resolvedReservationIds = group.mailIds.map((mailId) => {
              const match = listData.items.find((item) => item.mailId === mailId);
              return match ? match.reservationId : mailId;
            });

            let mailSubject = matchingMail?.mailSubject ?? '(제목 없음)';
            if (group.templateId && templateMap.has(group.templateId) && matchingMail) {
              const template = templateMap.get(group.templateId)!;
              try {
                mailSubject = resolveGroupSubject(
                  template.subject,
                  template.variables,
                  matchingMail.mailSubject,
                );
              } catch (e) {
                console.error('Failed to resolve dynamic subject', e);
              }
            }

            const template = group.templateId ? templateMap.get(group.templateId) : null;

            return {
              ...group,
              mailSubject,
              resolvedReservationIds,
              variables: template ? template.variables : [],
            };
          });
      },
      staleTime: Infinity,
    }),
  detail: (reservationId: number) =>
    queryOptions({
      queryKey: MailReservationKeys.detail(reservationId),
      queryFn: async () => {
        const data = await api.get(`api/mails/reservation/${reservationId}`).json();
        const response = MailDetailSchema.parse(data);
        return response;
      },
      staleTime: Infinity,
    }),
};
