import { AuthService } from 'app/core';
import { UserGroupService } from './../../service/user-group.service';
import { UserGroup } from 'app/system/entity/user-group';
import { Pagination } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { UserChinaLifeService } from '../../service/user-china-life.service';
import { User } from '../../entity/user';
import { CuiPagination, PaginationModel } from 'console-ui-ng';
import { Column } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { CurrentUserGroup } from '../user-manage-index/user-manage-index.component';
import { tipMessage } from "app/account/entity/message-tip";

import * as _ from 'lodash';

const { isArray } = _;
@Component({
    selector: 'spk-user-list-new',
    templateUrl: './user-list-new.component.html',
    styleUrls: ['./user-list-new.component.scss']
})
export class UserListNewComponent implements OnInit {
    users: User[];
    pagination: CuiPagination;
    columns: Column[];

    selected;
    searchtext;
    username;
    phoneNumber;
    email;
    iDcardNumber;
    userId: any;
    isComplexSearch = false;
    inputValue: any = 888888;
    displayName: any = '';
    showTip: boolean = true;
    target: any;
    loading: boolean = false;
    isVisible: boolean = false;
    ugSearchText;
    groupId: number;
    ugSearchResult: Pagination<UserGroup>;
    exportShow: boolean = false;
    withChildGroup: boolean = true;
    searchUsers: User = new User();

    constructor(private userService: UserChinaLifeService,
        private route: Router,
        private confrim: NzModalService,
        private currentUserGroup: CurrentUserGroup,
        private authService: AuthService,
        private userGroupApi: UserGroupService) {
        this.columns = [
            { title: 'ID', data: 'id', visible: false },
            { title: '用户名', data: 'username' },
            { title: '姓名', data: 'displayName' },
            { title: '手机号', data: 'phoneNumber' },
            { title: '邮箱', data: 'email' },
            { title: '性别', tpl: 'sex' },
            { title: '所属组织', tpl: 'userGroup', visible: true },
            { title: '开始日期', data: 'startDate', visible: false },
            { title: '到期日期', data: 'endDate', visible: false },
            // { title: '状态', data: 'status', tpl: 'statusCol' }
        ];
        this.currentUserGroup.isFold = false;
    }


    ngOnInit() {
        this.currentUserGroup.current().subscribe(ug => {
            this.target = ug;
            if (ug && ug['type'] != 'SITE') {
                this.loadData();
            } else {
                this.users = null;
            }
        });
    }

    loadData(page?: CuiPagination) {
        this.pagination = page || this.pagination;
        // console.log(page);
        let params = {
            // 'userGroup.id': this.userGroup && this.userGroup.id && this.userGroup['type'] == 'USER_GROUP' ? this.userGroup.id : '',
            searchtext: this.searchtext,
            page: this.pagination ? this.pagination.number : 0,
            size: this.pagination ? this.pagination.size : 10,
            sort: this.pagination && this.pagination.sort ? this.pagination.sort : '',
            withChildGroup: true
        };
        if (this.username) {
            params['username'] = this.username;
        }
        if (this.displayName) {
            params['displayName'] = this.displayName;
        }
        if (this.phoneNumber) {
            params['phoneNumber'] = this.phoneNumber;
        }
        if (this.email) {
            params['email'] = this.email;
        }
        if (this.iDcardNumber) {
            params['iDCardNumber'] = this.iDcardNumber;
        }
        if (this.target && this.target['id']) {
            if (this.target['type'] == 'SITE') {
                params['site.id'] = this.target['id'];
            }

            if (this.target['type'] == 'USER_GROUP') {
                params['userGroup.id'] = this.target['id'];
            }
        }

        this.loading = true;
        this.userService.users(params).subscribe(
            pag => {
                this.pagination = pag;
                this.users = pag.content;
                this.loading = false;
            }
        );
    }

    resetpassword(event, value) {
        this.displayName = value.displayName;
        this.isVisible = true;
        this.userId = value.id;
    }

    handleCancel(event) {
        this.isVisible = false;
        this.inputValue = 888888;
        this.showTip = true;
    }
    handleOk(event) {
        // console.log(this.showTip, 2222)
        if (this.showTip == true) {
            this.userService.updatePass(this.userId, this.inputValue).subscribe(
                res => {
                    // console.log(res, 4432);
                    this.isVisible = false;
                    this.inputValue = 888888;
                    this.displayName = undefined;
                    return tipMessage('重置密码成功!', 'success', 3000);
                },
                err => {
                    return tipMessage(err, 'error');
                }
            )
        } else {
            return tipMessage('请填写正确密码！', 'error');
        }

    }

    onSelect(selIds: any[]) {
        // console.log(selIds);
        this.selected = selIds;
    }

    delete(id?) {
        let ids = id ? [id] : this.selected;

        if (!ids) {
            tipMessage('请选择要删除的用户', 'error');
        }

        this.confrim.confirm(
            {
                title: '确认要删除选中的用户吗？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.userService.delete(ids).subscribe(
                        () => {
                            tipMessage('删除成功', 'success');
                            this.loadData();
                        },
                        err => { }
                    );
                },
                onCancel() { }

            }


        );
    }
    handelLink = () => {
        if (this.target && this.target['id'] && this.target['type'] == 'USER_GROUP') {
            this.userService.userGroupIsOk(this.target['id']).subscribe(
                res => {
                    if (res.isOk) {
                        this.route.navigate(['/system/user/importchinalife'], { queryParams: { userGroupId: this.target['id'] } });
                    } else {
                        return tipMessage('请选择AMIS、BMIS、GMIS、TMIS、SAP的下级组织！', 'error');
                    }
                },
                err => {
                    tipMessage(err, 'error');
                }
            )
        } else {
            return tipMessage('请选择组织！', 'error');
        }
    }

    // 去新增页面
    toAdd() {
        if (this.target && this.target['id'] && this.target['type'] == 'USER_GROUP') {
            this.userService.userGroupIsOk(this.target['id']).subscribe(
                res => {
                    if (res.isOk) {
                        let target = JSON.stringify(this.target)
                        window.localStorage.setItem('target', target);
                        this.route.navigate(['/system/user/addchinalife']);
                    } else {
                        return tipMessage('请选择AMIS、BMIS、GMIS、TMIS、SAP的下级组织！', 'error');
                    }

                },
                err => {
                    return tipMessage(err, 'error');
                }
            )
        } else {
            return tipMessage('请选择组织！', 'error');
        }
    }

    onUgSelectionChange(items) {
        items = items && isArray(items) ? items : (items ? [items] : []);
        let ug = items[0];
        this.target = ug;
        this.loadData();
    }

    onUserGroupSearch(searchText) {
        if (searchText) {
            this.userGroupApi.search(searchText, 0, 20).subscribe(
                ugs => {
                    this.ugSearchResult = ugs;
                }
            )
        } else {
            this.ugSearchResult = null;
        }
    }
    // 编辑用户
    edituser(id) {
        this.route.navigate([`/system/user/${id}/editchinalife`])
    }
    _console(event) {

        if (/^[a-zA-Z0-9]{6,18}$/.test(event)) {
            this.showTip = true;
            this.inputValue = event;
        } else {
            this.showTip = false;
        }
        // console.log(event, 3332)
    }

    getPath(ug: UserGroup) {
        if (!ug) {
            return null;
        }
        if (ug.namePath) {
            return ug.namePath.split(',');
        } else {
            return [ug.name];
        }
    }

    // tslint:disable-next-line:member-ordering
    siteId: number;
    // tslint:disable-next-line:member-ordering
    userGroupId: number;
    // tslint:disable-next-line:member-ordering
    search: string;
    exportIsShow() {
        if (!this.pagination || !this.pagination.totalElements || this.pagination.totalElements <= 0) {
            this.exportShow = true;
        } else {
            this.exportShow = false;
        }
    }
    userExport() {
        this.exportShow = true;
        let params = {};
        if (this.isComplexSearch) { // 如果是复杂查询
            params = this.getUserParams();
        } else {
            params = { searchtext: this.searchtext, sort: 'lastModifiedDate,desc', withChildGroup: !!this.withChildGroup }
        }

        if (this.target && this.target['id']) {
            if (this.target['type'] == 'SITE') {
                params['site.id'] = this.target['id'];
            } else {
                params['userGroup.id'] = this.target['id'];
            }
        }
        params['userIds'] = this.selected,
            this.userService.userExport(params).subscribe(
                ok => {
                    this.excelDownload();
                },
                err => {
                    tipMessage(err, 'error');
                    this.exportShow = false;
                }
            );
    }
    getUserParams() {
        let params = {};
        params['withChildGroup'] = false;
        if (this.withChildGroup) {
            params['withChildGroup'] = true;
        }
        Object.keys(this.searchUsers).map(it => {
            if (it != 'userGroup' && this.searchUsers[it]) {
                params[it] = this.searchUsers[it];
            }
        });
        params['sort'] = 'lastModifiedDate,desc';
        return params;
    }
    excelDownload() {
        this.exportShow = false;
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        window.open(url + "/api/users/userExport/download", '_blank');
    }
    simulate(username) {
        this.confrim.confirm({
            title: '模拟登录不管成功与否都会清除当前帐号的登录信息，确定要使用 ' + username + ' 进行模拟登录吗？',
            zIndex: 1003,
            onOk: () => {
                this.userService.simulate(username).subscribe(
                    () => {
                        tipMessage('登录成功，即将跳转到系统首页！', 'success');
                        window.location.href = "/";
                    },
                    err => {
                        tipMessage('模拟登录失败，您可能没有此权限, 即将跳转到登录界面', 'error');
                        window.location.href = "/";
                    }
                );
            }
        });
    }
    isSystemUser(): boolean {
        return this.authService.isSuperUser();
    }
}
