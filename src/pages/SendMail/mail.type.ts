export const HEADER_TYPES = ['normal', 'tabs'] as const;
export type HeaderType = (typeof HEADER_TYPES)[number];
export type EditorType = (typeof HEADER_TYPES)[number];

export const RECIPIENT_IDS = ['recipient-0', 'recipient-1', 'recipient-2'] as const;

export type RecipientId = (typeof RECIPIENT_IDS)[number];

export interface Recipient {
  id: RecipientId;
  name: string;
}
