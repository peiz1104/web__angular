/*
 * @Author: mozhengqian
 * @Date: 2017-11-28 10:37:22
 * @Last Modified by: mozhengqian
 * @Last Modified time: 2017-11-30 16:03:49
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination } from 'app/core/entity/pagination';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';

import { CertificateService } from 'app/library/service/certificate.service';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-certicate-modal',
    templateUrl: './certicate-modal.component.html',
    styleUrls: ['./certicate-modal.component.scss']
})

export class CerticateModalComponent implements OnInit {
    @Output() cancel = new EventEmitter();
    @Output() ok = new EventEmitter();
    @Input() certIds: any;
    allData: any = {};
    columns: any = [
        { title: '证书名称', data: 'name', styleClass: 'text-center' },
        { title: '流水号长度', data: 'certFlowNumberLength', styleClass: 'text-center' },
        { title: '证书类型', data: 'certificateType.name', styleClass: 'text-center' },
        { title: '备注', data: 'remark', styleClass: 'text-center' },
    ];
    selection: any[];
    _searchForm: FormGroup;
    isVisibleTop: boolean = false;
    selectId: any = '';
    imgurl: any = '';
    loading: boolean;
    constructor(
        private router: Router,
        public activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private certificateService: CertificateService,
    ) {
    }

    ngOnInit() {
        this._searchForm = this.fb.group({
            name: [''],
            // typeCode: [''],
            // subtypeCodemitedBy: [''],
            // diffCode: [''],
            // lastModifiedDate: [''],
        });
        this.loadData();
    }
    loadData(params?: any, page?: Pagination<any>) {
        this.loading = true;
    params = params || {};
    params['identify'] = "TRAININGCLASS";
        this.certificateService.getList(params, page, this.certIds).subscribe(data => {
            this.loading = false;
            this.allData = data;
        },
    err =>{
                this.loading = false;
            })
    }
    handleCancelTop = (e) => {
        console.log(e);
        this.isVisibleTop = false;
    }
    _submitForm($event, value) {
        $event.preventDefault();
        console.log(value);
        this.loadData(value);
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }
    delete(id) {
        this.certificateService.delete(id).subscribe(data => {
            console.log(data);
            this.loadData();
        });
    }
    goCancel() {
        console.log('回掉返回');
        this.cancel.emit();
    }
    goOk() {
        console.log(this.selection);
        if (this.selection) {
            this.ok.emit(this.selection);
        } else {
            tipMessage('请选择要添加的证书！');
        }
    }

}
