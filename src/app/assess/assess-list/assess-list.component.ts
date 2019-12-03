import { Component, OnInit } from '@angular/core';
import { AssessService } from '../assess.service';
import { AssessPaper } from '../assessPaper.model';
import { CuiPagination } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-assess-list',
    templateUrl: './assess-list.component.html',
    styleUrls: ['./assess-list.component.scss']
})
export class AssessListComponent implements OnInit {

    assessPapers: AssessPaper[];
    pagination: CuiPagination;
    columns;
    searchtext;
    selected: number[];
    loading: boolean = true;
    tabs = [
        {
            name: '培训班评估模板'
        },
        {
            name: '课程评估模板'
        },
        {
            name: '讲师评估模板'
        },
        /* {
          name: '专区评估模板'
        } */
    ];
    assessType: string = 'CLASSROOM';
    tableIndex: number;


    constructor(private assessService: AssessService,
        private router: Router,
        private modal: NzModalService,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '缩略图', data: 'imgUrl', tpl: 'img' },
            { title: '评估名称', data: 'name' },
            // { title: '评估描述', data: 'description' },
            { title: '是否默认', data: 'isDefault', tpl: 'defaultTpl' },
            { title: '状态', data: 'isPublished', tpl: 'statusTpl' }
        ];
    }

    /**
     * 切换tab
     * @param event
     */
    _tabChange(event) {
        if (event.index == 0) {
            this.assessType = 'CLASSROOM';
        } else if (event.index == 1) {
            this.assessType = 'COURSE';
        } else if (event.index == 2) {
            this.assessType = 'TEACHER';
        } else {
            this.assessType = 'SUBJECT';
        }
        this.loadData(this.assessType);
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            ({ assessType }) => {
                if (assessType) {
                    this.assessType = assessType;
                    if (this.assessType == 'CLASSROOM') {
                        this.tableIndex = 0;
                    } else if (this.assessType == 'COURSE') {
                        this.tableIndex = 1;
                    } else if (this.assessType == 'TEACHER') {
                        this.tableIndex = 2;
                    } else {
                        this.tableIndex = 3;
                    }
                }
            });
        this.loadData(this.assessType);
    }

    loadData(assessType?: string, page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.searchtext,
            assessType: this.assessType,
            page: page ? page.number : 0,
            size: page ? page.size : '10',
            sort: page && page.sort ? page.sort : ''
        };
        this.loading = true;
        this.assessService.list(params).subscribe(
            pag => {
                this.pagination = pag;
                this.assessPapers = pag.content;
                this.loading = false;
            }
        );
    }

    /**
     * 跳转添加页面
     */
    addAssess() {
        this.router.navigate(['add'], { relativeTo: this.route, queryParams: { assessType: this.assessType } });
    }

    /**
     * 编辑评估页面
     */
    editAssess(row) {
        this.router.navigate([row.id, 'edit'], { relativeTo: this.route, queryParams: { assessType: this.assessType, paperId: row.paper.id } });
    }

    onSelect(selIds: any[]) {
        this.selected = selIds;
    }

    delete(id, assessPaper) {
        if (!assessPaper.isPublished) {
            this.assessService.delete(id).subscribe(
                () => {
                    tipMessage('删除成功', 'success');
                    this.loadData();
                },
                err => { tipMessage(err); }
            );
            /* this.modal.confirm({
                      title: `确定要删除吗？`,
                      onOk: () => {
              }
            }); */
        } else {
            tipMessage('发布状态下的评估不允许删除', 'warning');
        }

    }

    deleteBantch() {
        // let ids = this.selected;
        let flag = this.selected ? (this.selected.length ? true : false) : false;
        if (!flag) {
            tipMessage('请选择想要删除的评估', 'warning');
        } else {
            this.assessService.getIsPublished(this.selected).subscribe(
                data => {
                    if (data == true) {
                        tipMessage('发布状态下不允许删除', 'error');
                    } else {
                        this.modal.confirm({
                            title: `确定要删除选择的评估模板吗？`,
                            zIndex: 1003,
                            onOk: () => {
                                this.assessService.delete(this.selected).subscribe(
                                    () => {
                                        tipMessage('删除成功', 'success');
                                        this.loadData();
                                    },
                                    err => { tipMessage(err) }
                                );
                            }
                        });
                        tipMessage('发布状态下不允许删除', 'error');
                    }
                },
                err => { tipMessage(err) }
            );
        }
    }

    onPublish(assessPaper) {
        assessPaper.isPublished = !assessPaper.isPublished;
        this.assessService.edit(assessPaper).subscribe(
            papers => {
                tipMessage('取消发布成功', 'success');
                this.loadData();
            }
        );

    }

    confirmPublish(assessPaper) {
        assessPaper.isPublished = !assessPaper.isPublished;
        this.assessService.confirmPublish(assessPaper.paper.id).subscribe(
            data => {
                if (data.length > 0) {
                    this.assessService.edit(assessPaper).subscribe(
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

    onDefault(assessPaper) {
        if (assessPaper.isPublished) {
            this.modal.confirm({
                title: `设置当前默认将会取消其它默认模板，确定设置吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.assessService.setDefault(assessPaper.id, this.assessType).subscribe(
                        papers => {
                            tipMessage('设置成功', 'success');
                            this.loadData();
                        }
                    );
                }
            });
        } else {
            tipMessage("默认模板必须是发布状态下才可以设置", '', 5000);
        }
    }
    onCancleDefault(assessPaper) {
        this.modal.confirm({
            title: `确定要取消吗？`,
            zIndex: 1003,
            onOk: () => {
                this.assessService.cancleDefault(assessPaper.id).subscribe(
                    papers => {
                        tipMessage('取消成功', 'success');
                        this.loadData();
                    }
                );
            }
        });
    }

    copyAssess(assessPaper) {
        this.modal.confirm({
            title: `确定要复制吗？`,
            zIndex: 1003,
            onOk: () => {
                assessPaper.startDate = new Date(assessPaper.startDate);
                assessPaper.endDate = new Date(assessPaper.endDate);
                this.assessService.copy(assessPaper).subscribe(
                    () => {
                        tipMessage('复制成功', 'success');
                        // this.loadData();
                    },
                    err => { tipMessage(err) }
                );
            }
        });
    }

    publish() {
        let flag = this.selected ? (this.selected.length ? true : false) : false;
        if (!flag) {
            tipMessage('请选择要发布的项', 'error');
        } else {
            this.modal.confirm({
                title: "确认要发布选择的评估吗？",
                zIndex: 1003,
                onOk: () => {
                    this.assessService.publish(this.selected).subscribe(
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
        // let ids = this.selected;
        if (!flag) {
            tipMessage('请选择要取消发布的项', 'error');
        } else {
            this.modal.confirm({
                title: "确认要撤销发布选择的评估吗？",
                zIndex: 1003,
                onOk: () => {
                    this.assessService.disPublish(this.selected).subscribe(
                        papers => {
                            tipMessage('取消发布成功', 'success');
                            this.loadData();
                        }
                    );
                }
            })
        }
    }
}
