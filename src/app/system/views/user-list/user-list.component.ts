import { AuthService } from 'app/core';
import { UserGroupService } from './../../service/user-group.service';
import { UserGroup } from 'app/system/entity/user-group';
import { Pagination } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../entity/user';
import { CuiPagination, PaginationModel } from 'console-ui-ng';
import { Column } from 'console-ui-ng';
import { NzModalService } from 'ng-zorro-antd';
import { CurrentUserGroup } from '../user-manage-index/user-manage-index.component';
import { tipMessage } from "app/account/entity/message-tip";
import * as _ from 'lodash';

const { isArray } = _;

@Component({
    // selector: 'spk-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users: User[];
    pagination: CuiPagination;
    columns: Column[];

    selected: any[];
    searchtext;

    isComplexSearch = false;

    target: any;
    loading: boolean = true;

    exportShow: boolean = false;

    ugSearchText;
    ugSearchResult: Pagination<UserGroup>;

    searchUsers: User = new User();
    withChildGroup: boolean = true;

    constructor(private userService: UserService,
        private userGroupApi: UserGroupService,
        private modal: NzModalService,
        private authService: AuthService,
        private currentUserGroup: CurrentUserGroup
    ) {
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
            { title: '状态', data: 'status', tpl: 'statusCol' }
        ];
    }

    ngOnInit() {
        this.currentUserGroup.isFold = false;

        this.currentUserGroup.current().subscribe(ug => {
            this.target = ug;
            this.loadData();
        });
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

    clearSearchText(isComplexSearch) {
        this.isComplexSearch = isComplexSearch;
    }

    loadData(page?: CuiPagination) {
        this.pagination = page || this.pagination;
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

        this.loading = true;
        this.userService.users(params, this.pagination).subscribe(
            pag => {
                // 重置选择数组避免分页未选择数据批量删除可用
                this.selected = undefined;
                this.pagination = pag;
                this.users = pag.content;
                this.loading = false;
                this.exportIsShow();
            },
            err => {
                this.loading = false;
            }
        );
    }

    exportIsShow() {
        if (!this.pagination || !this.pagination.totalElements || this.pagination.totalElements <= 0) {
            this.exportShow = true;
        } else {
            this.exportShow = false;
        }
    }

    onSelect(selIds: any[]) {
        this.selected = selIds;
    }

    delete(id?, single_flag?: boolean) {
        let ids = id ? [id] : this.selected;
        if (!ids || ids.length == 0) {
            tipMessage("请选择想要删除的用户")
            return;
        }
        if (single_flag) {
            this.userService.delete(ids).subscribe(
                () => {
                    tipMessage('删除成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage('删除失败', 'error');
                }
            );
        } else {
            this.modal.confirm({
                title: "确认删除选择的用户吗？",
                zIndex: 1003,
                onOk: () => {
                    this.userService.delete(ids).subscribe(
                        () => {
                            tipMessage('删除成功', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage('删除失败', 'success');
                        }
                    );
                }
            })
        }
    }

    onUgSelectionChange(items) {
        items = items && isArray(items) ? items : (items ? [items] : []);
        let ug = items[0];
        this.target = ug;
        this.loadData();
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

    isSystemUser(): boolean {
        return this.authService.isSuperUser();
    }
    simulate(username) {
        this.modal.confirm({
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
}
