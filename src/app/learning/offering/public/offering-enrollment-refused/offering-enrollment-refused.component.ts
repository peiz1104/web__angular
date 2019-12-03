import { FormGroup, FormBuilder } from '@angular/forms';
import { OfferingEnrollmentApiService } from './../../service/offering-enrollment-api.service';
import { Column } from 'console-ui-ng';
import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-offering-enrollment-refused',
    templateUrl: './offering-enrollment-refused.component.html',
    styleUrls: ['./offering-enrollment-refused.component.scss']
})
export class OfferingEnrollmentRefusedComponent implements OnInit {

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
        { title: '拒绝理由', data: 'reason' },
        { title: '审批人', data: 'approverDisplayName' },
        { title: '审批日期', tpl: 'approveDate' },
        // { title: '操作', tpl: 'actions', styleClass: 'text-right'},
    ];

    _searchForm: FormGroup;

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

    loadData(page?, params = {}) {
        params = this._searchForm ? this._searchForm.value : {};

        this.loading = true;
        this.offeringEnrollmentApi.getRefused(this.offeringId, params, page).subscribe(
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

    userExport(params = {}) {
        let rows = this.selection;
        params = this._searchForm ? this._searchForm.value : {};
        params["enrollResult"] = "refused";
        if (this.selection) {
            params["ids"] = rows.map(it => +it.userId);
        }
        this.exportShow = true;
        this.offeringEnrollmentApi.userExport(this.offeringId, params).subscribe(
            ok => {
                this.exportShow = false;
                this.userExcelDownload();
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
