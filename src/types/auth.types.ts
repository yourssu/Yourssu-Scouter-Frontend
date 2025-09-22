export type AuthTokenType = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};

export type TokenResponse = AuthTokenType;
export type GoogleLoginResponse = AuthTokenType;
