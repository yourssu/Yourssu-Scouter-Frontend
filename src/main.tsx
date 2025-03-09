import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YDSWrapper } from '@yourssu/design-system-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from '@/App.tsx';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <YDSWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </YDSWrapper>
    </QueryClientProvider>
  </StrictMode>,
);
