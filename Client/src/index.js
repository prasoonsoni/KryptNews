import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {NewsProvider }from './context/NewsContext'
ReactDOM.render(
  <NewsProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </NewsProvider>,
  document.getElementById('root')
);

