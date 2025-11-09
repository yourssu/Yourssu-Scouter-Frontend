import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';

import { API_CONFIG } from '@/constants/config';

import { authService } from './auth.service';
import { tokenService } from './token.service';

const DEFAULT_API_RETRY_LIMIT = 2;

const handleTokenRefresh: AfterResponseHook = async (request, _options, response) => {
  if (response.status !== 401 && response.status !== 400) {
    return response;
  }

  const errorResponse = await response.json().catch(() => null);
  const errorCode = (errorResponse as { errorCode?: string })?.errorCode;

  if (errorCode === 'Auth-004' || errorCode === 'OAuth-Token-Refresh-Fail') {
    authService.logout();
    authService.initiateGoogleLogin();
    return response;
  }

  const refreshToken = tokenService.getRefreshToken();
  if (!refreshToken) {
    authService.initiateGoogleLogin();
    return response;
  }

  try {
    await authService.refreshToken(refreshToken);
    const newAccessToken = tokenService.getAccessToken();
    request.headers.set('Authorization', `${newAccessToken}`);
    return ky(request);
  } catch (error) {
    authService.logout();
    authService.initiateGoogleLogin();
    throw error;
  }
};

const setAuthHeader: BeforeRequestHook = (request) => {
  const accessToken = tokenService.getAccessToken();
  const tokenType = tokenService.getTokenType();
  if (accessToken) {
    request.headers.set('Authorization', `${tokenType} ${accessToken}`);
    request.headers.set('Content-Type', 'application/json');
  }
};

/*
  API 토큰이 필요없는 상황에서 사용해요.
*/
export const nativeApi = ky.create({
  prefixUrl: API_CONFIG.BASE_URL,
  retry: {
    limit: DEFAULT_API_RETRY_LIMIT,
  },
});

export const api = nativeApi.extend({
  hooks: {
    beforeRequest: [setAuthHeader],
    afterResponse: [handleTokenRefresh],
  },
});
