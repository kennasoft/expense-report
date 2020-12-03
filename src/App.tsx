import React, { useContext } from 'react';
// import './App.css';
import ReportView from './components/ReportView';
import { ReceiptsContext } from './contexts/receipts-context';
import { ReportContext } from './contexts/report-context';

function App() {
  const { report, exchangeRates } = useContext(ReportContext);
  const { receipts, setReceipts, updateReceipts, deleteReceipt } = useContext(ReceiptsContext);

  return (
    <ReportView
      company={report.company}
      receipts={receipts}
      setReceipts={setReceipts}
      updateReceipts={updateReceipts}
      deleteReceipt={deleteReceipt}
      exchangeRates={exchangeRates}
    />
  );
}

export default App;
