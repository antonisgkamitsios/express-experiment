import App from './App';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.hydrateRoot(
  root,
  <React.StrictMode>
    <BrowserRouter>
      <App path="" />
    </BrowserRouter>
  </React.StrictMode>
);
