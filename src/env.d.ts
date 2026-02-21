interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_S3_BASE_URL: string;
  readonly VITE_STAGE: 'dev' | 'prod';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
