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
  displayedColumns: string[] = [ 'name', 'ticker', 'purchasePrice', 'priceUsd', 'sumUSD',
  'cap', 'enterpriseValue', 'priceToBook', 'priceToSalesTrailing12Months', 'trailingPE',
  'forwardPE', 'enterpriseToEbitda', 'dividendYield', 'recommendationMean'];
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
        // for chart
        let tmp = {name: el.name, value: el.sumUSD}
        this.portfolioData.push(tmp);
        // for table
        let tableTmp = {
          position: i,
          name: el.name,
          ticker: el.ticker,
          purchasePrice: el.purchasePrice.toFixed(2),
          priceUsd: el.priceUsd.toFixed(2),
          sumUsd: el.sumUsd.toFixed(2),
          cap: this.numberWithCommas(el.marketCap),
          enterpriseValue: this.numberWithCommas(el.enterpriseValue),
          priceToBook: el.priceToBook.toFixed(2),
          priceToSalesTrailing12Months: el.priceToSalesTrailing12Months.toFixed(2),
          trailingPE: el.trailingPE.toFixed(2),
          forwardPE: el.forwardPE.toFixed(2),
          enterpriseToEbitda: el.enterpriseToEbitda.toFixed(2),
          dividendYield: el.dividendYield.toFixed(2),
          recommendationMean: el.recommendationMean
        }
        this.PORTFOLIO_TABLE.push(tableTmp);
        this.value.push(el.sumRUB);
        this.labels.push(el.name);
        i++;
      })
      this.sum = this.getArrElementsSum(this.value);
      this.chartData = this.portfolioData;
      this.ELEMENT_DATA = this.PORTFOLIO_TABLE;
      this.loaded = true;
      this.filtersLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
    });
    debugger
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



}
