import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const useViteHMRPolling = (env: Record<string, string>) => {
  if (env.VITE_USE_POLLING !== 'true') {
    return false;
  }
  // console orange color
  console.warn(
    '\x1b[33m[WARN] Vite HMR에 Polling을 사용하도록 변경했어요. CPU 사용에 유의해주세요.\x1b[0m',
  );
  return true;
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    server: {
      watch: {
        usePolling: useViteHMRPolling(env),
      },
    },
  };
});
