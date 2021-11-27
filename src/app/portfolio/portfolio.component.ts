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

  getPortfolio() {
    this.managementService.requestTinkoffPortfolio(this.token).subscribe(res => {
      // @ts-ignore
      res.forEach(el => {
        let tmp = {name: el.name, value: el.sumUSD}
        this.portfolioData.push(tmp);
      })
      this.chartData = this.portfolioData;
      this.loaded = true;
    });
  }
}
