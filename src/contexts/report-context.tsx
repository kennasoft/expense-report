import React, { PropsWithChildren, ReactNode, useContext, useEffect, useState } from 'react';
import { ReceiptsContext } from './receipts-context';
import { ExpenseReport } from '../models/expense-report';
import useFetch from '../hooks/use-fetch';
import { RatesData } from '../models/rates';

export interface TReportContext {
  currencies: string[];
  report: ExpenseReport;
  setReport: (value: ExpenseReport) => void;
  exchangeRates: { [key: string]: number };
  loading: boolean;
}


export const ratesApiUrl = "https://api.exchangeratesapi.io/latest";

const defaultState: ExpenseReport = { company: { name: 'Paytm Labs', baseCurrency: 'CAD' }, receipts: [] };
const context: TReportContext = {
  currencies: [],
  report: defaultState,
  setReport: (value: ExpenseReport) => { },
  exchangeRates: {},
  loading: false
}

export const ReportContext = React.createContext<TReportContext>(context);

export const ReportProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const { receipts } = useContext(ReceiptsContext);
  const [report, setReport] = useState<ExpenseReport>({ ...defaultState, receipts, });
  const [currencies, setCurrencies] = useState<string[]>([]);
  const { status, data, error } = useFetch<RatesData>(`${ratesApiUrl}?base=${report.company.baseCurrency}`);
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setCurrencies(Object.keys(data.rates));
      setExchangeRates(data.rates);
    }
    if (status === 'fetching') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, data, error, report.company.baseCurrency]);

  return (
    <ReportContext.Provider value={{ report, setReport, currencies, exchangeRates, loading }}>
      {children}
    </ReportContext.Provider>
  )
}
