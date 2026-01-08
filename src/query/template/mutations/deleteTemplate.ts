import { api } from '@/apis/api.ts';

interface DeleteTemplateParams {
  templateId: number;
}

export const deleteTemplate = (params: DeleteTemplateParams) => {
  const { templateId } = params;
  return api.delete(`api/mails/templates/${templateId}`).json();
};
