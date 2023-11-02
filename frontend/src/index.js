import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import './i18n';
import { LoadingPage } from './Components/LoadingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<LoadingPage/>}>
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>
);