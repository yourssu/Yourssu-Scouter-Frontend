export type MailBodyFormatType = 'HTML' | 'PLAIN_TEXT';

interface BuildMailRequestParams {
  mailContent: {
    attachments: string[];
    body: string;
    bodyFormat: MailBodyFormatType;
    inlineImages: string[];
  };
  mailInfo: {
    bcc: string[];
    cc: string[];
    receiver: string[];
    subject: string;
  };
  reservedDate: Date | null;
}

export const buildMailRequest = ({
  mailInfo,
  mailContent,
  reservedDate,
}: BuildMailRequestParams) => {
  return {
    request: {
      receiverEmailAddresses: mailInfo.receiver,
      ccEmailAddresses: mailInfo.cc,
      bccEmailAddresses: mailInfo.bcc,
      mailSubject: mailInfo.subject,
      mailBody: mailContent.body,
      bodyFormat: mailContent.bodyFormat,
      reservationTime: reservedDate ? reservedDate.toISOString() : null,
    },
  };
};
