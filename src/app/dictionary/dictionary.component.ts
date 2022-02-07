import {Component, Input, OnInit} from '@angular/core';
import Stock from "../Stock";
import {MatTableDataSource} from "@angular/material/table";
import DictionaryEntry from "../Dictionary";
import {ManagementHttpService} from "../services/management-http.service";
import {Utils} from "../Utils";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  @Input() DICTIONARY: DictionaryEntry[];
  @Input() dictionaryColumns: any[];
  dataSource = new MatTableDataSource(this["DICTIONARY"]);

  constructor(public managementService: ManagementHttpService) { }

  ngOnInit(): void {
    this.managementService.requestDictionary().subscribe(res => {
      // @ts-ignore
      res.forEach(tmp => {
        let tmpDict = {
          tcsTicker: tmp.tcsTicker,
          yahooTicker: tmp.yahooTicker,
          name: tmp.name,
        };
        this.DICTIONARY.push(tmpDict);
        this.refreshTable();
      });
    });
  }

  private refreshTable() {
    this.dataSource = new MatTableDataSource(this.DICTIONARY);
  }

}
