import { Component, OnInit } from '@angular/core';
import {ManagementHttpService} from "../services/management-http.service";

@Component({
  selector: 'app-market-analisys',
  templateUrl: './market-analisys.component.html',
  styleUrls: ['./market-analisys.component.css']
})
export class MarketAnalisysComponent implements OnInit {

  constructor(public managementService: ManagementHttpService) { }

  tickers: string;

  ngOnInit(): void {
  }

  getAnalysis(tickers) {
    this.managementService.requestQuickAnalysis(tickers).subscribe(res => {
      debugger
    })
  }

  onSubmit() {

  }
}
