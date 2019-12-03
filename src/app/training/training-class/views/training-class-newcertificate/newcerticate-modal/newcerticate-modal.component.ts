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


@Component({
    selector: 'spk-newcerticate-modal',
    templateUrl: './newcerticate-modal.component.html',
    styleUrls: ['./newcerticate-modal.component.scss']
})
export class NewcerticateModalComponent implements OnInit {

    @Output() cancel = new EventEmitter();
    @Output() ok = new EventEmitter();
    @Input() ugId;
    @Input() certIds: any;
    allData: any = {};
    columns: any = [
        { title: '证书名称', data: 'name', styleClass: 'text-left' },
        { title: '证书编号', data: 'certNumber', styleClass: 'text-left' },
        { title: '证书类型', data: 'certificateType.name', styleClass: 'text-left' },
        { title: '备注', data: 'remark', styleClass: 'text-left' },
        { title: '流水号长度', data: 'certFlowNumberLength', styleClass: 'text-right' },
    ];
    selection: any[];
    _searchForm: FormGroup;
    isVisibleTop: boolean = false;
    selectId: any = '';
    imgurl: any = '';
    constructor(
        private router: Router,
        public activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private certificateService: CertificateService,
        // private _message: NzMessageService
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
        this.certificateService.getCertificateList(this.ugId, params, page, this.certIds).subscribe(data => {
            this.allData = data;
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
        this.ok.emit(this.selection);
    }

}
