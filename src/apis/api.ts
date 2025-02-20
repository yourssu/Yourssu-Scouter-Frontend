import { API_CONFIG } from "@/constants/config";
import ky, { type BeforeRetryHook, HTTPError } from "ky";
import { authService } from "./auth.service";
import { tokenService } from "./token.service";

const DEFAULT_API_RETRY_LIMIT = 2;

const stopWithLogout = (): typeof ky.stop => {
  authService.logout();
  return ky.stop;
};

const handleTokenRefresh: BeforeRetryHook = async ({ error }) => {
  const httpError = error as HTTPError;

  if (httpError.response.status !== 401) {
    return ky.stop;
  }

  const refreshToken = tokenService.getRefreshToken();
  if (!refreshToken) {
    return stopWithLogout();
  }

  try {
    await authService.refreshToken(refreshToken);
  } catch (error) {
    console.error("Token refresh 실패, 로그아웃", error);
    return stopWithLogout();
  }
};
const setAuthHeader = (request: Request) => {
  const accessToken = tokenService.getAccessToken();
  if (accessToken) {
    request.headers.set("Authorization", `${accessToken}`);
  }
};

export const api = ky.create({
  prefixUrl: API_CONFIG.BASE_URL,
  retry: {
    limit: DEFAULT_API_RETRY_LIMIT,
  },
  hooks: {
    beforeRequest: [setAuthHeader],
    beforeRetry: [handleTokenRefresh],
  },
});
