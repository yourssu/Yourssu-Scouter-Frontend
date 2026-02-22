export type MailBodyFormatType = 'HTML' | 'PLAIN_TEXT';

export interface AttachmentType {
  fileId: number;
  name: string;
}

interface BuildMailRequestParams {
  mailContent: {
    attachments: AttachmentType[];
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
      attachmentReferences: mailContent.attachments.map((file) => ({ fileId: file.fileId })),
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
