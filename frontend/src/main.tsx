import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ReactFlowProvider } from '@xyflow/react';
import { ThemeProvider } from './components/ui/ThemeProvider.tsx';
import { BrowserRouter } from 'react-router';
import { MainRoutes } from './MainRoutes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ReactFlowProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </ReactFlowProvider>
    </ThemeProvider>
  </StrictMode>
);
