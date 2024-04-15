import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CtxProvider } from './hooks/context/useCtx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <CtxProvider>
      <App />
    </CtxProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
