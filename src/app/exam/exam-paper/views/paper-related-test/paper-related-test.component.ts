import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExaminationService } from 'app/exam/examination/service/examination.service';
import { NzMessageService } from 'ng-zorro-antd'

@Component({
    selector: 'spk-paper-related-test',
    templateUrl: './paper-related-test.component.html',
    styleUrls: ['./paper-related-test.component.scss']
})
export class PaperRelatedTestComponent implements OnInit {
    paperId: any;
    link: any = {};
    data: any;
    selection: any[];
    spinning: boolean = false;
    columns: any = [
        { title: '所在单位分类', data: 'siteName', style: { 'max-width': '100px' } },
        { title: '考试名称', tpl: 'examName', style: { 'max-width': '150px' } },
        { title: '考试起始时间', tpl: 'startTime', styleClass: 'text-center' },
        { title: '允许进入截止时间', tpl: 'enterExamTime', styleClass: 'text-center' },
        { title: '创建人', data: 'createdUserName', styleClass: 'text-center' },
        { title: '创建时间', tpl: 'createdDate', styleClass: 'text-right' },
        { title: '是否发布', tpl: 'isPutout', styleClass: 'text-center' },
    ];
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private examinationService: ExaminationService,
        private _message: NzMessageService
    ) { }

    ngOnInit() {
        this.routeInfo.params.subscribe(params => {
            this.paperId = params['id'];
            this.link = params['userGourpId'] ? {
                userGroupId: params['userGroupId'],
                name: params['name']
            } : {};
        });
        const params = {
            paperId: this.paperId,
            page: 0,
            size: 10
        }
        this.spinning = true;
        this.examinationService.getExaminationList(params).subscribe(res => {
            this.data = res;
            this.spinning = false;
        }, err => {
            this._message.error(err);
            this.spinning = false;
        })
    }
}
