import { Survey } from './../../../../survey/survey.model';
import { SurveyService } from 'app/survey/survey.service';
import { Component, OnInit } from '@angular/core';
import { CuiPagination } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-survey',
    templateUrl: './training-class-survey.component.html',
    styleUrls: ['./training-class-survey.component.scss']
})
export class TrainingClassSurveyComponent implements OnInit {
    trainingId: number;

    papers: Survey[];
    pagination: CuiPagination;
    columns;
    searchtext;
    loading: boolean = true;
    isVisible: boolean = false;
    paperId: number;
    surveyId: number;
    showEdie: boolean = false;

    allPapers: Survey[];
    isShowSourse: boolean = false; // 资源库
    sourseColumns;
    sourseSelected: any;
    sourseText;
    trainingName: string;
    bLoading: boolean = false;

    constructor(private surveyService: SurveyService,
        private router: Router,
        private modal: NzModalService,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '调查名称', data: 'name', styleClass: 'text-center' },
            { title: '描述', data: 'description', styleClass: 'text-center' },
            { title: '开始时间', tpl: 'start-date', styleClass: 'text-center' },
            { title: '结束时间', tpl: 'end-date', styleClass: 'text-center' },
            { title: '状态', data: 'status', tpl: 'statusTpl', styleClass: 'text-center' }
        ];
        this.sourseColumns = [
            { title: '调查名称', data: 'name', styleClass: 'text-center' },
            { title: '描述', data: 'description', styleClass: 'text-center' }
        ];

    }

    ngOnInit() {
        this.route.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingId = obj.trainingClass.id;
                this.trainingName = obj.trainingClass.name;
            }
        );
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.searchtext,
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : ''
        };
        this.loading = true;
        this.surveyService.trainList(this.trainingId, params).subscribe(
            pag => {
                this.pagination = pag;
                this.papers = pag.content;
                this.loading = false;
            }
        );
    }

    delete(row) {
        if (!row.isPublished) {
            this.modal.confirm({
                title: `确定要删除吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.surveyService.trainDelete(this.trainingId, row.id).subscribe(
                        () => {
                            tipMessage('删除成功', 'success');
                            this.loadData();
                        },
                        err => { tipMessage(err) }
                    );
                }
            });
        } else {
            tipMessage('发布状态下不允许删除');
        }
    }

    onPublish(survey) {
        survey.isPublished = !survey.isPublished;
        survey.lastModifiedDate = null;
        this.surveyService.trainEdit(survey).subscribe(
            papers => {
                if (survey.isPublished) {
                    tipMessage('发布成功', 'success');
                } else {
                    tipMessage('取消发布成功', 'success');
                }
                this.loadData();
            }
        );
    }

    showModal(row?: any) {
        this.isVisible = true;
        if (row) {
            this.paperId = row.paper.id;
            this.surveyId = row.id;
            this.showEdie = true;
        } else {
            this.paperId = null;
            this.showEdie = false;
        }
    }

    handleCancel(e) {
        this.isVisible = false;
        this.loadData();
    }
    closeModal() {
        this.isVisible = false;
        this.loadData();
    }

    // 资源库
    loadSourse(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.sourseText,
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : '',
        };
        this.loading = true;
        this.surveyService.trainPublishList(this.trainingId, params).subscribe(
            pag => {
                this.pagination = pag;
                this.allPapers = pag.content;
                this.loading = false;
            }
        );
    }
    showSourse() {
        this.loadSourse();
        this.isShowSourse = true;
    }
    closeSourse(e) {
        this.isShowSourse = false;
    }
    saveSourse() {
        this.bLoading = true;
        if (this.sourseSelected) {
            this.surveyService.copySourse(this.trainingId, this.sourseSelected).subscribe(
                ok => {
                    this.bLoading = false;
                    this.isShowSourse = false;
                    this.searchtext = '';
                    this.loadData();
                }
            );
        } else {
            this.bLoading = false;
            tipMessage('请至少选择一个调查');
        }
    }

    toAnalysis(row) {
        // this.router.navigate([row.paper.id, 'analysis'],
        //  { relativeTo: this.route, queryParams: {assessId: row.id, offeringId: this.trainingId, assessType: 'SURVEY'}});
        // 判断是否有作答记录
        this.surveyService.getTotalAnswer(this.trainingId, row.paper.id).subscribe(
            allAnswer => {
                if (allAnswer > 0) {
                    this.router.navigate([row.paper.id, 'analysis'],
                        { relativeTo: this.route, queryParams: { assessId: row.id, offeringId: this.trainingId, assessType: 'SURVEY' } });
                } else {
                    tipMessage('暂无人员参与作答');
                }
            });
    }
}
