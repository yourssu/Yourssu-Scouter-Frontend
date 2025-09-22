import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider, YDSThemeProvider } from '@yourssu/design-system-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from '@/App.tsx';

import './styles/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <YDSThemeProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </YDSThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
