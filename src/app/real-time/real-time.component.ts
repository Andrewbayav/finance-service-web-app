import {Component, Input, OnInit} from '@angular/core';
import Stock from "../Stock";
import {MatTableDataSource} from "@angular/material/table";
import {ManagementHttpService} from "../services/management-http.service";
import {Utils} from "../Utils";

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit {

  @Input() MARKET_ANALYSIS_DATA: Stock[];
  @Input() displayedColumns: any[];
  dataSource = new MatTableDataSource(this["MARKET_ANALYSIS_DATA"]);

  tickers_in_table: string = '';

  constructor(public managementService: ManagementHttpService) { }
  ngOnInit(): void {
  }

  clear(){
    this.MARKET_ANALYSIS_DATA = [];
    this.tickers_in_table = '';
    this.refreshTable();
  }

  getAnalysis(tickers) {
    this.managementService.requestQuickAnalysis(tickers).subscribe(res => {
      debugger
      // @ts-ignore
      res.forEach(tmp => {
        if (!this.tickers_in_table.includes(tmp.ticker)) {
          let tmpStock = {
            ticker: tmp.ticker,
            name: tmp.name,
            recommendationMean: tmp.recommendationMean,
            returnOnEquity: tmp.returnOnEquity,
            priceToBook: Utils.replaceWithDash(tmp.priceToBook),
            enterpriseValue: Utils.convertToInternationalCurrencySystem(tmp.enterpriseValue),
            dividendYield: Utils.replaceWithDash(tmp.dividendYield),
            trailingPE: Utils.replaceWithDash(tmp.trailingPE),
            priceToSalesTrailing12Months: Utils.replaceWithDash(tmp.priceToSalesTrailing12Months),
            marketCap: tmp.marketCap == 0 ? Utils.replaceWithDash(tmp.marketCap) : Utils.convertToInternationalCurrencySystem(tmp.marketCap),
          };
          debugger
          this.tickers_in_table += tmp.ticker;
          this.MARKET_ANALYSIS_DATA.push(tmpStock);
          this.MARKET_ANALYSIS_DATA.sort((a,b) => b.recommendationMean - a.recommendationMean);
          this.refreshTable();
        }
      });
    })
  }

  onSubmit() {

  }

  private refreshTable() {
    this.dataSource = new MatTableDataSource(this.MARKET_ANALYSIS_DATA);
  }

}
