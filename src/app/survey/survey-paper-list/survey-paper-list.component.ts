import { Component, OnInit } from '@angular/core';
import { SurveyPaperService } from '../surveyPaper.service';
import { SurveyPaper } from '../surveyPaper.model';
import { CuiPagination } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { isArray } from 'util';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-survey-paper-list',
    templateUrl: './survey-paper-list.component.html',
    styleUrls: ['./survey-paper-list.component.scss']
})
export class SurveyPaperListComponent implements OnInit {

    surveyPapers: SurveyPaper[];
    pagination: CuiPagination;
    columns;
    searchtext;
    isVisible: boolean = false;
    surveyId: number;
    selected: number[];
    loading;

    constructor(private surveyPaperService: SurveyPaperService,
        private router: Router,
        private modal: NzModalService,
        private message: NzMessageService,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '缩略图', data: 'imgUrl', tpl: 'img' },
            { title: '调查名称', data: 'name' },
            // { title: '调查描述', data: 'description' },
            { title: '开始时间', tpl: 'start-date' },
            { title: '结束时间', tpl: 'end-date' },
            { title: '状态', data: 'isPublished', tpl: 'statusTpl' }
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
        this.surveyPaperService.list(params).subscribe(
            pag => {
                this.pagination = pag;
                this.surveyPapers = pag.content;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    onSelect(selIds: any[]) {
        this.selected = selIds;
    }

    delete(surveyPaper, id) {
        this.surveyPaperService.delete(id).subscribe(
            () => {
                tipMessage('删除成功', 'success');
                this.loadData();
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
    }

    deleteBantch() {
        let flag = this.selected ? (this.selected.length ? true : false) : false;
        if (!flag) {
            tipMessage('请选择删除项', 'error');
        } else {
            this.surveyPaperService.getIsPublished(this.selected).subscribe(
                data => {
                    if (data == true) {
                        this.modal.confirm({
                            title: `确定要删除选择的调查吗？`,
                            zIndex: 1003,
                            onOk: () => {
                                this.surveyPaperService.delete(this.selected).subscribe(
                                    () => {
                                        tipMessage('删除成功', 'success');
                                        this.loadData();
                                    },
                                    err => { tipMessage(err); }
                                );
                            }
                        });
                    } else {
                        tipMessage('发布状态下不允许删除');
                    }

                },
                err => {
                    tipMessage(err);
                }
            );
        }
    }

    onPublish(surveyPaper) {
        surveyPaper.offeringId = surveyPaper.id;
        surveyPaper.id = surveyPaper.offeringSurvey.survey.id;
        if (surveyPaper.offeringSurvey.survey.paper) {
            surveyPaper.paper = surveyPaper.offeringSurvey.survey.paper;
            surveyPaper.isPublished = !surveyPaper.isPublished;
            this.surveyPaperService.edit(surveyPaper).subscribe(
                papers => {
                    tipMessage('取消发布成功', 'success');
                    this.loadData();
                }
            );
        } else {
            tipMessage('未关联问卷，无法发布');
        }
    }

    confirmPublish(surveyPaper) {
        surveyPaper.offeringId = surveyPaper.id;
        surveyPaper.id = surveyPaper.offeringSurvey.survey.id;
        if (surveyPaper.offeringSurvey.survey.paper) {
            surveyPaper.paper = surveyPaper.offeringSurvey.survey.paper;
            surveyPaper.isPublished = !surveyPaper.isPublished;
            this.surveyPaperService.confirmPublish(surveyPaper.paper.id).subscribe(
                data => {
                    if (data.length > 0) {
                        this.surveyPaperService.edit(surveyPaper).subscribe(
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
        } else {
            tipMessage('未关联问卷，无法发布');
        }
    }

    copySurvey(surveyPaper) {
        this.modal.confirm({
            title: `确定要复制吗？`,
            zIndex: 1003,
            onOk: () => {
                this.surveyPaperService.copy(surveyPaper).subscribe(
                    () => {
                        tipMessage('复制成功', 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage(err);
                    }
                );
            }
        });
    }
    showModal(id?: number) {
        this.isVisible = true;
        this.surveyId = id;
    }
    handleCancel() {
        this.isVisible = false;
    }
    closeModal() {
        this.isVisible = false;
        this.loadData();
    }

    publish() {
        let flag = this.selected ? (this.selected.length ? true : false) : false;
        if (!flag) {
            tipMessage('请选择要发布的项', 'error');
        } else {
            this.modal.confirm({
                title: "确认发布选择的调查吗？",
                zIndex: 1003,
                onOk: () => {
                    this.surveyPaperService.publish(this.selected).subscribe(
                        papers => {
                            tipMessage('发布成功', 'success');
                            this.loadData();
                        }
                    );
                }
            })
        }
    }

    disPublish() {
        let flag = this.selected ? (this.selected.length ? true : false) : false;
        if (!flag) {
            tipMessage('请选择要取消发布的项', 'error');
        } else {
            this.modal.confirm({
                title: "确认撤销发布选择的调查吗？",
                zIndex: 1003,
                onOk: () => {
                    this.surveyPaperService.disPublish(this.selected).subscribe(
                        papers => {
                            tipMessage('取消发布成功', 'success');
                            this.loadData();
                        }
                    );
                }
            })
        }
    }

    onTplSelectOk(value, lookupHandle) {
        if (!isArray(value) || value.length == 0) {
            tipMessage('请至少选择一个调查模板', 'warning');
            lookupHandle.isConfirming = false;
            return;
        }

        let surveyIds = value.map(it => it.id);
        this.surveyPaperService.addFromTpl(surveyIds).subscribe(
            () => {
                lookupHandle.close();
                tipMessage('添加成功', 'success');
                this.loadData({ ...this.pagination });
            },
            err => {
                tipMessage('添加失败', 'error');
                lookupHandle.isConfirming = false;
            }
        );
    }
}
