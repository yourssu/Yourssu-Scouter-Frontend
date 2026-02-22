import { api } from '@/apis/api.ts';

export interface MailFilePresignRequest {
  files: {
    contentType: string;
    fileName: string;
    usage: 'ATTACHMENT' | 'INLINE';
  }[];
}

export interface MailFilePresignResponse {
  uploads: {
    contentType: string;
    expiresAt: string;
    putUrl: string;
    s3Key: string;
  }[];
}

export const postMailFilePresign = (data: MailFilePresignRequest) => {
  return api
    .post('api/mails/files/presign', {
      json: data,
    })
    .json<MailFilePresignResponse>();
};
