import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HourService } from '../../../managementservice/hour.service';
import { Pagination } from 'app/core/entity/pagination';
import { UserGroup } from './../../../entity/user-group';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip'
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
declare let $: any;
@Component({
    selector: 'spk-group-hour-list',
    templateUrl: './group-hour-list.component.html',
    styleUrls: ['./group-hour-list.component.scss']
})
export class GroupHourListComponent implements OnInit {
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    isTrue: boolean = false;
    nowDate: any = new Date().getFullYear();
    nowMonth: any = new Date().getMonth() + 1;
    searchBy: {
        userGroup?: any,
        year?: any,
        month?: any,
        userType?:any

    } = {};
    columns: any = [
        { title: '年份', data: 'year', styleClass: 'text-right' },
        { title: '月份', data: 'month', styleClass: 'text-right' },
        { title: '所属机构', tpl: 'userGroup',styleClass: 'text-left' },
        { title: '人员类型', tpl: 'typeCol', styleClass: 'text-center' },
        { title: '总人数', tpl: 'totalCountCol', styleClass: 'text-right' },
        { title: '通过人数', tpl: 'passCountCol', styleClass: 'text-right' },
        { title: '未通过人数', tpl: 'failCountCol', styleClass: 'text-right' },
        { title: '合格率', tpl: 'qualifieRateCol', styleClass: 'text-right' },
        { title: '查看明细', tpl: 'actions', styleClass: 'text-center' },
    ];

    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private message: NzMessageService,
        private hourservice: HourService,
        private fb: FormBuilder,
        private confirmServ: NzModalService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        let m = this.nowMonth
        if(this.nowMonth<10){
            m = '0'+ m;
        }
        this._searchForm = this.fb.group({ 
            userGroup: [null],
            year: [this.nowDate],
            month: m,
            userType:['pt']
        });
        this.searchBy.year = this.nowDate;
        this.searchBy.month = m;
        this.searchBy.userType = 'pt';
        this.authService.getCurrentUser().subscribe(
            user => {
                if(user.site.id == 30){ //是总公司人员
                    this.isTrue = true ;
                }
                if (user.managerGroup) {
                    this.searchBy.userGroup = user.managerGroup;
                    this._searchForm.get('userGroup').setValue(user.managerGroup)
                }
                this.loadData();

            }
        )
    }

    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.searchBy.userGroup != null) {
            if (Object.prototype.toString.call(this.searchBy.userGroup) == "[object Object]") {
                params['userGroupId'] = this.searchBy.userGroup.id;
            } else {
                params['userGroupId'] = this.searchBy.userGroup.map(it => it.id);
            }
        }
        if(null == this.searchBy.userGroup){
            if(!this.isTrue){
                this.spinning = false;
                return tipMessage('请选择组织！', 'warning', 4000);
            }
        }

        if (this.searchBy.year) {
            params['year'] = this.searchBy.year;
        } else {
            this.spinning = false;
            return tipMessage('请选择查询年份！', 'warning', 4000);
        }

        if (this.searchBy.month) {
            params['month'] = this.searchBy.month;
        }else {
            this.spinning = false;
            return tipMessage('请选择查询月份！', 'warning', 4000);
        }
        if (this.searchBy.userType) {
            params['type'] = this.searchBy.userType;
        }


        this.hourservice.getPeriodUserGroup(params).subscribe(
            res => {
                this.testListData = res;
                this.spinning = false;
            },
            err => {
                this.spinning = false;
                return tipMessage(err, 'warning', 4000);
            }
        )
    }


    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        this.searchBy = value;
        this.loadData();
        return;
    }
    // 导出
    export(event) {
            let params = { }
            if (this.searchBy.userGroup != null) {
                if (Object.prototype.toString.call(this.searchBy.userGroup) == "[object Object]") {
                    params['userGroupId'] = this.searchBy.userGroup.id;
                } else {
                    params['userGroupId'] = this.searchBy.userGroup.map(it => it.id);
                }
            }
            if(null == this.searchBy.userGroup){
                if(!this.isTrue){
                    this.spinning = false;
                    return tipMessage('请选择组织！', 'warning', 4000);
                }
            }
    
            if (this.searchBy.year) {
                params['year'] = this.searchBy.year;
            } else {
                this.spinning = false;
                return tipMessage('请选择查询年份！', 'warning', 4000);
            }
    
            if (this.searchBy.month) {
                params['month'] = this.searchBy.month;
            }else {
                this.spinning = false;
                return tipMessage('请选择查询月份！', 'warning', 4000);
            }
            if (this.searchBy.userType) {
                params['type'] = this.searchBy.userType;
            }

            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出吗？',
                zIndex: 1003,
                onOk: () => {
                    this.hourservice.exportUserGroupHour(params).subscribe(
                        res => {
                            // console.log(res);
                            let objfile = {
                                ...res,
                                fileName: '机构学时年度汇总统计'
                            }
                            tipMessage('导出成功', 'success', 3000);
                            this.loadData();
                            this.hourservice.downloadUserGroupHour(objfile);
                        },
                        error => {
                            return tipMessage(error, 'error', 3000);
                        }
                    )

                },
                onCancel() { }
            })

    }
    // 查看详情列表
    preview(id, year,moth,type) {
        let userType = JSON.stringify(type);
        window.localStorage.setItem('userType', userType);
        let month = JSON.stringify(moth);
        window.localStorage.setItem('month', month);
        this.route.navigate([`/classhour/grouphour/${id}/detaillist/${year}`])
    }
    // 获取选中的项的ids
    getids(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }


    //通过率计算
    qualifieRate(passcount, totalCount) {
        if (totalCount == 0) {
            return 0;
        } else {
            let passrate = passcount / totalCount * 100;
            if (passrate == 0) {
                return 0;
            } else {
                return passrate.toFixed(2);
            }
        }

    }

        // 所属机构处理
        namePath(str) {
            if (str) {
                return str.replace(/,/g, '/');
            } else {
                return "--";
            }
        }


}
