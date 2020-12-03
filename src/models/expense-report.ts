import { Receipt } from "./receipt";
export interface ExpenseReport {
  company: {
    name: string;
    baseCurrency: string;
  };
  receipts: Receipt[];
}
