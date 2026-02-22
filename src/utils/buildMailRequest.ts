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
      attachmentReferences: [],
      bccEmailAddresses: mailInfo.bcc,
      bodyFormat: mailContent.bodyFormat,
      ccEmailAddresses: mailInfo.cc,
      inlineImageReferences: [],
      mailBody: mailContent.body,
      mailSubject: mailInfo.subject,
      receiverEmailAddresses: mailInfo.receiver,
      reservationTime: reservedDate ? reservedDate.toISOString() : new Date().toISOString(),
    },
  };
};
