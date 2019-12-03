import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OfferingEnrollmentApiService } from './../../service/offering-enrollment-api.service';
import { Column } from 'console-ui-ng';
import { Component, OnInit, Input } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-offering-enrollment-applied',
    templateUrl: './offering-enrollment-applied.component.html',
    styleUrls: ['./offering-enrollment-applied.component.scss']
})
export class OfferingEnrollmentAppliedComponent implements OnInit {

    @Input() offeringId: number;

    data;
    selection: any[];
    loading: boolean = false;
    exportShow: boolean = false;
    columns: Column[] = [
        { title: '用户名', data: 'userUsername' },
        { title: '姓名', data: 'userDisplayName' },
        { title: '所属组织', tpl: 'userUserGroupName' },
        { title: '注册方式', tpl: 'enrollType' },
        { title: '注册状态', tpl: 'enrollStatus' },
        { title: '发起时间', tpl: 'createdDate' },
        { title: '更新者', data: 'lastModifiedByDisplayName' },
        { title: '更新日期', tpl: 'lastModifiedDate' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' },
    ];

    _searchForm: FormGroup;

    approveModalVisible: boolean = false;
    approveConfirmLoading: boolean = false;
    approveMessage;

    _approveForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private offeringEnrollmentApi: OfferingEnrollmentApiService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.loadData();
        this.initSearchForm();
    }

    initSearchForm() {
        this._searchForm = this.fb.group({
            'enrollType': [''],
            'searchText': []
        });
    }

    initApproveForm(ids) {
        this._approveForm = this.fb.group({
            ids: [ids, Validators.required],
            status: ['ENROLLED', Validators.required],
            reason: []
        });
    }

    loadData(page?, params = {}) {
        params = this._searchForm ? this._searchForm.value : {};

        this.loading = true;
        this.offeringEnrollmentApi.getApplied(this.offeringId, params, page).subscribe(
            data => {
                this.data = data;
                this.loading = false;
                this.exportIsShow();
            },
            err => {
                this.loading = false;
            }
        );
    }

    exportIsShow() {
        if (!this.data || !this.data.totalElements || this.data.totalElements <= 0) {
            this.exportShow = true;
        } else {
            this.exportShow = false;
        }
    }

    approve(row?) {
        let rows = row ? [row] : this.selection;

        if (!rows || rows.length <= 0) {
            tipMessage('请选择要审批的请求');
            return;
        }

        let ids = rows.map(it => it.id);
        this.initApproveForm(ids);
        this.approveMessage = '';
        this.approveConfirmLoading = false;
        this.approveModalVisible = true;
    }

    approveOk(e) {
        if (this._approveForm.invalid) {
            this.approveMessage = '审批信息有误，请更正后重试';
            return;
        }

        console.log(this._approveForm.value);

        this.approveConfirmLoading = true;
        this.offeringEnrollmentApi.approve(this.offeringId, this._approveForm.value).subscribe(
            ok => {
                tipMessage('审批成功', 'success');
                this.loadData(this.data);
                this.approveConfirmLoading = false;
                this.approveModalVisible = false;
            },
            err => {
                this.approveMessage = '审批失败，' + err;
                this.approveConfirmLoading = false;
            }
        );
    }

    approveCancel(e) {
        this.approveConfirmLoading = false;
        this.approveModalVisible = false;
    }

    userExport(params = {}) {
        let rows = this.selection;
        params = this._searchForm ? this._searchForm.value : {};
        params["enrollResult"] = "applied";
        if (this.selection) {
            params["ids"] = rows.map(it => +it.userId);
        }
        this.exportShow = true;
        this.offeringEnrollmentApi.userExport(this.offeringId, params).subscribe(
            ok => {
                this.userExcelDownload();
                this.exportShow = false;
            },
            err => {
                tipMessage(err);
                this.exportShow = false;
            }
        );
    }

    userExcelDownload() {
        this.exportShow = false;
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        window.open(`${url}/api/offering/${this.offeringId}/enrollments/userExport/download`, '_blank');
    }
    getNamePath(value) {
        if (value) {
          return value.split(',').join(' / ');
        }
    }
}
