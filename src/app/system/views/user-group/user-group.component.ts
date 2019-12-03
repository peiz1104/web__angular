import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { UserGroupService } from '../../service/user-group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserGroup } from '../../entity/user-group';
import { tipMessage } from "app/account/entity/message-tip";
import 'rxjs/add/operator/toPromise';
import { CuiLayer } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { CurrentUserGroup } from '../user-group-manage-index/user-group-manage-index.component';

@Component({
    selector: 'spk-user-group',
    templateUrl: './user-group.component.html',
    styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
    activedGroup;
    newGroup;
    searchtext;

    userGroups;

    selected;
    columns;
    subGroups;
    loading: boolean;

    exportShow: boolean = false;

    options = {
        getChildren: (node: any) => {
            return this.getChildren(node.id).toPromise();
        }
    };

    constructor(
        private userGroupService: UserGroupService,
        private router: Router,
        private route: ActivatedRoute,
        private modal: NzModalService,
        private currentUserGroup: CurrentUserGroup
    ) {
        this.currentUserGroup.isFold = false;

        this.columns = [
            { title: 'ID', data: 'id', visible: false },
            { title: '部门名称', tpl: 'userGroup' },
            { title: '部门编码', data: 'code' },
            { title: '级别', tpl: 'regionType', styleClass: 'text-center' },
            { title: '顺序', tpl: 'displaySort', styleClass: 'text-center' },
            { title: '操作', tpl: 'actions', styleClass: 'text-right' },
        ];
    }

    ngOnInit() {
        this.currentUserGroup.current().subscribe(ug => {
            this.activedGroup = ug;
            /* if(ug&&ug['type'] != 'SITE'){ */
            this.loadData();
            /* }else{
              this.userGroups = null;
              this.subGroups = null;
            } */
        });
    }

    getChildren(parentId: number): Observable<UserGroup[]> {
        // this.userGroupService.groups(parentId).subscribe(
        //   groups => this.subGroups = groups
        // );

        return this.userGroupService.groups(parentId);
    }

    delete(id?: number, single_flag?: boolean) {
        let ids = id ? [id] : this.selected;
        if (!ids || ids.length == 0) {
            tipMessage("请选择想要删除的部门", 'warning');
            return;
        }
        if (single_flag) {
            this.userGroupService.delete(ids).subscribe(
                () => {
                    tipMessage('删除成功', 'error');
                    this.currentUserGroup.ugTree.refresh(this.activedGroup, false);
                    this.loadData();
                },
                err => { }
            );
        } else {
            this.modal.confirm({
                title: "确认要删除选择的部门吗？",
                zIndex: 1003,
                onOk: () => {
                    this.userGroupService.delete(ids).subscribe(
                        () => {
                            tipMessage('删除成功', 'success');
                            this.currentUserGroup.ugTree.refresh(this.activedGroup, false);
                            this.loadData();
                        },
                        err => { }
                    );
                }
            })
        }

    }

    loadData() {
        this.loading = true;
        let parentId = this.activedGroup ? this.activedGroup.id : undefined;
        this.userGroupService.groups(parentId, this.searchtext).subscribe(
            groups => {
                // 重置选择数组避免分页未选择数据批量删除可用
                this.selected = undefined;
                this.userGroups = groups;
                this.subGroups = groups
                this.loading = false;
                this.exportIsShow();
            },
            err => {
                this.loading = false;
            }
        );
    }

    exportIsShow() {
        if (!this.subGroups || this.subGroups.length <= 0) {
            this.exportShow = true;
        } else {
            this.exportShow = false;
        }
    }

    userGroupExport() {
        this.exportShow = true;
        let parentId = this.activedGroup ? this.activedGroup.id : undefined;
        this.userGroupService.userExport(parentId, this.searchtext, this.selected).subscribe(
            ok => {
                this.downloadUserGroup();
            },
            err => {
                tipMessage(err, 'error');
                this.exportShow = false;
            }
        );
    }

    downloadUserGroup() {
        this.exportShow = false;
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        window.open(`${url}/api/userGroups/export/download`, '_blank');
    }

    onSelect(selIds) {
        this.selected = selIds;
    }

    moveUp(ugId: number) {
        this.userGroupService.moveUp(ugId).subscribe(
            _ => {
                tipMessage('向上移动成功', 'success');
                this.currentUserGroup.ugTree.refresh(this.activedGroup, false);
                this.loadData();
            },
            err => {
                tipMessage(err, 'error');
            }
        );
    }

    moveDown(ugId: number) {
        this.userGroupService.moveDown(ugId).subscribe(
            _ => {
                tipMessage('向下移动成功', 'success');
                this.currentUserGroup.ugTree.refresh(this.activedGroup, false);
                this.loadData();
            },
            err => {
                tipMessage(err, 'error');
            }
        );
    }
}
