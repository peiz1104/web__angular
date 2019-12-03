import { Component, OnInit } from '@angular/core';
import { PaperService } from '../paper.service';
import { Paper } from '../paper.model';
import { CuiPagination } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-list',
    templateUrl: './paper-list.component.html',
    styleUrls: ['./paper-list.component.scss']
})
export class PaperListComponent implements OnInit {

    papers: Paper[];
    pagination: CuiPagination;
    columns;
    searchtext;
    loading: boolean = true;
    selected: number[];

    constructor(private paperService: PaperService,
        private router: Router,
        private modal: NzModalService,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '问卷名称', data: 'name' },
            { title: '问卷描述', data: 'description' },
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
        this.paperService.list(params).subscribe(
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

    delete(id, paper) {
        if (paper.status == 'DRAFT') {
            this.modal.confirm({
                title: `确定要删除吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.paperService.delete(id).subscribe(
                        data => {
                            if (data == true) {
                                tipMessage('删除成功', 'success');
                                this.loadData();
                            } else {
                                tipMessage('该问卷已被引用无法删除');
                            }
                        },
                        err => { tipMessage(err) }
                    );
                }
            });
        } else {
            tipMessage('发布状态不允许删除');
        }

    }

    deleteBantch() {
        let ids = this.selected;
        if (!ids) {
            tipMessage('请选择删除项');
        } else {
            this.paperService.getIsPublished(ids).subscribe(
                data => {
                    if (data == true) {
                        this.modal.confirm({
                            title: `确定要删除吗？`,
                            zIndex: 1003,
                            onOk: () => {
                                this.paperService.delete(ids).subscribe(
                                    delData => {
                                        if (delData == true) {
                                            tipMessage('删除成功', 'success');
                                            this.loadData();
                                        } else {
                                            tipMessage('该问卷已被引用无法删除');
                                        }
                                    },
                                    err => { tipMessage(err) }
                                );
                            }
                        });
                    } else {
                        tipMessage('发布状态下不允许删除');
                    }

                },
                err => { tipMessage(err) }
            );
        }
    }

    onPublish(paper) {
        paper.status = (paper.status == 'DRAFT' ? 'RUNNING' : 'DRAFT');
        paper.lastModifiedDate = null;
        this.paperService.edit(paper).subscribe(
            papers => {
                if (paper.status == 'RUNNING') {
                    tipMessage('发布成功', 'success');
                } else {
                    tipMessage('取消发布成功', 'success');
                }
                this.loadData();
            }
        );
    }

    copy(paperId) {
        this.paperService.copy(paperId).subscribe(
            papers => {
                tipMessage('复制成功', 'success');
                this.loadData();
            }
        );
    }

    publish() {
        let ids = this.selected;
        if (!ids) {
            tipMessage('请选择要发布的项');
        } else {
            this.paperService.publish(ids).subscribe(
                papers => {
                    tipMessage('发布成功', 'success');
                    this.loadData();
                }
            );
        }
    }

    disPublish() {
        let ids = this.selected;
        if (!ids) {
            tipMessage('请选择要取消发布的项');
        } else {
            this.paperService.disPublish(ids).subscribe(
                papers => {
                    tipMessage('取消发布成功', 'success');
                    this.loadData();
                }
            );
        }
    }

}
