import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuiPagination } from 'console-ui-ng';
import { ExaminationService } from '../../service/examination.service';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-exam-review',
    templateUrl: './exam-review.component.html',
    styleUrls: ['./exam-review.component.scss']
})
export class ExamReviewComponent implements OnInit {
    pagination: CuiPagination;
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
    loading: boolean;
    examId: any;
    params: any = {};
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private examinationService: ExaminationService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe
            (data => {
                this.params = {
                    userId: data.userId,
                    examId: data.examId
                }
                this.examId = data.examId;
                this.loadData();
            })
        console.log('ngOnInit ', this.examId)
    }
    loadData(page?: CuiPagination) {
        this.pagination = page;
        this.loading = true;
        let params = {
            ...this.params,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        }
        this.examinationService.getTrackList(params).subscribe(
            res => {
                console.log(res);
                this.columnsData = res.content;
                this.pagination = res;
                this.loading = false;
            },
            err => {
                tipMessage(err);
                this.loading = false;
            }
        )
    }
    goReviceExam(uceId) {
        window.open(`${window.location.origin}/archives/tracklist/${this.examId}/review/${uceId}`, '_blank')
    }
    goRevicePapers(uceId) {
        // window.open(`/console/review/papers/${uceId}`, '_blank');
        // tslint:disable-next-line:max-line-length
        window.location.href.indexOf('console') == -1 ? window.open(`/review/papers/${uceId}`, '_blank') : window.open(`/console/review/papers/${uceId}`, '_blank');
    }

}
