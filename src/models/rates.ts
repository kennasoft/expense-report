export interface RatesData {
  base?: string;
  date?: string;
  rates: {
    [key: string]: number;
  };
}
