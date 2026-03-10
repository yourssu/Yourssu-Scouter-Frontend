import { z } from 'zod';

const MailStateType = ['SCHEDULED', 'SENT', 'PENDING_SEND'] as const;

const BaseMailItemSchema = z.object({
  mailId: z.number(),
  reservationId: z.number(),
  reservationTime: z.string(),
  status: z.enum(MailStateType),
  mailSubject: z.string(),
  senderEmailAddress: z.string().email(),
  primaryReceiverEmailAddress: z.string(),
  hasAttachments: z.boolean(),
});

// 목록 조회
export const MailItemSchema = BaseMailItemSchema;

// 단일 메일 조회
export const MailDetailSchema = z.object({
  mailId: z.number(),
  reservationId: z.number(),
  reservationTime: z.string(),
  status: z.enum(MailStateType),
  mailSubject: z.string(),
  senderEmailAddress: z.string().email(),
  mailBody: z.string(),
  bodyFormat: z.string(),
  receiverEmailAddresses: z.array(z.string()),
  ccEmailAddresses: z.array(z.string()),
  bccEmailAddresses: z.array(z.string()),
  hasAttachments: z.boolean(),
});

export const MailListSchema = z.object({
  items: z.array(BaseMailItemSchema),
});

export type MailItem = z.infer<typeof MailItemSchema>;
export type MailDetail = z.infer<typeof MailDetailSchema>;
export type MailList = z.infer<typeof MailListSchema>;
