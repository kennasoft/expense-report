import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { Receipt } from '../models/receipt';

export interface TReceiptsContext {
  receipts: Receipt[],
  setReceipts?: (receipts: Receipt[]) => {},
  updateReceipts?: (index: number) => (value: Partial<Receipt>) => {},
  deleteReceipt?: (index: number) => () => {}
}

const defaultState: Receipt[] = [{ amount: 0, description: "", currency: "CAD" }];

export const ReceiptsContext = React.createContext({
  receipts: defaultState,
  setReceipts: (receipts: Receipt[]) => { },
  updateReceipts: (index: number) => (value: Partial<Receipt>) => { },
  deleteReceipt: (index: number) => () => { }
});

export const ReceiptsProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [receipts, setReceipts] = useState<Receipt[]>(defaultState);

  const updateReceipts = (index: number) => (value: Partial<Receipt>) => {
    const receiptsClone = receipts.slice();
    const receipt = receiptsClone[index];
    receiptsClone[index] = { ...receipt, ...value };
    setReceipts(receiptsClone);
  }

  const deleteReceipt = (index: number) => () => {
    setReceipts(receipts.filter((_, i) => i !== index));
  }

  return (
    <ReceiptsContext.Provider value={{ receipts, setReceipts, updateReceipts, deleteReceipt }}>
      {children}
    </ReceiptsContext.Provider>
  )
}
