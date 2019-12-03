import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { CuiPagination } from 'console-ui-ng';
import { PermissionService } from '../../service/permission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Permission } from '../../entity/permission';
import { UserGroup } from './../../../system/entity/user-group';

@Component({
    selector: 'spk-permission-list',
    templateUrl: './permission-list.component.html',
    styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {

    permissions: Permission[];
    pagination: CuiPagination;
    columns;
    loading: boolean = true;
    searchtext;
    selected: number[];
    userGroup: UserGroup = new UserGroup();
    roleName;
    privilegeName;
    isMyself: boolean = false;
    scopeUserGroup: UserGroup = new UserGroup();


    constructor(private permissionService: PermissionService,
        private message: NzMessageService,
        private router: Router,
        private route: ActivatedRoute,
        private modal: NzModalService) {
        this.columns = [
            { title: 'ID', data: 'id', visible: false },
            { title: '用户名', data: 'user.username', styleClass: 'text-lfet' },
            { title: '姓名', data: 'user.displayName', styleClass: 'text-lfet' },
            { title: '所属机构', tpl: 'userGroup', styleClass: 'text-lfet' },
            { title: '角色', data: 'role.name', styleClass: 'text-lfet' },
            { title: '权限', data: 'privilege.name', styleClass: 'text-lfet' },
            { title: '创建人', data: 'createdBy.displayName', styleClass: 'text-lfet' },
            { title: '创建时间', data: 'createdDate', styleClass: 'text-center' },
            { title: '数据范围', tpl: 'scopeUserGroup', styleClass: 'text-lfet' }
        ];
    }

    ngOnInit() {
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.pagination = page || this.pagination;
        let params = {
            page: this.pagination ? this.pagination.number : 0,
            size: this.pagination ? this.pagination.size : '',
            // sort: this.pagination && this.pagination.sort ? this.pagination.sort : ''
        };

        if (this.userGroup && this.userGroup.id) {
            params["target.id"] = this.userGroup.id
        }
        if (this.searchtext) {
            params["queryName"] = this.searchtext.trim();
        }
        if (this.roleName) {
            params["role.name"] = this.roleName.trim();
        }
        if (this.privilegeName) {
            params["privilege.name"] = this.privilegeName.trim();
        }
        if (this.isMyself) {
            params["isMyself"] = this.isMyself
        }


        this.loading = true;
        this.permissionService.pageList(params).subscribe(
            pag => {
                // 重置选择数组避免分页未选择数据批量删除可用
                this.selected = undefined;
                this.pagination = pag;
                this.permissions = pag.content;
                this.loading = false;
            },
            err => {
                this.message.error(err);
            }
        );

    }

    search() {
        this.pagination.number = 0;
        this.loadData(this.pagination);
    }

    onSelect(selIds: any[]) {
        this.selected = selIds;
    }

    delete(id?, flag?: boolean) {
        let ids = id ? [id] : this.selected;
        if (!ids || ids.length == 0) {
            this.message.warning('请选择要删除的授权');
            return;
        }

        if (flag) {
            this.modal.confirm({
                title: `确定要删除选择的授权吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.permissionService.delete(ids).subscribe(
                        () => {
                            this.message.success('删除成功');
                            this.loadData();
                        },
                        err => {
                            this.message.error(err);
                        }
                    );
                }
            });
        } else {
            this.permissionService.delete(ids).subscribe(
                () => {
                    this.message.success('删除成功');
                    this.loadData();
                },
                err => {
                    this.message.error(err);
                }
            );
        }




    }


    clearSearchText() {
        this.searchtext = null;
        this.roleName = null;
        this.privilegeName = null;
        this.isMyself = false;
        this.userGroup = new UserGroup();
    }




}
