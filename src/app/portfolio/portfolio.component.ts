import {Component, NgModule, OnInit} from '@angular/core';
import {ManagementHttpService} from "../services/management-http.service";
import {environment} from "../../environments/environment";
import {RingChartComponent} from "../charts/ring-chart/ring-chart.component";
import {sum} from '@taiga-ui/cdk';
import {Stock} from "../kafka/kafka.component";
import {Utils} from "../Utils";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {

  constructor(public managementService: ManagementHttpService) { }
  positions = [];
  token: string = '';

  ngOnInit(): void {
    this.token = environment.token;
    this.getPortfolio();
  }
  filtersLoaded: Promise<boolean>;

  chartData:any = [];
  portfolioData: any = [];
  loaded: boolean = false;

  // table -----------------------------
  ELEMENT_DATA:any = [];
  PORTFOLIO_TABLE:any = [];
  displayedColumns: string[] = [ 'name', 'ticker', 'purchasePrice', 'priceUsd', 'sumUSD', 'cap', 'enterpriseValue',
    'priceToBook', 'priceToSalesTrailing12Months', 'trailingPE', 'dividendYield', 'recommendationMean'];
  // table -----------------------------

  // full-analytics-data

  FULL_ELEMENT_DATA: Stock[] = [];

  //--------------------

  value: number[] = [];
  labels: string[] = [];
  sum: number;

  getPortfolio() {

    this.managementService.requestTinkoffPortfolio(this.token).subscribe(res => {
      // debugger
      let i = 1;
      // @ts-ignore
      res.forEach(el => {

        // for chart
        let currentPrice = this.getCurrentPrice(el.averagePositionPrice, el.expectedYield, el.balance, el.currency, el.rate)
        let tmp = {
          name: el.name,
          value: el.balance * currentPrice
        }
        this.portfolioData.push(tmp);
        // for table
        let tableTmp = {
          name: el.name,
          ticker: el.ticker,
          purchasePrice: el.averagePositionPrice,
          priceUsd: currentPrice,
          sumUSD: (el.balance * currentPrice).toFixed(2),
          cap: el.marketCap == 0 ? Utils.replaceWithDash(el.marketCap) : Utils.convertToInternationalCurrencySystem(el.marketCap),
          enterpriseValue: el.enterpriseValue == 0 ? Utils.replaceWithDash(el.enterpriseValue) : Utils.convertToInternationalCurrencySystem(el.enterpriseValue),
          priceToBook: Utils.replaceWithDash(el.priceToBook),
          priceToSalesTrailing12Months: Utils.replaceWithDash(el.priceToSalesTrailing12Months),
          trailingPE: Utils.replaceWithDash(el.trailingPE),
          dividendYield: Utils.replaceWithDash(el.dividendYield),
          recommendationMean: Utils.replaceWithDash(el.recommendationMean),
        }
        this.PORTFOLIO_TABLE.push(tableTmp);
        this.value.push(Number((el.balance * currentPrice).toFixed(2)));
        this.labels.push(el.name);
        i++;
      })
      this.sum = this.getArrElementsSum(this.value);
      this.chartData = this.portfolioData;
      this.ELEMENT_DATA = this.PORTFOLIO_TABLE;
      this.loaded = true;
      this.filtersLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
    });
  }

  getCurrentPrice(purchasePrice, expectedYield, balance, currency, rate) {
    if (balance == 0) return '-';
    if (currency === 'RUB') return ((purchasePrice + expectedYield/balance) / rate).toFixed(2)
    return (purchasePrice + expectedYield/balance).toFixed(2);
  }

  getArrElementsSum(a: number[]) {
    let sum: number = 0;
    a.forEach(el => {
      sum += el;
    })
    return sum;
  }
}
