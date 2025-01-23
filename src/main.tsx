import { YDSWrapper } from "@yourssu/design-system-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <YDSWrapper>
      <App />
    </YDSWrapper>
  </StrictMode>
);
