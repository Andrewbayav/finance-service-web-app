import { Component, OnInit } from '@angular/core';
import {ManagementHttpService} from "../services/management-http.service";
import {environment} from "../../environments/environment";

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

  chartData:any = [];
  portfolioData: any = [];
  loaded: boolean = false;

  ELEMENT_DATA:any = [];
  PORTFOLIO_TABLE:any = [];
  displayedColumns: string[] = ['position', 'name', 'ticker', 'purchasePrice', 'priceUsd', 'sumUSD'];

  getPortfolio() {
    this.managementService.requestTinkoffPortfolio(this.token).subscribe(res => {
      let i = 1;
      // @ts-ignore
      res.forEach(el => {
        // for chart
        let tmp = {name: el.name, value: el.sumUSD}
        this.portfolioData.push(tmp);
        // for table
        let tableTmp = {position: i, name: el.name, ticker: el.ticker, purchasePrice: el.purchasePrice.toFixed(2), priceUsd: el.priceNowUSD.toFixed(2), sumUSD: el.sumUSD.toFixed(2)}
        debugger
        this.PORTFOLIO_TABLE.push(tableTmp);
        i++;
      })
      this.chartData = this.portfolioData;
      this.ELEMENT_DATA = this.PORTFOLIO_TABLE;
      this.loaded = true;
    });
  }

}
