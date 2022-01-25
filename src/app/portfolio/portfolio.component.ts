import {Component, NgModule, OnInit} from '@angular/core';
import {ManagementHttpService} from "../services/management-http.service";
import {environment} from "../../environments/environment";
import {RingChartComponent} from "../charts/ring-chart/ring-chart.component";
import {sum} from '@taiga-ui/cdk';


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

  value: number[] = [];
  labels: string[] = [];
  sum: number;

  getPortfolio() {
    this.managementService.requestTinkoffPortfolio(this.token).subscribe(res => {
      debugger
      let i = 1;
      // @ts-ignore
      res.forEach(el => {
        if (el.instrumentType === 'Stock') {
          // for chart
          let tmp = {
            name: el.name,
            value: el.lots * this.getCurrentPrice(el.averagePositionPrice, el.expectedYield, el.lots)
          }
          this.portfolioData.push(tmp);
          // for table
          let tableTmp = {
            name: el.name,
            ticker: el.ticker,
            purchasePrice: el.averagePositionPrice,
            priceUsd: this.getCurrentPrice(el.averagePositionPrice, el.expectedYield, el.lots),
            sumUSD: (el.lots * this.getCurrentPrice(el.averagePositionPrice, el.expectedYield, el.lots)).toFixed(2),
            cap: el.marketCap == 0 ? this.replaceWithDash(el.marketCap) : this.convertToInternationalCurrencySystem(el.marketCap),
            enterpriseValue: el.enterpriseValue == 0 ? this.replaceWithDash(el.enterpriseValue) : this.convertToInternationalCurrencySystem(el.enterpriseValue),
            priceToBook: this.replaceWithDash(el.priceToBook),
            priceToSalesTrailing12Months: this.replaceWithDash(el.priceToSalesTrailing12Months),
            trailingPE: this.replaceWithDash(el.trailingPE),
            dividendYield: this.replaceWithDash(el.dividendYield),
            recommendationMean: this.replaceWithDash(el.recommendationMean),
          }
          this.PORTFOLIO_TABLE.push(tableTmp);
          this.value.push(Number((el.lots * this.getCurrentPrice(el.averagePositionPrice, el.expectedYield, el.lots)).toFixed(2)));
          this.labels.push(el.name);
          i++;
        }
      })
      this.sum = this.getArrElementsSum(this.value);
      this.chartData = this.portfolioData;
      this.ELEMENT_DATA = this.PORTFOLIO_TABLE;
      this.loaded = true;
      this.filtersLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
    });
  }

  getCurrentPrice(purchasePrice, expectedYield, lots) {
    return lots == 0 ? '-' : (purchasePrice + expectedYield/lots).toFixed(2);
  }

  replaceWithDash(number) {
    return number == 0 ? '-' : number;
  }

  getArrElementsSum(a: number[]) {
    let sum: number = 0;
    a.forEach(el => {
      sum += el;
    })
    return sum;
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  convertToInternationalCurrencySystem (labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
      // Six Zeroes for Millions
      : Math.abs(Number(labelValue)) >= 1.0e+6

        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3

          ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

          : Math.abs(Number(labelValue));

  }



}
