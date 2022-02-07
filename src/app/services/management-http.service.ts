import { Injectable } from '@angular/core';
import {DictionaryResponse, TickersResponse, TinkoffPortfolioResponse} from "./responses";
import {Observable} from "rxjs";
import {HttpClient, HttpStatusCode} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManagementHttpService {

  constructor(public httpClient: HttpClient) { }

  requestTinkoffPortfolio(token: string, refresh: boolean): Observable<TinkoffPortfolioResponse> {
    return this.httpClient.post<TinkoffPortfolioResponse>('http://localhost:8080/tinkoff/portfolio', { token, refresh });
  }

  requestKafkaStream(recommendations: string): Observable<HttpStatusCode> {
    return this.httpClient.get<HttpStatusCode>('http://localhost:8080/kafka/start' + '?recommendations=' + recommendations);
  }

  stopKafkaStream(): Observable<HttpStatusCode> {
    return this.httpClient.get<HttpStatusCode>('http://localhost:8080/kafka/stop');
  }

  requestQuickAnalysis(tickers: string): Observable<TickersResponse> {
    return this.httpClient.get<TickersResponse>('http://localhost:8080/tinkoff/ticker' + '?tickers=' + tickers);
  }

  requestDictionary() {
    return this.httpClient.get<DictionaryResponse>('http://localhost:8080/dictionary/list');
  }
}
