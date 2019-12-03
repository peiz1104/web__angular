import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticeBox } from 'app/public-suite/notice-box/entity/notice-box';
import { SubjectActivityApiService } from '../../../service/subject-activity-api.service';
import { SubjectActivity } from '../../../entity/subject-activity';

@Component({
    selector: 'spk-subjcet-activity-notice-box',
    templateUrl: './subject-activity-notice-box.component.html',
    styleUrls: ['./subject-activity-notice-box.component.scss']
})
export class SubjcetActivityNoticeBoxComponent implements OnInit {
    subject: SubjectActivity;
    noticeBox: NoticeBox = new NoticeBox();
    constructor(private router: Router, private route: ActivatedRoute,
        private subjectActivityApiService: SubjectActivityApiService) { }



    ngOnInit() {
        this.route.data.subscribe(({ subjectActivity }: { subjectActivity: SubjectActivity }) => {
            this.subject = subjectActivity;
            this.noticeBox = {
                id: subjectActivity.noticeBoxId,
                type: "OTHER"
            }
        });
    }

    afterBoxInited(event) {
        this.noticeBox = event;
        this.subject.noticeBoxId = this.noticeBox.id;
        this.subjectActivityApiService.save(this.subject).subscribe(subject => {
            console.log("组件初始成功");
        });
    }
}
