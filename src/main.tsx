import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MeterApp from './meter/MeterApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeterApp />
  </StrictMode>
);
