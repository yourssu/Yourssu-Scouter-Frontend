import { API_CONFIG } from "@/constants/config";
import ky, { type BeforeRetryHook, HTTPError } from "ky";
import { authService } from "./auth.service";
import { tokenService } from "./token.service";

const DEFAULT_API_RETRY_LIMIT = 2;

const handleTokenRefresh: BeforeRetryHook = async ({ error, retryCount }) => {
  const httpError = error as HTTPError;

  if (httpError.response.status !== 401) {
    return ky.stop;
  }

  if (retryCount === DEFAULT_API_RETRY_LIMIT - 1) {
    authService.logout();
    return ky.stop;
  }

  try {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) {
      throw new Error("refresh Token이 없음");
    }
    await authService.refreshToken(refreshToken);
  } catch (error) {
    console.error("Token refresh 실패, 로그아웃", error);
    authService.logout();
    return ky.stop;
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
