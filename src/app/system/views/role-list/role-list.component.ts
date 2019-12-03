import { Component, OnInit } from '@angular/core';
import { Role } from '../../entity/role';
import { Pagination } from '../../../core';
import { RoleService } from '../../service/role.service';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { tipMessage } from "app/account/entity/message-tip";
import { error } from 'util';

@Component({
    selector: 'spk-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
    roles: Role[];
    pagination: CuiPagination;
    columns;
    searchtext;
    loading: boolean = true;


    constructor(private roleService: RoleService,
        private router: Router,
        private route: ActivatedRoute) {
        this.columns = [
            { title: 'ID', data: 'id', visible: false },
            { title: '角色名称', data: 'name' },
            { title: '创建人', data: 'createdBy.displayName' },
            { title: '角色类型', data: 'roleType', tpl: 'roleTypeCol' },
            { title: '创建时间', data: 'createdDate' },
            { title: '使用状态', tpl: 'permissionType' },
        ];
    }

    ngOnInit() {
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.searchtext,
            page: page ? page.number : 0,
            size: page ? page.size : '',
        };
        this.loading = true;
        this.roleService.roles(params).subscribe(
            pag => {
                this.pagination = pag;
                this.roles = pag.content;
                this.loading = false;
            },
            err => {
                tipMessage(err || "加载失败", 'error');
                this.loading = false;
            }
        );
    }

    delete(row) {
        if (row.permissionType) {
            tipMessage('已使用的角色不允许删除');
            return;
        }
        this.roleService.delete(row.id).subscribe(
            () => {
                tipMessage('删除成功', 'success');
                this.loadData();
            },
            err => {
                tipMessage(err || "删除失败", 'error');
            }
        );
    }
}
