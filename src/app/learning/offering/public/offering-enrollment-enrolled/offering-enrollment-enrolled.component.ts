import { FormGroup, FormBuilder } from '@angular/forms';
import { OfferingEnrollmentApiService } from './../../service/offering-enrollment-api.service';
import { Column } from 'console-ui-ng';
import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-offering-enrollment-enrolled',
    templateUrl: './offering-enrollment-enrolled.component.html',
    styleUrls: ['./offering-enrollment-enrolled.component.scss']
})
export class OfferingEnrollmentEnrolledComponent implements OnInit {

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
        { title: '更新者', data: 'lastModifiedByDisplayName' },
        { title: '更新日期', tpl: 'lastModifiedDate' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' },
    ];

    _enrollTypes = [
        { label: '必修', value: 'REQUIRED' },
        { label: '选修', value: 'OPEN' },
        { label: '审批', value: 'CLOSED' },
        { label: '购买', value: 'BUY' },
    ];

    _searchForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private offeringEnrollmentApi: OfferingEnrollmentApiService,
        private message: NzMessageService,
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

    exportIsShow() {
        if (!this.data || !this.data.totalElements || this.data.totalElements <= 0) {
            this.exportShow = true;
        } else {
            this.exportShow = false;
        }
    }

    loadData(page?, params = {}) {
        params = this._searchForm ? this._searchForm.value : {};
        console.log("查询参数为", params);

        this.loading = true;
        this.offeringEnrollmentApi.getEnrolled(this.offeringId, params, page).subscribe(
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

    userExport(params = {}) {
        let rows = this.selection;
        params = this._searchForm ? this._searchForm.value : {};
        params["enrollResult"] = "enrolled";
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
