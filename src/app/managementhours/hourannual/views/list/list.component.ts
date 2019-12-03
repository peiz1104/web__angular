import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HourService } from '../../../managementservice/hour.service';
import { Pagination } from 'app/core/entity/pagination';
import { UserGroup } from './../../../entity/user-group';
import { AuthService } from 'app/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
declare let $: any;
@Component({
    selector: 'spk-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    columns: any = [
        { title: '工号', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '年份', data: 'year', styleClass: 'text-center' },
        { title: '所属组织', tpl: 'userGroup' },
        { title: '学时任务', tpl: 'periodTaskNumber', styleClass: 'text-right' },
        { title: '上年度结转学时', data: 'carriedForwardPeriod', styleClass: 'text-right' },
        { title: '本年度已获学时', data: 'hadPeriod', styleClass: 'text-right' },
        { title: '是否合格', tpl: 'qualified', styleClass: 'text-center' },
        { title: '查看明细', tpl: 'actions', styleClass: 'text-center' },
    ];
    columnscarried: any = [
        { title: '工号', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '年份', data: 'year', styleClass: 'text-center' },
        { title: '所属组织', tpl: 'userGroup' },
        { title: '学时任务', tpl: 'periodTaskNumber', styleClass: 'text-right' },
        // { title: '上年度结转学时', data: 'carriedForwardPeriod', styleClass: 'text-right' },
        { title: '本年度已获学时', data: 'hadPeriod', styleClass: 'text-right' },
        { title: '是否合格', tpl: 'qualified', styleClass: 'text-center' },
        { title: '查看明细', tpl: 'actions', styleClass: 'text-center' },
    ];
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    nowDate: any = new Date().getFullYear();
    currentSiteId: number;
    searchBy: {
        username?: string,
        displayName?: string,
        userGroup?: UserGroup[],
        year?: any,
        isStandard?: any
    } = {};
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.searchBy.userGroup != null) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
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
        if (this.searchBy.isStandard == 1 || this.searchBy.isStandard == 0 || this.searchBy.isStandard == -1) {
            params['isStandard'] = this.searchBy.isStandard
        }
        // console.log(params, 333)
        this.hourservice.getstaffhourView(params).subscribe(
            res => {
                // console.log(res);
                this.testListData = res;
                this.spinning = false;
            },
            err => {
                this.spinning = false;
                return this.tipMessage('error', err);
            }
        )
    }
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private message: NzMessageService,
        private hourservice: HourService,
        private fb: FormBuilder,
        private confirmServ: NzModalService,
        private authService: AuthService
    ) {

    }

    ngOnInit() {
        this._searchForm = this.fb.group({
            username: [],
            displayName: [],
            userGroup: [null],
            year: [this.nowDate],
            isStandard: ['']
        });
        this.searchBy.year = this.nowDate;
        this.searchBy.username = '';
        this.searchBy.displayName = '';
        this.authService.getCurrentUser().subscribe(
            user => {
                if (user.site) {
                    this.currentSiteId = user.site.id;
                }
                // console.log(user, 223)
                if (user.managerGroup) {
                    this.searchBy.userGroup = [user.managerGroup];
                    this._searchForm.get('userGroup').setValue([user.managerGroup])
                }
                this.loadData();

            }
        )
    }

    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log($event, value)
        this.searchBy = value;
        this.loadData();
        return;
    }
    // 导出
    export(event) {
        if (this.selection.length) {
            let ids = this.getids(this.selection);
            let params = {
                ids: ids
            }
            if (this.searchBy.userGroup != null) {
                params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
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
            if (this.searchBy.isStandard == 1 || this.searchBy.isStandard == 0 || this.searchBy.isStandard == -1) {
                params['isStandard'] = this.searchBy.isStandard
            }
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.hourservice.exportHour(params).subscribe(
                        res => {
                            // console.log(res);
                            let objfile = {
                                ...res,
                                fileName: '学员学时年度汇总统计'
                            }
                            this.tipMessage('success', '导出成功！');
                            this.loadData();
                            this.hourservice.exportdownloadHour(objfile);
                        },
                        error => {
                            return this.tipMessage('error', error);
                        }
                    )
                },
                onCancel() { }
            })
        } else {
            let ids = this.getids(this.selection);
            let params = {
                ids: ids
            }
            if (this.searchBy.userGroup != null) {
                params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
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
            if (this.searchBy.isStandard == 1 || this.searchBy.isStandard == 0 || this.searchBy.isStandard == -1) {
                params['isStandard'] = this.searchBy.isStandard
            }
            if (this.searchBy.userGroup != null) {
                params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
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
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出全部？',
                zIndex: 1003,
                onOk: () => {
                    this.hourservice.exportHour(params).subscribe(
                        res => {
                            // console.log(res);
                            let objfile = {
                                ...res,
                                fileName: '学员学时年度汇总统计'
                            }
                            this.tipMessage('success', '导出成功');
                            this.loadData();
                            this.hourservice.exportdownloadHour(objfile);
                        },
                        error => {
                            return this.tipMessage('error', error);
                        }
                    )

                },
                onCancel() { }
            })
        }

    }
    // 查看详情列表
    preview(id, year) {
        this.route.navigate([`/classhour/hourannual/${id}/detaillist/${year}`])
    }
    // 获取选中的项的ids
    getids(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }

    tipMessage(type: string, text: string, duration?: number) {
        $.toast({
            icon: type,
            text: text,
            position: 'top-center',
            allowToastClose: false,
            hideAfter: duration || 1000
        })
    }

}
