import { api } from '@/apis/api.ts';

export interface CreateMailTemplateRequest {
  attachmentReferences: {
    fileId: number;
  }[];
  bodyHtml: string;
  inlineImageReferences: {
    contentId: string;
    fileId: number;
  }[];
  title: string;
  variables: {
    displayName: string;
    key: string;
    perRecipient: boolean;
    type: 'APPLICANT' | 'DATE' | 'LINK' | 'PARTNAME' | 'PERSON' | 'TEXT';
  }[];
}

export interface CreateMailTemplateResponse {
  id: number;
  title: string;
  updatedAt: string;
}

export const postMailTemplate = (data: CreateMailTemplateRequest) => {
  return api
    .post('api/mails/templates', {
      json: data,
    })
    .json<CreateMailTemplateResponse>();
};
