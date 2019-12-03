import { UserGroup } from './../../../system/entity/user-group';
import { Category } from './../../../system/category/entity/category';
import { Component, OnInit } from '@angular/core';
import { isArray } from "util";
import { Documentlib } from "app/library/entity/documentlib";
import { DocumentLibService } from "app/library/service/documentLib.service";
import { Pagination } from "app/core";
import { Column, CuiLayer } from 'console-ui-ng';
import { DocumentInfo } from 'app/library/entity/document-info';
import { NzModalService } from 'ng-zorro-antd';
import { MaterialPreviewComponent } from '../../../learning/material/views/material-preview/material-preview.component';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
    document: Documentlib = new Documentlib();
    category: Category = new Category();
    userGroup: UserGroup = new UserGroup();
    documentInfo: DocumentInfo = new DocumentInfo();
    documents: Pagination<Documentlib>;
    checkDocuments: Documentlib[];
    columns: Column[];
    loading: boolean = true;
    size: number = 10;

    constructor(
        private documentService: DocumentLibService,
        private modalService: NzModalService,
        private layer: CuiLayer,
        private modal: NzModalService,
    ) { }

    ngOnInit() {
        this.columns = [
            { title: '文档名称', tpl: 'nameCol' },
            { title: '所属分类', data: 'categoryName' },
            { title: '所属组织', data: 'userGroupName' },
            { title: '发布状态', tpl: 'publishCol', styleClass: 'text-center' },
            { title: '转码状态', tpl: 'convertStatusCol', styleClass: 'text-center' },
            // { title: '是否精品', tpl: 'excellentCol', styleClass: 'text-center' },
            { title: '', tpl: 'rowAction', styleClass: 'text-right' },
        ]

        this.searchDocument();
    }

    reload(page: Pagination<Documentlib>) {
        this.size = page.size;
        this.searchDocument(page);
    }

    searchDocument(page?) {
        this.loading = true;
        page = page ? page : { "size": this.size, "number": 0 };
        console.log(this.getSearchParams())
        this.documentService.getAllOfPage(this.getSearchParams(), page).subscribe(
            it => {
                this.documents = it;
                this.loading = false;
            }
        );
    }

    getSearchParams() {
        if (this.document) {
            let params = {};
            params['name'] = this.document.name;
            params['isPublished'] = this.document.isPublished;
            params['isExcellent'] = this.document.isExcellent;
            if (this.documentInfo.transcodeStatus) {
                params['documentInfo.transcodeStatus'] = this.documentInfo.transcodeStatus;
            }
            if (this.category && this.category.id) {
                params['category.id'] = this.category.id;
            }
            if (this.userGroup && this.userGroup.id) {
                params['userGroup.id'] = this.userGroup.id;
            }
            return params;
        }
        return null;
    }

    preview(dinfoId) {
        this.open('文档预览', MaterialPreviewComponent, {
            componentParams: {
                documentInfoId: dinfoId,
            },
            width: 1000,
            wrapClassName: 'vertical-center-modal ant-modal',
            onOk: () => {
            }
        });
    }

    open(title, content, extConfig?) {
        const defaultConfig = {
            title: title,
            content: content,
            style: 'top: 0;',
            width: 800,
            zIndex: 1003,
            footer: false,
            maskClosable: false,
            componentParams: {
            }
        };
        const config = { ...defaultConfig, ...extConfig };
        return this.modalService.open(config);
    }

    delete(document?: Documentlib, single_flag?: boolean) {
        this.batchOperate('delete', '删除', document, single_flag);
    }

    publish(document?: Documentlib, single_flag?: boolean) {
        this.batchOperate('publish', '发布', document, single_flag);
    }

    disPublish(document?: Documentlib, single_flag?: boolean) {
        this.batchOperate('disPublish', '撤销发布', document, single_flag);
    }

    excellent(document?: Documentlib) {
        this.batchOperate('excellent', '设为精品', document, false);
    }

    disExcellent(document?: Documentlib) {
        this.batchOperate('disExcellent', '撤销精品', document, false);
    }

    private batchOperate(action: string, actionName: string, document?: Documentlib, single_flag?: boolean) {
        let selected = document ? [document] : this.checkDocuments;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的文档`, 'warning');
            return;
        }

        if (single_flag) {
            this.documentService[action](selected.map(it => it.id)).subscribe(
                ok => {
                    tipMessage(`${actionName}成功`, 'success');
                    this.searchDocument();
                },
                err => tipMessage(`${actionName}失败`, 'error')
            );
        } else {
            this.modal.confirm({
                title: `确定要将选择的文档${actionName}吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.documentService[action](selected.map(it => it.id)).subscribe(
                        ok => {
                            tipMessage(`${actionName}成功`, 'success');
                            this.searchDocument();
                        },
                        err => tipMessage(`${actionName}失败`)
                    );
                }
            })
        }
    }

    clearSearchText() {
        this.document.name = null;
        this.document.isExcellent = null;
        this.document.isPublished = null;
        if (this.category) {
            this.category = new Category();
        }
        if (this.category) {
            this.userGroup = new UserGroup();
        }
        if (this.documentInfo) {
            this.documentInfo.transcodeStatus = null;
        }
    }
}
