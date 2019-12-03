import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-inner-msg-view',
  templateUrl: './inner-msg-view.component.html',
  styleUrls: ['./inner-msg-view.component.scss']
})
export class InnerMsgViewComponent implements OnInit {

  msg: any;

  constructor() { }

  ngOnInit() {
  }

}
