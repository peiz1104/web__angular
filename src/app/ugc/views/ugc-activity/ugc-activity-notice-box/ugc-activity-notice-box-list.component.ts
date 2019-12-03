import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UgcActivityService } from "./../../../service/ugc-activity.service";
import { UgcActivity } from './../../../entity/ugc-activity';
import { NoticeBox } from 'app/public-suite/notice-box/entity/notice-box';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'spk-ugc-activity-notice-box-list',
    templateUrl: './ugc-activity-notice-box-list.component.html',
    styleUrls: ['./ugc-activity-notice-box-list.component.scss']
})
export class UgcActivityNoticeBoxListComponent implements OnInit {

    noticeBox: NoticeBox;
    ugcActivity: UgcActivity;
    constructor(private router: Router, private route: ActivatedRoute,
        private _message: NzMessageService,
        private ugcActivityService: UgcActivityService) { }


    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.noticeBox = new NoticeBox();
            this.noticeBox.id = data.ugcActivity.noticeBoxId;
            this.ugcActivity = data.ugcActivity;
        });
        // this.ugcNoticeService.findNoticeBoxId().subscribe(id => {
        //     this.noticeBox = new NoticeBox();
        //     this.noticeBox.id = id;
        // })
    }

    afterBoxInited(event) {
        this.noticeBox = event;
        this.ugcActivityService.initNoticeBox(this.ugcActivity.id, this.noticeBox.id).subscribe(id => {
            this.noticeBox.id = id;
            this._message.success('初始化培训班消息成功');
            this.router.navigate(['.'], { relativeTo: this.route, queryParams: { t: Math.random() } });
        });
    }
}
