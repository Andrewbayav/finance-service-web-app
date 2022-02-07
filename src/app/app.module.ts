import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiNotificationsModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs';
import { TuiLegendItemModule, TuiRingChartModule } from "@taiga-ui/addon-charts";
import { TuiMoneyModule } from "@taiga-ui/addon-commerce";
import { RingChartComponent } from './charts/ring-chart/ring-chart.component';
import { CommonModule } from "@angular/common";
import { KafkaComponent } from './kafka/kafka.component';
import { MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { RealTimeComponent } from './real-time/real-time.component';
import { DictionaryComponent } from './dictionary/dictionary.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    RingChartComponent,
    KafkaComponent,
    RealTimeComponent,
    DictionaryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TuiLegendItemModule,
    TuiRingChartModule,
    TuiMoneyModule,
    TuiLegendItemModule,
    CommonModule,
    TuiMoneyModule
  ],
  providers: [ HttpClient, {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
