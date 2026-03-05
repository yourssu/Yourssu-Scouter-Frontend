import { api } from '@/apis/api.ts';

export interface MailFileConfirmRequest {
  files: {
    cid?: string;
    contentType: string;
    fileName: string;
    s3Key: string;
    usage: 'ATTACHMENT' | 'INLINE';
  }[];
}

export interface MailFileConfirmResponse {
  files: {
    contentType: string;
    createdAt: string;
    fileId: number;
    fileName: string;
    s3Key: string;
    usage: 'ATTACHMENT' | 'INLINE';
    used: boolean;
  }[];
}

export const postMailFileConfirm = (data: MailFileConfirmRequest) => {
  return api
    .post('api/mails/files/confirm', {
      json: data,
    })
    .json<MailFileConfirmResponse>();
};
