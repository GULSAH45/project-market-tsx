import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spline from '@splinetool/react-spline/next';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
