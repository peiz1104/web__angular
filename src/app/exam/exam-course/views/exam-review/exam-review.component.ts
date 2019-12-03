import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuiPagination } from 'console-ui-ng';
import { ExaminationService } from '../../service/examination.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
    selector: 'spk-exam-review',
    templateUrl: './exam-review.component.html',
    styleUrls: ['./exam-review.component.scss']
})
export class ExamReviewComponent implements OnInit {
    columns: any[] = [
        {
            title: '考试次数',
            data: 'examSeq',
            styleClass: 'text-center'
        },
        {
            title: '用户名',
            data: 'username',
            styleClass: 'text-center'
        }, {
            title: '姓名',
            data: 'displayName',
            styleClass: 'text-center'
        }, {
            title: '所属组织',
            data: 'name',
            styleClass: 'text-center'
        }, {
            title: '客观题分数',
            data: 'impersonal',
            styleClass: 'text-center'
        }, {
            title: '主观题分数',
            data: 'subjective',
            styleClass: 'text-center'
        }, {
            title: '总分',
            data: 'objectives',
            styleClass: 'text-center'
        }, {
            title: '操作',
            tpl: 'action',
            styleClass: 'text-center',
            style: { 'width': '160px' }
        }
    ];
    columnsData: any = [];
    pagination: CuiPagination;
    loading: boolean;
    examId: any;

    constructor(
        private route: ActivatedRoute,
        private examinationService: ExaminationService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe
            (data => {
                let params = {
                    userId: data.userId,
                    examId: data.examId
                }
                this.examId = data.examId;
                this.examinationService.getTrackList(params).subscribe(
                    res => {
                        console.log(res);
                        this.columnsData = res.content;
                    }
                )
            })
    }
    goReviceExam(uceId) {
        window.open(`${window.location.origin}/archives/tracklist/${this.examId}/review/${uceId}`, '_blank')
    }
    goRevicePapers(uceId) {
        //window.open(`/review/papers/${uceId}`, '_blank');
        window.location.href.indexOf('console') == -1 ? window.open(`/review/papers/${uceId}`, '_blank') : window.open(`/console/review/papers/${uceId}`, '_blank');
    }

}
