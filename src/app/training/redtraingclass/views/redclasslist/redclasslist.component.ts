/*
 * @Author: peimingjun
 * @Date: 2018-03-22 14:38:23
 * @Last Modified by: peimingjun
 * @Last Modified time: 2018-03-22 17:52:22
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ServiceService } from '../../service/service.service';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-redclasslist',
    templateUrl: './redclasslist.component.html',
    styleUrls: ['./redclasslist.component.scss']
})
export class RedclasslistComponent implements OnInit {
    _searchForm: FormGroup;
    spinning: boolean = false;
    selection: any[] = [];
    data: any;
    searchBy: {
        name?: any,
        isRelease?: any,
        startDate?: any,
        endDate?: any,
        userGroup?: any
    } = {};
    columns: any[] = [
        { title: '红班名称', tpl: 'name' },
        { title: '开始日期', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束日期', tpl: 'endDate', styleClass: 'text-center' },
        { title: '执行人', tpl: 'performers' },
        { title: '培训地点', data: 'address' },
        { title: '组织', tpl: 'group', styleClass: 'text-left' },
        { title: '状态', tpl: 'status', styleClass: 'text-center' },
        { title: '查看', tpl: 'actions', styleClass: 'text-center' },
    ];
    constructor(
        private redService: ServiceService,
        private confirmv: NzModalService,
        private router: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder
    ) { }
    // 初始化表单
    initSearchForm() {
        this._searchForm = this.fb.group({
            name: [],
            isRelease: [],
            startDate: [],
            endDate: [],
            userGroup: [null]
        });
    }
    // 加载数据
    loadData(page?: Pagination<any>) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        this.spinning = true;
        if (this.searchBy.endDate) {
            let m = new Date(this.searchBy.endDate).getFullYear();
            let y = new Date(this.searchBy.endDate).getTime();
            params['endDate'] = y;
        };
        if (this.searchBy.startDate) {
            let m = new Date(this.searchBy.startDate).getFullYear();
            let y = new Date(this.searchBy.startDate).getTime();
            params['startDate'] = y;
        };
        if (this.searchBy.name) {
            params['name'] = this.searchBy.name;
        };
        if (this.searchBy.isRelease) {
            params['isArchived'] = this.searchBy.isRelease;
        }
        if (this.searchBy.userGroup) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id)
        }
        this.redService.getRedList(params).subscribe(
            res => {
                // console.log(res);
                this.spinning = false;
                this.data = res;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                tipMessage(err);
            }
        )
    }
    ngOnInit() {
        this.initSearchForm();
        this.loadData();
    }

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.loadData();
        // console.log(value);
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
