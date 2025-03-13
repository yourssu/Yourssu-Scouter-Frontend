export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  GOOGLE_REDIRECT_URI: `${window.location.origin}/oauth/callback/google`,
  GOOGLE_OAUTH_URI: import.meta.env.VITE_API_GOOGLE_OAUTH_URI,
  GOOGLE_OAUTH_LOGIN_URI: import.meta.env.VITE_API_GOOGLE_OAUTH_LOGIN_URI,
};
