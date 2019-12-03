import { Component, OnInit } from '@angular/core';
import { SurveyTplService } from '../survey-tpl.service';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-survey-tpl-list',
    templateUrl: './survey-tpl-list.component.html',
    styleUrls: ['./survey-tpl-list.component.scss']
})
export class SurveyTplListComponent implements OnInit {

    searchtext;
    tpls;
    loading: boolean = false;
    columns = [
        { title: '缩略图', data: 'imgUrl', tpl: 'img' },
        { title: '调查名称', data: 'name' },
        { title: '状态', data: 'isPublished', tpl: 'statusTpl' }
    ];
    selection: any[];

    constructor(
        private surveyTplApi: SurveyTplService,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData(page?) {
        page = { ...this.tpls, ...page };
        let params = { name: this.searchtext };
        this.loading = true;
        this.surveyTplApi.getAllOfPage(params, page).subscribe(
            tpls => {
                this.tpls = tpls;
                this.loading = false;
            },
            err => {
                tipMessage(`加载列表失败`);
                this.loading = false;
            }
        );
    }

    delete(row?) {
        let ids = [];
        if (row) {
            ids = [row.id];
        } else {
            ids = this.selection ? this.selection.map(it => it.id) : [];
        }

        if (!ids || ids.length <= 0) {
            tipMessage('请选择要删除的模板', '', 2000);
            return;
        }

        if (!row) {
            this.modal.confirm({
                title: '确定要选择要删除选择的模板吗？',
                zIndex: 1003,
                onOk: () => {
                    this.doDelete(ids);
                }
            });
        } else {
            this.doDelete(ids);
        }
    }

    doDelete(ids) {
        this.surveyTplApi.delete(ids).subscribe(
            () => {
                tipMessage('删除成功', 'success');
                this.loadData({ ...this.tpls, ...{ page: 0 } });
            },
            err => {
                tipMessage(`删除失败，${err}`);
            }
        );
    }

    publish(inversion: boolean, row?) {
        let ids = [];
        let operate = inversion ? 'disPublish' : 'publish';
        let operateName = inversion ? '取消发布' : '发布';
        if (row) {
            ids = [row.id];
        } else {
            ids = this.selection ? this.selection.map(it => it.id) : [];
        }

        if (!ids || ids.length <= 0) {
            tipMessage(`请选择要${operateName}的模板`, '', 4000);
            return;
        }

        if (!row) {
            this.modal.confirm({
                title: `确定要选择要${operateName}选择的模板吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.doPublish(operate, operateName, ids);
                }
            });
        } else {
            this.doPublish(operate, operateName, ids);
        }
    }

    doPublish(operate, operateName, ids) {
        this.surveyTplApi[operate](ids).subscribe(
            () => {
                tipMessage(`${operateName}成功`, 'success');
                this.loadData({ ...this.tpls });
            },
            err => {
                tipMessage(`${operateName}失败，${err}`, '', 4000);
            }
        );
    }
}
