import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Pagination } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-redtrainfee',
    templateUrl: './redtrainfee.component.html',
    styleUrls: ['./redtrainfee.component.scss']
})
export class RedtrainfeeComponent implements OnInit {
    _searchForm: FormGroup;
    redId: any;
    spinning: boolean = false;
    selection: any[] = [];
    data: any;
    searchBy: {
        feename?: any,
    } = {};
    columns: any[] = [
        { title: '费用类型', tpl: 'feeType' },
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '手机号', tpl: 'phoneNumber' },
        { title: '描述信息', data: 'description' },
        { title: '费用金额（元）', data: 'fee', styleClass: 'text-right' },
    ];
    // 加载数据
    loadData(page?: Pagination<any>) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.searchBy.feename) {
            params['apportionType'] = this.searchBy.feename;
        }
        this.spinning = true;
        this.service.getTrainFeeList(this.redId, params).subscribe(
            res => {
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
    // 初始化表单
    initSearchForm() {
        this._searchForm = this.fb.group({
            feename: []
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
        this.initSearchForm()
        this.loadData();
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.loadData();
        console.log(value);
    }

}
