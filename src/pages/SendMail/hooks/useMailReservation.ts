import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { useMailInfoContext, useMailVariableContext } from '@/pages/SendMail/context';
import { applicantOptions } from '@/query/applicant/options';
import { postMailReservation } from '@/query/mail/mutation/postMailReservation';
import { putMailReservation } from '@/query/mail/mutation/putMailReservation';
import { MailReservationKeys } from '@/query/mail/options';
import { MailDetail } from '@/query/mail/schema';
import { memberOptions } from '@/query/member/options';
import { templateOptions } from '@/query/template/options';

export const useMailActions = () => {
  const queryClient = useQueryClient();
  const { mailInfo } = useMailInfoContext();

  const { data: allMembers } = useSuspenseQuery(memberOptions('액티브'));
  const { data: allApplicants } = useSuspenseQuery(applicantOptions());

  const { variableValue } = useMailVariableContext();

  const { mutateAsync: mutatePostMailReservation, isPending } = useMutation({
    mutationFn: postMailReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MailReservationKeys.all });
    },
  });

  const convertNameToEmail = (name: string) => {
    // 지원자에서 찾기
    const applicant = allApplicants?.find((a) => a.name === name);
    if (applicant) {
      return applicant.email;
    }

    // 멤버에서 찾기
    const member = allMembers?.members.find((m) => m.nickname === name);
    if (member && member.state !== '탈퇴' && 'email' in member) {
      return member.email;
    }

    return name;
  };

  const updateReservation = async (mailDetails: MailDetail[], reservationTime: Date) => {
    if (mailDetails.length === 0) {
      return;
    }
    const detail = mailDetails[0];
    const reservationId = detail.reservationId;

    // Fetch templateId from reservation groups
    let templateId: number | undefined;
    try {
      const groupsData = await queryClient.fetchQuery({
        queryKey: ['mailReservations', 'groups'] as const,
        queryFn: () => api.get('api/mails/reservation/groups').json<{ groups: any[] }>(),
      });
      const group = groupsData.groups.find((g) => g.mailIds.includes(detail.mailId));
      if (group) {
        templateId = group.templateId;
      }
    } catch (e) {
      console.error('Failed to fetch templateId from reservation groups', e);
    }

    const resolvedTemplateId = templateId ?? 0;

    // Get the recipients from mailInfo.receiver
    const newReceiverEmails = mailInfo.receiver.map(convertNameToEmail);

    const recipients = newReceiverEmails.map((email) => {
      const targetApplicant = allApplicants?.find((a) => a.name === email || a.email === email);
      return {
        email,
        ...(targetApplicant ? { applicantId: targetApplicant.applicantId } : {}),
        bindings: {},
      };
    });

    await putMailReservation({
      reservationId,
      templateId: resolvedTemplateId,
      reservationTime: reservationTime.toISOString(),
      recipients,
      sharedBindings: {},
      ccEmailAddresses: mailInfo.cc.map(convertNameToEmail),
      bccEmailAddresses: mailInfo.bcc.map(convertNameToEmail),
    });

    queryClient.invalidateQueries({ queryKey: MailReservationKeys.all });
  };

  const sendReservation = async (templateId: number, reservedDate: Date) => {
    // 1. Fetch template details to get its variables
    const template = await queryClient.fetchQuery(templateOptions.detail(templateId));

    // Helper to format variables (specifically rendering Link type to HTML a tags)
    const formatVariableValue = (v: { type: string }, val: string) => {
      if (v.type === '링크') {
        try {
          const parsed = JSON.parse(val);
          if (parsed && typeof parsed === 'object' && parsed.url) {
            const linkText = parsed.text || parsed.url;
            const linkUrl = parsed.url.startsWith('http') ? parsed.url : `https://${parsed.url}`;
            return `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #1155cc; text-decoration: underline;">${linkText}</a>`;
          }
        } catch {
          // Fallback if not valid JSON
        }
      }
      return val;
    };

    // 2. Prepare cc and bcc email addresses
    const ccEmailAddresses = mailInfo.cc.map(convertNameToEmail);
    const bccEmailAddresses = mailInfo.bcc.map(convertNameToEmail);

    // 3. Prepare common bindings (sharedBindings)
    const sharedBindings: Record<string, string> = {};
    template.variables.forEach((v) => {
      if (v.type === '사람/지원자' || v.type === '텍스트/파트명') {
        return;
      }
      if (!v.perRecipient) {
        const rawValue = variableValue.common[v.key] ?? '';
        sharedBindings[v.key] = formatVariableValue(v, rawValue);
      }
    });

    // 4. Prepare recipients list
    const newReceiverEmails = mailInfo.receiver.map(convertNameToEmail);
    const recipients = newReceiverEmails.map((email) => {
      const targetApplicant = allApplicants?.find((a) => a.name === email || a.email === email);
      const bindings: Record<string, string> = {};

      template.variables.forEach((v) => {
        if (v.type === '사람/지원자' || v.type === '텍스트/파트명') {
          return;
        }
        if (v.perRecipient) {
          const id = targetApplicant ? String(targetApplicant.applicantId) : email;
          const rawValue = variableValue.perApplicant[id]?.[v.key] ?? '';
          bindings[v.key] = formatVariableValue(v, rawValue);
        }
      });

      return {
        email,
        ...(targetApplicant ? { applicantId: targetApplicant.applicantId } : {}),
        bindings,
      };
    });

    // 5. Post to API
    await mutatePostMailReservation({
      templateId,
      reservationTime: reservedDate.toISOString(),
      recipients,
      sharedBindings,
      ccEmailAddresses,
      bccEmailAddresses,
    });
  };

  return { sendReservation, updateReservation, isPending };
};
