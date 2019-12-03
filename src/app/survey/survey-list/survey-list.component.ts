import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey.model';
import { CuiPagination } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-survey-list',
    templateUrl: './survey-list.component.html',
    styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

    papers: Survey[];
    pagination: CuiPagination;
    columns;
    searchtext;
    loading: boolean = true;
    selected: number[];


    constructor(private surveyService: SurveyService,
        private router: Router,
        private modal: NzModalService,
        private message: NzMessageService,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '问卷名称', data: 'name' },
            // { title: '问卷描述', data: 'description', style: { 'width': '52%' } },
            { title: '状态', data: 'status', tpl: 'statusTpl' }
        ];
    }

    ngOnInit() {
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.searchtext,
            page: page ? page.number : 0,
            size: page ? page.size : '10',
            sort: page && page.sort ? page.sort : ''
        };
        this.loading = true;
        this.surveyService.list(params).subscribe(
            pag => {
                this.pagination = pag;
                this.papers = pag.content;
                this.loading = false;
            }
        );
    }

    onSelect(selIds: any[]) {
        this.selected = selIds;
    }

    delete(id, survey) {
        if (survey.status == 'DRAFT') {
            this.surveyService.delete(id).subscribe(
                data => {
                    if (data == true) {
                        tipMessage('删除成功', 'success');
                        this.loadData();
                    } else {
                        tipMessage('该问卷已被引用无法删除');
                    }
                },
                err => {
                    tipMessage(err);
                }
            );
            /* this.modal.confirm({
              title: `确定要删除吗？`,
              onOk: () => {
              }
            }); */
        } else {
            tipMessage('发布状态下不允许删除');
        }
    }

    deleteBantch() {
        let flag = this.selected ? (this.selected.length ? true : false) : false;
        if (!flag) {
            tipMessage('请选择删除项');
        } else {
            this.surveyService.getIsPublished(this.selected).subscribe(
                data => {
                    if (data == true) {
                        this.modal.confirm({
                            title: `确定要删除选择的调查问卷吗？`,
                            zIndex: 1003,
                            onOk: () => {
                                this.surveyService.delete(this.selected).subscribe(
                                    deldata => {
                                        if (deldata == true) {
                                            tipMessage('删除成功', 'success');
                                            this.loadData();
                                        } else {
                                            tipMessage('该问卷已被引用无法删除');
                                        }
                                    },
                                    err => { tipMessage(err); }
                                );
                            }
                        });
                    } else {
                        tipMessage('发布状态下不允许删除');
                    }

                },
                err => { tipMessage(err); }
            );
        }
    }

    onPublish(survey) {
        survey.status = (survey.status == 'DRAFT' ? 'RUNNING' : 'DRAFT');
        survey.lastModifiedDate = null;
        this.surveyService.edit(survey).subscribe(
            papers => {
                tipMessage('取消发布成功', 'success');
                this.loadData();
            }
        );
    }

    confirmPublish(survey) {
        survey.status = (survey.status == 'DRAFT' ? 'RUNNING' : 'DRAFT');
        this.surveyService.confirmPublish(survey.id).subscribe(
            data => {
                if (data.length > 0) {
                    this.surveyService.edit(survey).subscribe(
                        papers => {
                            tipMessage('发布成功', 'success');
                            this.loadData();
                        }
                    );
                } else {
                    tipMessage('问卷信息不完善，不能发布', 'warning');
                    this.loadData();
                }
            }
        );
    }
    publish() {
        let flag = this.selected ? (this.selected.length ? true : false) : false;
        if (!flag) {
            this.message.error('请选择要发布的项');
        } else {
            this.surveyService.publish(this.selected).subscribe(
                papers => {
                    if (papers == true) {
                        tipMessage('发布成功', 'success');
                        this.loadData();
                    } else {
                        tipMessage('问卷信息不完善，不允许发布');
                    }
                }
            );
        }
    }

    disPublish() {
        let flag = this.selected ? (this.selected.length ? true : false) : false;
        if (!flag) {
            this.message.error('请选择要取消发布的项');
        } else {
            this.surveyService.disPublish(this.selected).subscribe(
                papers => {
                    tipMessage('取消发布成功', 'success');
                    this.loadData();
                }
            );
        }
    }

}
