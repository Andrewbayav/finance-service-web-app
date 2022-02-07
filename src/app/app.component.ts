import { Component } from '@angular/core';
import Stock from "./Stock";
import DictionaryEntry from "./Dictionary";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  FULL_ELEMENT_DATA: Stock[] = [];
  MARKET_ANALYSIS_DATA: Stock[] = [];
  DICTIONARY: DictionaryEntry[] = [];
  ELEMENT_DATA:any = [];
  chartData:any = [];
  portfolioData: any = [];
  loaded: boolean = false;
  date = null;
  value: number[] = [];
  labels: string[] = [];
  sum: number;

  displayedColumns: string[] = [ 'ticker', 'name', 'cap', 'enterpriseValue',
    'priceToBook', 'priceToSalesTrailing12Months', 'trailingPE', 'dividendYield', 'recommendationMean'];

  dictionaryColumns: string[] = [ 'tcsTicker', 'yahooTicker', 'name'];
}
