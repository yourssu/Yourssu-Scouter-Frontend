interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USE_POLLING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
