export const tokenService = {
  getAccessToken: () => localStorage.getItem("accessToken"),

  getRefreshToken: () => localStorage.getItem("refreshToken"),

  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },

  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  hasTokens: () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return !!(accessToken && refreshToken);
  },
};
