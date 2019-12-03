import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectSettingApiService } from "./../service/subject-setting-api.service";
import { NoticeBox } from 'app/public-suite/notice-box/entity/notice-box';

@Component({
    selector: 'spk-subjcet-notice-box-list',
    templateUrl: './subject-notice-box-list.component.html',
    styleUrls: ['./subject-notice-box-list.component.scss']
})
export class SubjcetNoticeBoxListComponent implements OnInit {

    noticeBox: NoticeBox = new NoticeBox();
    constructor(private router: Router, private route: ActivatedRoute,
        private settingApiService: SubjectSettingApiService) { }



    ngOnInit() {
        this.settingApiService.findNoticeBox().subscribe(noticeBox => {
                this.noticeBox = noticeBox;
        })
    }

    afterBoxInited(event) {
        this.noticeBox = event;
        this.settingApiService.initNoticeBox(this.noticeBox.id).subscribe(obj => {
            this.noticeBox = obj;
            console.log("组件初始成功");
        });
    }
}
