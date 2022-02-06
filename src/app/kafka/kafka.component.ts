import { Component, OnInit } from '@angular/core';
import {Stomp} from "@stomp/stompjs";
declare var SockJS: any;


@Component({
  selector: 'app-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.css']
})

export class KafkaComponent implements OnInit {

  url = 'http://localhost:8080/websocket'
  client: any;
  greeting: string;

  ngOnInit() {
  }

  constructor(){
    this.connection();
  }

  connection(){
    let ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    let that = this;

    this.client.connect({}, function(frame) {
      that.client.subscribe("/topic/analysis", (message) => {
        if(message.body) {
          debugger
          console.log(message.body);
          // //$(".msg").append(this.greeting)
          // $(".msg").html(this.greeting)
          // //alert(this.greeting);
          // //console.log(this.greeting);
        }
      });
    });
  }
}
