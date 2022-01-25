import {Component, Input, OnInit} from '@angular/core';
import {sum} from '@taiga-ui/cdk';
import { TuiLegendItemModule, TuiRingChartModule } from "@taiga-ui/addon-charts";


@Component({
  selector: 'app-ring-chart',
  templateUrl: './ring-chart.component.html',
  styleUrls: ['./ring-chart.component.css']
})
export class RingChartComponent implements OnInit {
  @Input() value:number[];
  @Input() labels:string[];
  @Input() sum:number;

  constructor() { }

  ngOnInit(): void {
  }

  // taiga ------------------------------
  activeItemIndex: any;

  // sum = this.sumOfArr(this["value"]);

  public sumOfArr(a:number[]) {
    debugger
    console.log(a)
    return 1000;
  }

  isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  onHover(index: number, hovered) {
    this.activeItemIndex = hovered ? index : null;
  }

  getColor(index: number): string {
    return `var(--tui-chart-${index})`;
  }
  // taiga ------------------------------

}
