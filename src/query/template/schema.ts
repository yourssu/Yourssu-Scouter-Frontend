import { z } from 'zod';

const VariableSchema = z.object({
  key: z.string(),
  type: z.enum(['PERSON', 'DATE', 'LINK', 'TEXT']).optional(),
  displayName: z.string(),
  perRecipient: z.boolean(),
});

const TemplateSchema = z.object({
  title: z.string(),
  bodyHtml: z.string(),
  variables: z.array(VariableSchema),
});

export const TemplateListSchema = z.object({
  content: z.array(TemplateSchema.omit({ bodyHtml: true, variables: true })),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export const PatchTemplateSchema = TemplateSchema.extend({
  id: z.number(),
  updatedAt: z.string(),
});

export type TemplateList = z.infer<typeof TemplateListSchema>;
export type Template = z.infer<typeof TemplateSchema>;
export type PatchTemplate = z.infer<typeof PatchTemplateSchema>;
