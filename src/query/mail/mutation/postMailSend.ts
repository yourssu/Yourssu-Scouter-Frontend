import { api } from '@/apis/api';

export interface PostMailSendParams {
  attachmentReferences: {
    fileId: number;
  }[];
  bodyFormat: 'HTML' | 'PLAIN_TEXT';
  mailBody: string;
  mailSubject: string;
  receiverEmailAddresses: string[];
}

export const postMailSend = (data: PostMailSendParams) => {
  return api
    .post('api/mails/send', {
      json: data,
    })
    .json<void>();
};
