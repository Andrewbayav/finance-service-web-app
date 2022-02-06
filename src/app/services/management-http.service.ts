import { Injectable } from '@angular/core';
import {TickersResponse, TinkoffPortfolioResponse} from "./responses";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManagementHttpService {

  constructor(public httpClient: HttpClient) { }

  requestTinkoffPortfolio(token: string): Observable<TinkoffPortfolioResponse> {
    let refresh = false;
    return this.httpClient.post<TinkoffPortfolioResponse>('http://localhost:8080/tinkoff/portfolio', { token, refresh });
  }

  requestQuickAnalysis(tickers: string): Observable<TickersResponse> {
    return this.httpClient.get<TickersResponse>('http://localhost:8080/tinkoff/market-analyzer' + '?tickers=' + tickers);
  }

  // TODO: Пока не понятно, оставлять это как отдельный сервис или нет
  requestMarketDictionary(token: string): Observable<TinkoffPortfolioResponse> {
    let refresh = false;
    return this.httpClient.post<TinkoffPortfolioResponse>('http://localhost:8080/tinkoff/stocks-dictionary', { token, refresh });
  }

}
