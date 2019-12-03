import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Pagination } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-redtrainscore',
    templateUrl: './redtrainscore.component.html',
    styleUrls: ['./redtrainscore.component.scss']
})
export class RedtrainscoreComponent implements OnInit {
    _searchForm: FormGroup;
    redId: any;
    spinning: boolean = false;
    selection: any[] = [];
    data: any;
    searchBy: {
        username?: any,
        name?: any,
        userGroup?: any,
        phoneNumber?: any
    } = {};
    columns: any[] = [
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'name' },
        { title: '手机号', tpl: 'phoneNumber', styleClass: 'text-center' },
        { title: '所属组织', tpl: 'group' },
        { title: '状态', tpl: 'status' },
        { title: '培训班成绩', data: 'score', styleClass: 'text-right' },
        // { title: '课时数', data: 'courseHoure', styleClass: 'text-right' }
    ];
    // 加载数据
    loadData(page?: Pagination<any>) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        this.spinning = true;
        if (this.searchBy.name) {
            params['displayName'] = this.searchBy.name;
        }
        if (this.searchBy.userGroup) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
        }
        if (this.searchBy.phoneNumber) {
            params['phoneNumber'] = this.searchBy.phoneNumber
        }
        if (this.searchBy.username) {
            params['username'] = this.searchBy.username;
        }
        this.service.getUserScoreList(this.redId, params).subscribe(
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
            phoneNumber: []
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
