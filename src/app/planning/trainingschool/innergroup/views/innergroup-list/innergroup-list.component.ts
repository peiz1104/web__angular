import { Component, OnInit } from '@angular/core';
import { CuiLayer, Column } from 'console-ui-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from './../../../../../core/entity/pagination';
import { InnerGroupService } from './../../service/innergroup.service';
import { InnerGroup } from './../../entity/innergroup';
import { tipMessage } from 'app/account/entity/message-tip';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';


@Component({
    selector: 'spk-innergroup-list',
    templateUrl: './innergroup-list.component.html',
    styleUrls: ['./innergroup-list.component.scss']

})

export class InnerGroupListComponent implements OnInit {
    searchBy: {
        trainingSchoolId?: number;
        orgName?: string;
    } = {};
    innerGroup: InnerGroup;
    innerGroups: Pagination<InnerGroup>;
    selection: InnerGroup[];
    columns = [
        { title: '研修院名称', tpl: 'coltrainingschoolname', styleClass: 'text-center' },
        { title: '机构名称', tpl: 'colusergroupname', styleClass: 'text-center' },
        { title: '创建时间', tpl: 'colcreateddate', styleClass: 'text-center' },
        { title: '创建人', tpl: 'colcreatedby', styleClass: 'text-center' }
    ];
    inputValue: string;
    validateForm: FormGroup;
    innerGroupForm: FormGroup;
    loading: boolean = true;
    // 提交按钮加载标识，防止重复提交
    submitLoading: boolean;
    // 模态框显示
    citySelect: boolean = false;

    _submitForm = ($event, value) => {
        $event.preventDefault();
        this.searchBy.orgName = value.orgName;
        this.loadData();
    };

    _submitInnerGroupForm = ($event, value) => {
        $event.preventDefault();
        this.submitLoading = true;
        value.schoolId = this.searchBy.trainingSchoolId;
        this.innerGroupService.create(value).subscribe(
            c => {
                tipMessage('保存成功！', 'success');
                this.handleCancel();
                this.loadData();
            },
            e => {
                tipMessage('保存成功！', 'success');
                this.submitLoading = false;
            }
        );
    }


    constructor(
        private innerGroupService: InnerGroupService,
        private layer: CuiLayer,
        private fb: FormBuilder,
        private routerIonfo: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.submitLoading = false;
        this.searchBy.trainingSchoolId = this.routerIonfo.snapshot.params.id;
        this.validateForm = this.fb.group({
            orgName: ['', []]
        });
        this.innerGroupForm = this.fb.group({
            orgs: [null, []]
        });
        this.searchBy.orgName = '';
        this.loadData();
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.innerGroupService.getAllOfPage(this.getSearchParams(), page).subscribe(
            innerGroups => {
                this.innerGroups = innerGroups;
                this.loading = false;
            }
        );
    }

    getSearchParams() {
        if (this.searchBy) {
            let params = {};
            params['schoolId'] = this.searchBy.trainingSchoolId;
            params['orgName'] = this.searchBy.orgName;
            return params;
        }
        return null;
    }

    delete(innerGroup?: InnerGroup) {
        this.batchOperate('delete', '删除', innerGroup, false);
    }

    private batchOperate(action: string, actionName: string, innerGroup?: InnerGroup, keepFilter?: boolean) {
        let selected = innerGroup ? [innerGroup] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的辖内机构`, '', 4000);
            return;
        }
        this.layer.confirm(`确定要${actionName}选择的辖内机构吗？`, () => {
            this.innerGroupService[action](selected.map(it => it.id)).subscribe(
                ok => {
                    tipMessage(`${actionName}成功`, 'success');
                    this.loadData();
                },
                err => tipMessage(`${actionName}失败`)
            );
        });
    }

    showModle() {
        this.citySelect = true;
        this.submitLoading = false;
    }

    handleCancel() {
        this.citySelect = false;
        this.innerGroupForm = this.fb.group({
            orgs: [null, []]
        });
    }

}



