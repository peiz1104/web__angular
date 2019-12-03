import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContentServer } from "app/system/entity/content-server";

@Component({
  selector: 'spk-content-server-form',
  templateUrl: './content-server-form.component.html',
  styleUrls: ['./content-server-form.component.scss']
})
export class ContentServerFormComponent implements OnInit {
  @Input() server: ContentServer;
  @Input() loading: boolean;
  @Output() doSubmit = new EventEmitter();
  @Input() isCreate: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.doSubmit.emit(this.server);
  }

}
