import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UgcNoticeService } from "./../../service/ugc-notice.service";
import { NoticeBox } from 'app/public-suite/notice-box/entity/notice-box';

@Component({
    selector: 'spk-ugc-notice-box-list',
    templateUrl: './ugc-notice-box-list.component.html',
    styleUrls: ['./ugc-notice-box-list.component.scss']
})
export class UgcNoticeBoxListComponent implements OnInit {

    noticeBox: NoticeBox = new NoticeBox();
    constructor(private router: Router, private route: ActivatedRoute,
        private ugcNoticeService: UgcNoticeService) { }
    ngOnInit() {
        this.ugcNoticeService.findNoticeBoxId().subscribe(noticeBox => {
            this.noticeBox = noticeBox;
        })
    }

    afterBoxInited(event) {
        this.noticeBox = event;
        this.ugcNoticeService.saveNoticeBox(this.noticeBox.id).subscribe(noticeBox => {
            this.noticeBox = noticeBox;
            console.log("组件初始成功");
        });
    }
}
