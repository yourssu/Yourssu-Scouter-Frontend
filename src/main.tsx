import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { YDSWrapper } from "@yourssu/design-system-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <YDSWrapper>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<App />}></Route>
              </Routes>
          </BrowserRouter>
      </YDSWrapper>
    </QueryClientProvider>
  </StrictMode>
);
