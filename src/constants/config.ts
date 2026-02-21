const IS_DEV = import.meta.env.DEV;
export const STAGE: 'dev' | 'prod' = IS_DEV ? 'dev' : import.meta.env.VITE_STAGE || 'dev';

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  GOOGLE_REDIRECT_URI: `${window.location.origin}/oauth/callback/google`,
  s3BaseURL: import.meta.env.VITE_S3_BASE_URL,
};
