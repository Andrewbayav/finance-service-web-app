import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Stomp} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Utils} from "../Utils";

export interface Stock {
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

@Component({
  selector: 'app-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.css']
})

export class KafkaComponent implements OnInit {
  @Input() ELEMENT_DATA: Stock[];

  displayedColumns: string[] = [ 'ticker', 'cap', 'enterpriseValue',
    'priceToBook', 'priceToSalesTrailing12Months', 'trailingPE', 'dividendYield', 'recommendationMean'];
  dataSource = new MatTableDataSource(this["ELEMENT_DATA"]);

  url = 'http://localhost:8080/websocket'
  client: any;
  // private ELEMENT_DATA: any[];

  ngOnInit() {
  }

  constructor(private changeDetectorRefs: ChangeDetectorRef){
    this.connection();
  }

  refreshTable() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  connection(){
    let ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    let that = this;


    this.client.connect({}, function(frame) {
      that.client.subscribe("/topic/angular", (message) => {
        if(message.body) {
          console.log(message.body);
          let tmp = JSON.parse(message.body);
          if (tmp.ticker != '-') {

            let tmpStock = {
              ticker: tmp.ticker,
              recommendationMean: tmp.recommendationMean,
              returnOnEquity: tmp.returnOnEquity,
              priceToBook: Utils.replaceWithDash(tmp.priceToBook),
              enterpriseValue: Utils.convertToInternationalCurrencySystem(tmp.enterpriseValue),
              dividendYield: Utils.replaceWithDash(tmp.dividendYield),
              trailingPE: Utils.replaceWithDash(tmp.trailingPE),
              priceToSalesTrailing12Months: Utils.replaceWithDash(tmp.priceToSalesTrailing12Months),
              marketCap: tmp.marketCap == 0 ? Utils.replaceWithDash(tmp.marketCap) : Utils.convertToInternationalCurrencySystem(tmp.marketCap),
            };
            that.ELEMENT_DATA.push(tmpStock);
            that.ELEMENT_DATA.sort((a,b) => b.recommendationMean - a.recommendationMean);
            that.refreshTable();
          }

        }
      });
    });
  }
}
