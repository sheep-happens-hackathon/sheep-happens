import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactFlowProvider } from "@xyflow/react";
import { ThemeProvider } from "./components/ui/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </ThemeProvider>
  </StrictMode>
);
