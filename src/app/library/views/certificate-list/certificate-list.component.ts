/*
 * @Author: mozhengqian
 * @Date: 2017-11-17 10:24:12
 * @Last Modified by: zhangyue
 * @Last Modified time: 2018-05-04 17:35:39
 */
import { Component, OnInit } from '@angular/core';
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
    selector: 'spk-certificate-list',
    templateUrl: './certificate-list.component.html',
    styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent implements OnInit {
    allData: any = {};
    columns: any = [
        { title: '证书名称', data: 'name' },
        { title: '流水号长度', data: 'certFlowNumberLength' },
        { title: '证书类型', data: 'certificateType.name' },
        { title: '状态', tpl: 'isUsed' },
        // { title: '编辑模板', tpl: 'editTemplate' },
        // { title: '操作', tpl: 'option' },
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
        private modal: NzModalService
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
    loadData(page?: Pagination<any>) {
        let params = this._searchForm.value;
        this.loading = true;
        if (this._searchForm.value.name.trim().length == 0) {
            params = null;
        }
        this.certificateService.getAllOfPage(params, page).subscribe(data => {
            console.log(data);
            this.allData = data;
            this.loading = false;
        },
            err => {
                this.loading = false;
            })
    }
    handleCancelTop = (e) => {
        console.log(e);
        this.isVisibleTop = false;
    }
    _submitForm($event, value) {
        $event.preventDefault();
        this.loadData($event);
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
        this.certificateService.delete(id).subscribe(
          ok => {
                        tipMessage(`删除成功`, 'success');
            this.loadData();
          },
                    err => tipMessage(`删除失败`)
        );
/*     this.modal.confirm({
      title: `确定要删除此证书吗？`,
      onOk: () => {

            }
    }); */
    }
    goEdit(row) {
        // if(row.isUsed){
        //   this.modal.warning({
        //     title: `此证书已经被使用，不可编辑，请新建证书！`
        //   });
        //   return;
        // }
        this.router.navigate([`/library/certificate/${row.id}/edit`]);
    }
    goMubanEdit(row) {
        // console.log(row);
        // if(row.isUsed){
        //   this.modal.warning({
        //     title: `此证书已经被使用，不可编辑，请新建证书！`
        //   });
        //   return;
        // }
        this.router.navigate([`/library/certificate/template/${row.id}`, {
            imgUrlPath: row.imgUrlPath ? row.imgUrlPath : ''
        }]);
    }

}
