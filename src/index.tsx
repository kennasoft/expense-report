import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReceiptsProvider } from './contexts/receipts-context';
import { ReportProvider } from './contexts/report-context';

ReactDOM.render(
  <React.StrictMode>
    <ReceiptsProvider>
      <ReportProvider>
        <App />
      </ReportProvider>
    </ReceiptsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
