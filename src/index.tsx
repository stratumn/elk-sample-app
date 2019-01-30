import apm from './apm';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

console.info(`APM agent enabled: ${apm.isEnabled()}`);

Modal.setAppElement('#root');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
