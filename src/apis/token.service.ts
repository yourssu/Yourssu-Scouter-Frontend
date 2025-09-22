import { AuthTokenType } from '@/types/auth.types';

const accessTokenKey = 'accessToken';
const refreshTokenKey = 'refreshToken';
const tokenTypeKey = 'tokenType';

export const tokenService = {
  getAccessToken: () => localStorage.getItem(accessTokenKey),

  getRefreshToken: () => localStorage.getItem(refreshTokenKey),

  getTokenType: () => localStorage.getItem(tokenTypeKey),

  setTokens: ({ accessToken, refreshToken, tokenType }: AuthTokenType) => {
    localStorage.setItem(accessTokenKey, accessToken);
    localStorage.setItem(refreshTokenKey, refreshToken);
    localStorage.setItem(tokenTypeKey, tokenType);
  },

  clearTokens: () => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem(tokenTypeKey);
  },

  hasTokens: () => {
    const accessToken = tokenService.getAccessToken();
    const refreshToken = tokenService.getRefreshToken();
    const tokenType = tokenService.getTokenType();
    return !!(accessToken && refreshToken && tokenType);
  },
};
