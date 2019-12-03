import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { PeriodApiService } from '../period-api.service';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

@Component({
    selector: 'spk-period-history',
    templateUrl: './period-history.component.html',
    styleUrls: ['./period-history.component.scss']
})
export class PeriodHistoryComponent implements OnInit {
    _searchForm: FormGroup;
    spinningUser: boolean = false;
    testListData: any;
    selectionUserGroup: any[] = [];
    userName: any;
    isVisible: boolean = false;
    year: any;
    nowDate: any = new Date().getFullYear();
    spinning: boolean = false;
    periodData: any;
    selection: any[] = [];
    accessType: any = '';
    userId: any;
    searchBy: {
        username?: string,
        displayName?: string,
        year?: any
    } = {};
    // 用户
    columns: any = [
        { title: '员工编号', tpl: 'username', styleClass: 'text-left' },
        { title: '员工姓名', tpl: 'displayName', styleClass: 'text-left' },
        { title: '年份', data: 'year', styleClass: 'text-center' },
        { title: '所属组织', tpl: 'userGroup', styleClass: 'text-left' },
        { title: '学时任务', tpl: 'periodTaskNumber', styleClass: 'text-center' },
        { title: '上年度结转学时', data: 'carriedForwardPeriod', styleClass: 'text-center' },
        { title: '本年度已获学时', data: 'hadPeriod', styleClass: 'text-center' },
        { title: '是否合格', tpl: 'qualified', styleClass: 'text-center' },
        { title: '查看明细', tpl: 'actions', styleClass: 'text-center' },
    ];
    columndetail = [
        { title: '培训名称', data: 'tbcName' },
        { title: '课程名称', data: 'courseName' },
        { title: '获取时间', tpl: 'createdDate' },
        { title: '类型', tpl: 'accessType' },
        { title: '学时', data: 'periodNumber' },
        { title: '描述', data: 'description', styleClass: 'fixwidth' },

    ];
    constructor(
        private confirmSer: NzModalService,
        private service: PeriodApiService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            username: [],
            displayName: [],
            year: [this.nowDate]
        });
        this.searchBy.year = this.nowDate;
        this.loadUserGoupData();
    }

    // 选择用户
    loadUserGoupData() {
        this.spinningUser = true;
        let params = {
            page: this.testListData ? this.testListData.number : 0,
            size: this.testListData ? this.testListData.size : 10,

        };

        if (this.searchBy.username) {
            params['user.username'] = this.searchBy.username;
        }
        if (this.searchBy.displayName) {
            params['user.displayName'] = this.searchBy.displayName;
        }
        if (this.searchBy.year) {
            params['year'] = this.searchBy.year;
        }
        this.service.getUserDetailPeriod(params).subscribe(
            obj => {
                this.testListData = obj;
                this.spinningUser = false;
                this.selectionUserGroup = [];
            },
            err => {
                this.spinningUser = false;
            }
        );
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log($event, value)
        this.searchBy = value;
        this.loadUserGoupData();
        return;
    }
    // load列表数据
    loadListData() {
        this.spinning = true;
        let params = {
            page: this.periodData ? this.periodData.number : 0,
            size: this.periodData ? this.periodData.size : 10,
            'user.id': this.userId
        }
        // console.log(this.accessType == '', 444)
        if (this.accessType && this.accessType != '') {
            params['accessType'] = this.accessType;
        }
        this.service.getperiodDetail(this.year, params).subscribe(
            res => {
                this.spinning = false;
                this.periodData = res;
                this.selection = [];
                // console.log(res, 'period');
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )
    }

    // 查看详情modal
    preview(row) {
        this.year = row.year;
        this.userId = row.user.id;
        this.userName = row.user.displayName;
        this.isVisible = true;
        this.loadListData();

    }
    // modal的显示影藏
    handleCancel(event) {
        this.isVisible = false;
        this.year = undefined;
        this.userName = undefined;
        this.userId = undefined;
    }
    handleOk(event) {
        this.isVisible = false;
        this.year = undefined;
        this.userName = undefined;
        this.userId = undefined;
    }
    // 导出学时历史
    exportPeriodHistory(event) {
        if (this.selectionUserGroup.length) {
            let ids = this.getids(this.selectionUserGroup);
            let params = {
                ids: ids,
            }
            if (this.searchBy.username) {
                params['user.username'] = this.searchBy.username;
            }
            if (this.searchBy.displayName) {
                params['user.displayName'] = this.searchBy.displayName;
            }
            if (this.searchBy.year) {
                params['year'] = this.searchBy.year;
            }
            this.confirmSer.confirm({
                title: '导出',
                content: '确定要导出所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.periodexportHour(params).subscribe(
                        res => {
                            let objfile = {
                                ...res,
                                fileName: '学时历史列表汇总'
                            }
                            this.service.periodDownload(objfile);
                            tipMessage('导出成功！', 'success');
                            this.loadUserGoupData();
                        }
                    )

                },
                onCancel() { }
            })
        } else {
            let params = {
            }
            if (this.searchBy.username) {
                params['user.username'] = this.searchBy.username;
            }
            if (this.searchBy.displayName) {
                params['user.displayName'] = this.searchBy.displayName;
            }
            if (this.searchBy.year) {
                params['year'] = this.searchBy.year;
            }
            this.confirmSer.confirm({
                title: '导出',
                content: '确定要导出全部',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.periodexportHour(params).subscribe(
                        res => {
                            let objfile = {
                                ...res,
                                fileName: '学时历史列表汇总'
                            }
                            this.service.periodDownload(objfile);
                            tipMessage('导出成功！', 'success');
                            this.loadUserGoupData();
                        }
                    )
                },
                onCancel() { }
            })
        }
    }
    // 学时某一年分详情导出
    exportPeriodYearHistory(event) {
        if (this.selection.length) {
            let ids = this.getids(this.selection);
            let params = {
                ids: ids,
                year: this.year,
                'user.id': this.userId,
                accessType: this.accessType
            }
            this.confirmSer.confirm({
                title: '导出',
                content: '确定要导出所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.periodexportDetailHour(params).subscribe(
                        res => {
                            let objfile = {
                                ...res,
                                fileName: '学时历史列表汇总'
                            }
                            this.service.periodDownload(objfile);
                            tipMessage('导出成功！', 'success');
                            this.loadUserGoupData();
                        }
                    )

                },
                onCancel() { }
            })
        } else {
            let ids = this.getids(this.selection);
            let params = {
                ids: ids,
                year: this.year,
                'user.id': this.userId,
                accessType: this.accessType
            }
            this.confirmSer.confirm({
                title: '导出',
                content: '确定要导出全部',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.periodexportDetailHour(params).subscribe(
                        res => {
                            let objfile = {
                                ...res,
                                fileName: '学时历史列表汇总'
                            }
                            this.service.periodDownload(objfile);
                            tipMessage('导出成功！', 'success');
                            this.loadUserGoupData();
                        }
                    )
                },
                onCancel() { }
            })
        }
    }
    // 获取ids
    getids(array: any[]) {
        let ids = [];
        array.map((item) => {
            ids.push(item.id)
        })
        return ids;
    }
    getFullPath(row) {
        if (row) {
            if (row.indexOf(',') !== -1 || row.indexOf('，') !== -1) {
                return row.replace(/\,|\，/g, '/')
            } else {
                return row;
            }
        } else {
            return '--'
        }
    }
}
