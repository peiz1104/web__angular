import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';
import { HourService } from '../../../managementservice/hour.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
declare let $: any;
@Component({
    selector: 'spk-hourruleview',
    templateUrl: './hourruleview.component.html',
    styleUrls: ['./hourruleview.component.scss']
})
export class HourruleviewComponent implements OnInit {
    _searchForm: FormGroup;
    selection: any[] = [];
    spinning: boolean = false;
    testListData: any;
    ruleId: any;
    nowYear: any;
    isCarryover: any;
    isRunable: any;
    api: any;
    searchBy: {
        userGroupId?: any,
        displayName?: any,
        username?: any,
        phoneNumber?: any,
        email?: any,
    } = {}
    columns = [
        { title: '用户名', data: 'username' },
        { title: '姓名', data: 'displayName' },
        { title: '手机号', data: 'phoneNumber' },
        { title: '邮箱', data: 'email' },
        { title: '性别', tpl: 'sex', styleClass: 'text-center' },
        { title: '所属组织', tpl: 'group' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ]

    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private message: NzMessageService,
        private confirm: NzModalService,
        private service: HourService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            userGroupId: [],
            displayName: [],
            username: [],
            phoneNumber: [],
            email: []
        })
        this.routeInfo.params.subscribe(
            params => {
                this.ruleId = params.ruleId;
                this.nowYear = params.nowYear;
            }
        )
        this.routeInfo.data.subscribe(
            data => {
                // console.log(data, 'resolve');
                let nowdata = data.hourtaskdetail.years.filter((item) => {
                    return item.year == this.nowYear;
                })
                this.isCarryover = nowdata[0].isCarryover == 'false' ? false : true;
                this.isRunable = nowdata[0].isRunable;
            }
        )
        this.api = `/api/period/strategy/lookup-list/${this.nowYear}`
        this.loadData();
    }
    loadData(page?: Pagination<any>) {
        let params = {
            page: page && page.number || 0,
            size: page && page.size || 10,
        }
        if (this.searchBy.username) {
            params['username'] = this.searchBy.username;
        }
        if (this.searchBy.displayName) {
            params['displayName'] = this.searchBy.displayName;
        }
        if (this.searchBy.email) {
            params['email'] = this.searchBy.email;
        }
        if (this.searchBy.phoneNumber) {
            params['phoneNumber'] = this.searchBy.phoneNumber;
        }
        if (this.searchBy.userGroupId) {
            params['orgIds'] = this.searchBy.userGroupId.map(res => res.id);
        }
        this.spinning = true;
        this.service.getruleUserList(this.ruleId, params).subscribe(
            res => {
                this.spinning = false;
                this.testListData = res;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                $.toast({
                    icon: 'error',
                    text: err,
                    position: 'top-center',
                    allowToastClose: false,
                    hideAfter: 1000
                });
            }
        )
    }
    _submitForm($event, value) {
        $event.preventDefault();
        this.searchBy = value;
        // console.log(value);
        this.loadData();
    }
    mutipledelete(event) {
        if (this.selection.length == 0) {
            return $.toast({
                icon: 'error',
                text: '请选择要删除的项',
                position: 'top-center',
                allowToastClose: false,
                hideAfter: 1000
            });
        }
        let ids = this.getIds(this.selection);
        this.confirm.confirm({
            title: '删除',
            content: '确定要删除所选项？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk: () => {
                this.service.deleruleUser({ ids: ids }).subscribe(
                    res => {
                        $.toast({
                            icon: 'success',
                            text: '删除成功！',
                            position: 'top-center',
                            allowToastClose: false,
                            hideAfter: 1000
                        });
                        this.loadData();
                    },
                    error => {
                        $.toast({
                            icon: 'error',
                            text: error,
                            position: 'top-center',
                            allowToastClose: false,
                            hideAfter: 1000
                        });
                    }
                )
            },
            onCancel() { }
        })
    }
    singleDelete(ids) {
        this.confirm.confirm({
            title: '删除',
            content: '确定要删除所选项？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk: () => {
                this.service.deleruleUser({ ids: ids }).subscribe(
                    res => {
                        $.toast({
                            icon: 'success',
                            text: '删除成功',
                            position: 'top-center',
                            allowToastClose: false,
                            hideAfter: 1000
                        });
                        this.loadData();
                    },
                    error => {
                        $.toast({
                            icon: 'error',
                            text: error,
                            position: 'top-center',
                            allowToastClose: false,
                            hideAfter: 1000
                        });
                    }
                )
            },
            onCancel() { }
        })
    }
    // 添加学时规则学员
    refreshHourUser(value) {
        // console.log(value);
        if (value.length == 0) {
            return $.toast({
                icon: 'error',
                text: '你没有选择人员',
                position: 'top-center',
                allowToastClose: false,
                hideAfter: 1000
            });
        }
        let params = {
            year: this.nowYear,
            userIds: this.getIds(value)
        }
        this.service.addRuleUser(this.ruleId, params).subscribe(
            res => {
                $.toast({
                    icon: 'success',
                    text: '添加人员成功！',
                    position: 'top-center',
                    allowToastClose: false,
                    hideAfter: 1000
                });
                this.loadData();
            },
            err => {
                $.toast({
                    icon: 'error',
                    text: err,
                    position: 'top-center',
                    allowToastClose: false,
                    hideAfter: 1000
                });
            }
        )

    }
    getUserPath(value) {
        if (value) {
            if (value.indexOf(',') != -1 || value.indexOf('，') != -1) {
                return value.replace(/(\,|\，)/g, '/');
            } else {
                return value
            }
        } else {
            return '---'
        }
    }
    getIds(array: any[]) {
        let ids = [];
        array.forEach((item) => {
            ids.push(item.id);
        })
        return ids;
    }
}
