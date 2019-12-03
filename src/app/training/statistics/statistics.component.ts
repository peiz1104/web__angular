import { setTimeout } from 'timers';
import { Pagination } from 'app/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';
import { StatisticsService } from './../service/statistics.service';
import { AuthService } from '../../core/auth/auth.service';


@Component({
    selector: 'spk-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
    _searchForm: FormGroup;
    spinning: boolean = false;
    selection: any[] = [];
    data: any;
    nowYear = new Date();
    searchBy: {
        trainClassName?: any,
        username?: any,
        displayName?: any,
        startDate?: any,
        endDate?: any,
        userGroupId?: any
    } = {};
    load: boolean = false;
    @ViewChild('tableHandle') tableHandle;
    columns: any[] = [
        { title: 'BID', data: 'bid' },
        { title: '所属组织', data: 'userGroupName' },
        { title: '培训班ID', data: 'trainClassId' },
        { title: '培训班名称', tpl: 'name' },
        { title: '开始日期', tpl: 'startDate' },
        { title: '结束日期', tpl: 'endDate' },
        { title: '用户名', data: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '身份证号', data: 'idcardNumber' },
        { title: '易学堂是否推送', data: 'pushStatus' },
        { title: '成绩', data: 'scroe' },
        { title: '缺勤次数', data: 'absenceCount' },
        { title: '是否通过', data: 'passStatus' },
        { title: '推送AMIS反馈结果', data: 'result' },
    ];
    constructor(
        private statService: StatisticsService,
        private confirmv: NzModalService,
        private router: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService
    ) { }
    // 初始化表单
    initSearchForm() {
        this._searchForm = this.fb.group({
            trainClassName: [],
            username: [],
            displayName: [],
            startDate: [],
            endDate: [],
            userGroupId: [null],
        });
    }
    ngOnInit() {
        this.initSearchForm();
        this.tableHandle.isComplexSearch = true
        this.authService.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.userGroupId = [user.managerGroup];
                    this._searchForm.get('userGroupId').setValue([user.managerGroup])
                }
            }
        )
    }

    // 加载数据
    loadData(page?: Pagination<any>) {
        this.searchBy = this._searchForm.value;
        let params = {
            ...this.searchBy,
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
        }
        if (this.searchBy.userGroupId) {
            params['userGroupId'] = this.searchBy.userGroupId.map(it => it.id)
        }
        this.statService.getStatList(params).subscribe(
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

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        if (this.searchBy.startDate && this.searchBy.userGroupId.length > 0) {
            this.loadData();
        } else {
            tipMessage('所属组织与开始时间必填！');
        }
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
    // 导出数据
    exportData() {
        let params = {
            ...this.searchBy,
        };
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
        if (this.searchBy.userGroupId) {
            params['userGroupId'] = this.searchBy.userGroupId.map(it => it.id)
        }
        // console.log(params, 444);
        this.load = true;
        this.statService.exportDatas(params).subscribe(
            ok => {
                this.load = false;
                let name = ok.sessionName;
                // tslint:disable-next-line:max-line-length
                let url;
                if (!window.location.origin) {
                    // tslint:disable-next-line:max-line-length
                    url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                } else {
                    url = window.location.origin;
                }
                window.open(`${url}/api/period/push/situation/exportdownload?sessionName=${name}&fileName=推送AMIS情况统计表`, '_blank')
            },
            err => {
                this.load = false;
                tipMessage(err);
            }
        )
    }
}
