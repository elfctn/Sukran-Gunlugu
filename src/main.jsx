import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Provider'ı import et
import { myStore } from './store/store'; // Store'u import et

import './index.css'; // CSS dosyasını import et

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={myStore}>
    {' '}
    {/* Uygulamayı Provider ile sar */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
