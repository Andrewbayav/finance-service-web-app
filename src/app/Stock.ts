export default interface Stock {
  ticker: string;
  recommendationMean: number;
  returnOnEquity: number;
  priceToBook: number;
  enterpriseValue: any;
  dividendYield: number;
  trailingPE: number;
  priceToSalesTrailing12Months: number;
  marketCap: any;
}
