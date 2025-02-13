import { API_CONFIG } from "@/constants/config";
import { api } from "./api";

export interface GoogleLoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async googleLogin(code: string): Promise<GoogleLoginResponse> {
    try {
      const response = await api
        .post("oauth2/login/google", {
          json: {
            authorizationCode: code,
          },
          throwHttpErrors: false,
        })
        .json<GoogleLoginResponse>();

      if (!response) {
        throw new Error("Login failed");
      }

      return response;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  },

  initiateGoogleLogin() {
    const redirectUrl = `${API_CONFIG.BASE_URL}/oauth2/google?redirect_uri=${API_CONFIG.GOOGLE_REDIRECT_URI}`;
    window.location.href = redirectUrl;
  },
};
