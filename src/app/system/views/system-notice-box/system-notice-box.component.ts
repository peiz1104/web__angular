import { NoticeBox } from 'app/public-suite/notice-box/entity/notice-box';
import { NoticeBoxService } from './../../../public-suite/notice-box/service/notice-box.service';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-system-notice-box',
    templateUrl: './system-notice-box.component.html',
    styleUrls: ['./system-notice-box.component.scss']
})
export class SystemNoticeBoxComponent implements OnInit {

    noticeBox: NoticeBox;
    constructor(
        private noticeBoxService: NoticeBoxService,
    ) { }

    ngOnInit() {
        this.noticeBoxService.getSystemNoticeBox().subscribe(
            data => {
                this.noticeBox = data;
            },
            err => {
                tipMessage('数据加载异常', 'error');
            }
        );
    }

}
