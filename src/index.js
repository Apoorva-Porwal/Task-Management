import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter basename="/Task-Management">
      <App />
      </BrowserRouter> */}
      <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
// reportWebVitals();
