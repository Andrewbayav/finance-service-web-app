import {Component, Input, NgModule, OnInit} from '@angular/core';
import {ManagementHttpService} from "../services/management-http.service";
import {environment} from "../../environments/environment";
import {Utils} from "../Utils";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {
  @Input() ELEMENT_DATA:any = [];
  @Input() chartData:any = [];
  @Input() portfolioData: any = [];
  @Input() loaded: boolean = false;
  @Input() date = null;
  @Input() value: number[] = [];
  @Input() labels: string[] = [];
  @Input() sum: number;

  constructor(public managementService: ManagementHttpService) { }
  ngOnInit(): void {
    this.token = environment.token;
    this.getPortfolio(false);
  }

  positions = [];
  token: string = '';
  filtersLoaded: Promise<boolean>;
  displayedColumns: string[] = [ 'name', 'ticker', 'purchasePrice', 'priceUsd', 'sumUSD', 'cap', 'enterpriseValue',
    'priceToBook', 'priceToSalesTrailing12Months', 'trailingPE', 'dividendYield', 'recommendationMean'];
  dataSource = new MatTableDataSource(this["ELEMENT_DATA"]);


  getPortfolio(refresh: boolean) {
    if (refresh) this.clearDataSource();

    this.managementService.requestTinkoffPortfolio(this.token, refresh).subscribe(res => {
      // @ts-ignore
      res.forEach(el => {
        if (this.date === null) this.date = el.timestamp;
        // for chart
        let currentPrice = Utils.getCurrentPrice(el.averagePositionPrice, el.expectedYield, el.balance, el.currency, el.rate)
        let tmp = { name: el.name, value: el.balance * currentPrice}
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
        this.ELEMENT_DATA.push(tableTmp);
        this.value.push(Number((el.balance * currentPrice).toFixed(2)));
        this.labels.push(el.name);
      })
      this.sum = Utils.getArrElementsSum(this.value);
      this.chartData = this.portfolioData;
      this.loaded = true;
      this.filtersLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
      this.refreshTable();
    });
  }

  refreshTable() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  clearDataSource() {
    this.chartData = [];
    this.ELEMENT_DATA = [];
    this.sum = 0;
    this.value = [];
    this.labels = [];
    this.loaded = false;
    this.date = null;
  }
}
