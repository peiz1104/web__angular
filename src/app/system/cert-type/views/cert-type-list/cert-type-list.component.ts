import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { CertType } from "./../../entity/cert-type";
import { CuiLayer, Column } from 'console-ui-ng';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CertTypeService } from "./../../service/cert-type.service";
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-cert-type-list',
    templateUrl: './cert-type-list.component.html',
    styleUrls: ['./cert-type-list.component.scss']
})
export class CertTypeListComponent implements OnInit {

    data: Pagination<CertType>;
    loading: boolean;
    selection: CertType[];
    columns: Column[] = [
        { title: '证书类型', data: 'name' },
        { title: '创建人', data: 'createdByDisplayName' },
        { title: '创建日期', tpl: 'lastModifiedDate' },
        { title: '标识', tpl: 'Identify' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' },
    ];

    searchBy: {
        name?: string
    } = {};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private certTypeService: CertTypeService,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.certTypeService.getAllOfPage(this.getSearchParams(), page).subscribe(
            data => {
                this.data = data;
                console.log(data)
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    delete(certType?: CertType, single_flag?: boolean) {
        this.batchOperate('delete', '删除', certType, single_flag);
    }

    private batchOperate(action: string, actionName: string, certType?: CertType, single_flag?: boolean) {
        let selected = certType ? [certType] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的类型`, 'warning')
            return;
        }

        if (single_flag) {
            this.certTypeService[action](selected.map(it => it.id)).subscribe(
                ok => {
                    tipMessage(`${actionName}成功`, 'success');
                    this.loadData();
                },
                err => tipMessage(err)
            );
        } else {
            this.modal.confirm({
                title: `确定要${actionName}选择的证书类型吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.certTypeService[action](selected.map(it => it.id)).subscribe(
                        ok => {
                            tipMessage(`${actionName}成功`, 'success');
                            this.loadData();
                        },
                        err => tipMessage(err, 'error')
                    );
                }
            });
        }
    }
    getSearchParams() {
        let params = {};
        if (this.searchBy.name) {
            params['name'] = this.searchBy.name;
            return params;
        }

        return null;
    }
}
