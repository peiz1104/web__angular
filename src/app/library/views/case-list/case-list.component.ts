import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { CaseInfoService } from '../../service/case.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CaseInfo } from '../../entity/case-info';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.scss']
})

export class CaseListComponent implements OnInit {

    pagination: CuiPagination;
    columns;
    caseInfos: CaseInfo[];
    loading: boolean = true;
    searchText: CaseInfo;
    selection: CaseInfo[];

    constructor(private caseInfoService: CaseInfoService,
        private modalService: NzModalService,
        private router: Router,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '案例编号', data: 'caseCode', tpl: 'getCaseInfo' },
            { title: '案例名称', data: 'name' },
            { title: '经典案例', data: 'isClassic', tpl: 'caseTypeClassic' },
            { title: '是否发布', data: 'isPublished', tpl: 'caseTypeRelease' },
            { title: '案例来源', data: 'source', tpl: 'caseTypeSource' },
            { title: '所属组织', tpl: 'userGroup', visible: true },
            { title: '所属分类', tpl: 'category', visible: true }
        ];
    }

    ngOnInit() {
        this.searchText = new CaseInfo();
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.loading = true;
        this.caseInfoService.searchData(this.getParams(page)).subscribe(
            pag => {
                this.pagination = pag;
                this.caseInfos = pag.content;
                this.loading = false;
            }
        );
    }

    clearSearchText() {
        this.searchText = new CaseInfo();
        this.searchText.caseCode = null;
        this.searchText.name = null;
        this.searchText.source = null;
        this.searchText.isClassic = null;
        this.searchText.isPublished = null;
        this.searchText.userGroup = null;
        this.searchText.category = null;

    }

    getParams(page?: CuiPagination) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: 'lastModifiedDate,desc'
        }
        if (this.searchText.caseCode != '' && this.searchText.caseCode != null) {
            params["caseCode"] = this.searchText.caseCode
        }
        if (this.searchText.name != '' && this.searchText.name != null) {
            params["name"] = this.searchText.name
        }
        if (this.searchText.source != '' && this.searchText.source != null) {
            params["source"] = this.searchText.source
        }
        if (this.searchText.isClassic != null) {
            params["isClassic"] = this.searchText.isClassic
        }
        if (this.searchText.isPublished != null) {
            params["isPublished"] = this.searchText.isPublished
        }
        if (this.searchText.userGroup != null) {
            params["userGroup.id"] = this.searchText.userGroup.id
        }
        if (this.searchText.category != null) {
            params["category.id"] = this.searchText.category.id
        }
        return params;
    }

    delete(caseInfo?: CaseInfo, single_flag?: boolean) {
        this.batchOperate('delete', '删除', caseInfo, single_flag);
    }
    publish(caseInfo?: CaseInfo, single_flag?: boolean) {
        this.batchOperate('publish', '发布', caseInfo, single_flag);
    }
    disPublish(caseInfo?: CaseInfo, single_flag?: boolean) {
        this.batchOperate('disPublish', '撤销发布', caseInfo, single_flag);
    }

    /* publish_single(caseInfo?: CaseInfo) {
      this.batchOperate_single('publish', '发布', caseInfo);
    }
    disPublish_single(caseInfo?: CaseInfo) {
      this.batchOperate_single('disPublish', '撤销发布', caseInfo);
    }
    batchOperate_single(action: string, actionName: string, caseInfo?: CaseInfo) {
      if (this.publishCheck([caseInfo], actionName)) {
        this.caseInfoService[action]([caseInfo].map(it => it.id)).subscribe(
          ok => {
            tipMessage(`${actionName}成功`,'success');
            this.loadData();
          },
          err => tipMessage(`${actionName}失败`,'error');
        );
      }
    } */


    private batchOperate(action: string, actionName: string, caseInfo?: CaseInfo, single_flag?: boolean) {
        let canNext = true;
        let selected = caseInfo ? [caseInfo] : this.selection;

        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的案例`, 'warning');
            return;
        }
        if (actionName != "删除") {
            canNext = this.publishCheck(selected, actionName);
        }

        if (canNext) {
            if (single_flag) {
                let canDel = true;
                let hasArchived = false;
                selected.forEach(c => {
                    if (c.isPublished == 'Y') {
                        canDel = false;
                    }
                });
                if (action == 'delete' && !canDel) {
                    tipMessage(`发布状态下不允许删除`, 'warning');
                    return;
                }
                this.caseInfoService[action](selected.map(it => it.id)).subscribe(
                    ok => {
                        tipMessage(`${actionName}成功`, 'success');
                        this.loadData(this.pagination);
                    },
                    err => tipMessage(`${actionName}失败`, 'error')
                );
            } else {
                this.modalService.confirm({
                    title: `确定要${actionName}选择的案例吗？`,
                    zIndex: 1003,
                    onOk: () => {
                        let canDel = true;
                        let hasArchived = false;
                        selected.forEach(c => {
                            if (c.isPublished == 'Y') {
                                canDel = false;
                            }
                        });
                        if (action == 'delete' && !canDel) {
                            tipMessage(`发布状态下不允许删除`, 'warning');
                            return;
                        }
                        this.caseInfoService[action](selected.map(it => it.id)).subscribe(
                            ok => {
                                tipMessage(`${actionName}成功`, 'success');
                                this.loadData(this.pagination);
                            },
                            err => tipMessage(`${actionName}失败`)
                        );
                    }
                });
            }
        }
    }

    publishCheck(selection: CaseInfo[], actionName: string) {
        let canNext = true;
        let infos = new Array();
        for (let index = 0; index < selection.length; index++) {
            let info = selection[index];
            if (actionName == "发布") {
                if (info.isPublished == "N") {
                    infos.push(info);
                }
            }
            if (actionName == "撤销发布") {
                if (info.isPublished == "Y") {
                    infos.push(info);
                }
            }
        }
        if (!infos || infos.length <= 0) {
            canNext = false;
            switch (actionName) {
                case "发布": tipMessage(`所选案例都处于发布状态，不能进行发布操作`, 'warning', 2000); break;
                case "撤销发布": tipMessage(`所选案例都处于未发布状态，不能进行撤销发布操作`, 'warning', 2000); break;
            }
        }
        return canNext;
    }
}
