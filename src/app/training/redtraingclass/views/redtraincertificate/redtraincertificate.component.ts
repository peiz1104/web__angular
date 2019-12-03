import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Pagination } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-redtraincertificate',
    templateUrl: './redtraincertificate.component.html',
    styleUrls: ['./redtraincertificate.component.scss']
})
export class RedtraincertificateComponent implements OnInit {
    _searchForm: FormGroup;
    redId: any;
    spinning: boolean = false;
    selection: any[] = [];
    data: any;
    searchBy: {
        username?: any,
        name?: any,
        userGroup?: any
    } = {};
    columns: any[] = [
        { title: '证书缩略图', tpl: 'img' },
        { title: '证书名称', data: 'certLib.name' },
        { title: '用户名', data: 'user.username', styleClass: 'text-left' },
        { title: '姓名', data: 'user.displayName', styleClass: 'text-left' },
        { title: '手机号', data: 'user.phoneNumber', styleClass: 'text-center' },
        { title: '所属单位', data: 'user.userGroup.name', styleClass: 'text-center' },
        // { title: '颁发状态', data: 'isAward', styleClass: 'text-center' }
    ];
    // 加载数据
    loadData(page?: Pagination<any>) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        this.spinning = true;
        this.service.getCertificateList(this.redId, params).subscribe(
            res => {
                this.data = res;
                this.spinning = false;
                this.selection = [];
            },
            err => {
                tipMessage(err);
                this.spinning = false;
            }
        )
    }
    // 初始化表单
    initSearchForm() {
        this._searchForm = this.fb.group({
            name: [],
            username: [],
            userGroup: [],
            phonenumber: []
        });
    }
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private service: ServiceService,
        private confirmv: NzModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.routeInfo.parent.params.subscribe(
            (params) => {
                this.redId = params.redId
            }
        )
        this.initSearchForm();
        this.loadData();
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.loadData();
        console.log(value);
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }

}
