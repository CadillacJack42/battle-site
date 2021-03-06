import reportWebVitals from './reportWebVitals';
import { render } from 'react-dom';
import Truth from './routes/Truth';
import React from 'react';
import './index.css';

const rootElement = document.getElementById('root');

const renderApp = () => {
  return render(
    <React.StrictMode>
      <Truth />
    </React.StrictMode>,
    rootElement
  );
};
renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
