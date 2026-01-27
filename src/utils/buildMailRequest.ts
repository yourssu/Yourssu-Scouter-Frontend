export type MailBodyFormatType = 'HTML' | 'PLAIN_TEXT';

interface BuildMailRequestParams {
  mailContent: {
    attachments: string;
    body: string;
    bodyFormat: MailBodyFormatType;
    inlineImages: string;
    subject: string;
  };
  mailInfo: {
    bcc: string[];
    cc: string[];
    receiver: string[];
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
      mailSubject: mailContent.subject,
      mailBody: mailContent.body,
      bodyFormat: mailContent.bodyFormat,
      reservationTime: reservedDate ? reservedDate.toISOString() : null,
    },
    inlineImages: mailContent.inlineImages, // 에디터 내 이미지 업로드 로직 확인 필요
    attachments: mailContent.attachments, // 파일 첨부 로직 확인 필요
  };
};
