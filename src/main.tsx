import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App.tsx';
import './assets/styles/antd.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
