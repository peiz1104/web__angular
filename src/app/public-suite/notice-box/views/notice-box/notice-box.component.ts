import { NoticeBox } from './../../entity/notice-box';
import { Notice } from './../../entity/notice';
import { NoticeBoxService } from './../../service/notice-box.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Operation } from "app/public-suite/notice-box/enum/operation.enum";

@Component({
  selector: 'spk-notice-box',
  templateUrl: './notice-box.component.html',
  styleUrls: ['./notice-box.component.scss']
})
export class NoticeBoxComponent implements OnInit {

  @Input() isSystem: boolean = false;
  @Input() noticeBox: NoticeBox;
  @Output() afterBoxInited = new EventEmitter();

  loading: boolean = false;
  operation = Operation;
  operationStatus;
  currentNotice: Notice;
  constructor(private boxService: NoticeBoxService) { }

  ngOnInit() {
    this.operationStatus = this.operation.list;
    if (this.isSystem && !this.noticeBox) {
      this.boxService.getSystemNoticeBox().subscribe(
        box => {
          this.noticeBox = box;
        }
      );
    }
  }

  initBox() {
    this.loading = true;
    if (this.isSystem) {
      this.boxService.initSystemNoticeBox().subscribe(
        box => {
          this.loading = false;
          this.noticeBox = box;
          this.afterBoxInited.emit(box);
        },
        error => {
          this.loading = false;
        }
      );
    } else {
      this.boxService.initOtherNoticeBox().subscribe(
        box => {
          this.loading = false;
          this.noticeBox = box;
          this.afterBoxInited.emit(box);
        },
        error => {
          this.loading = false;
        }
      );
    }
  }

  onSuccessAdd(event) {
    if (event === true) {
      this.operationStatus = this.operation.list;
    }
  }
  onSuccessUpdate(event) {
    this.currentNotice = event;
    this.operationStatus = this.operation.list;
  }
  toAdd(event) {
    if (event === true) {
      this.operationStatus = this.operation.add;
    }
  }
  toEdit(event) {
    this.operationStatus = this.operation.edit;
    this.currentNotice = event;
  }

}
