import { nativeApi } from '@/apis/api';
import { API_CONFIG } from '@/constants/config';
import { GoogleLoginResponse, TokenResponse } from '@/types/auth.types';

import { tokenService } from './token.service';

export const authService = {
  googleLogin: async (code: string): Promise<GoogleLoginResponse> => {
    try {
      const response = await nativeApi
        .post('oauth2/login/google', {
          json: { authorizationCode: code },
          throwHttpErrors: false,
        })
        .json<GoogleLoginResponse>();

      if (!response) {
        throw new Error('Login failed');
      }

      tokenService.setTokens(response);
      return response;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  },

  initiateGoogleLogin: () => {
    const redirectUrl = `${API_CONFIG.BASE_URL}/oauth2/google?redirect_uri=${API_CONFIG.GOOGLE_REDIRECT_URI}`;
    window.location.href = redirectUrl;
  },

  // AccessToken 유효성 검사 api가 있긴 한데 401 감지해서 토큰 재발급 하는게 더 낫다고 생각해서 안씁니다
  // validateToken: async (
  //   accessToken: string
  // ): Promise<ValidateTokenResponse> => {
  //   return api
  //     .get("validate-token", {
  //       headers: { Authorization: `${accessToken}` },
  //     })
  //     .json<ValidateTokenResponse>();
  // },

  refreshToken: async (refreshToken: string): Promise<TokenResponse> => {
    const response = await nativeApi
      .post('refresh-token', {
        json: { refreshToken: `${refreshToken}` },
      })
      .json<TokenResponse>();

    tokenService.setTokens(response);
    return response;
  },

  logout: async () => {
    try {
      await nativeApi.post('logout', {
        json: { refreshToken: `${tokenService.getAccessToken()}` },
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      tokenService.clearTokens();
      window.location.href = '/';
    }
  },
};
