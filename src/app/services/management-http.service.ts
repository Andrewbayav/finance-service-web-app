import { Injectable } from '@angular/core';
import {TinkoffPortfolioResponse} from "./responses";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManagementHttpService {

  constructor(public httpClient: HttpClient) { }

  requestTinkoffPortfolio(token: string): Observable<TinkoffPortfolioResponse> {
    return this.httpClient.post<TinkoffPortfolioResponse>('http://localhost:8080/tinkoff/portfolio', { token });
  }

}
