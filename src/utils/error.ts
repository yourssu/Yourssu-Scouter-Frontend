export const AUTH_ERROR_MAP = {
  RECONSENT_REQUIRED: 'GOOGLE_OAUTH_RECONSENT_REQUIRED',
  AUTH_004: 'Auth-004',
  REFRESH_FAIL: 'OAuth-Token-Refresh-Fail',
} as const;

export const AUTH_ERROR_STATUS_CODES = Object.values(AUTH_ERROR_MAP);
export type AuthErrorCodes = (typeof AUTH_ERROR_STATUS_CODES)[number];

export class ReconsentError extends Error {
  constructor() {
    super(AUTH_ERROR_MAP.RECONSENT_REQUIRED);
    this.name = 'ReconsentError';
  }
}
