import { Component, OnInit, Input } from '@angular/core';
import { LogicGroupUser } from '../../entity/logic-group-user';
import { Pagination } from 'app/core/';
import { LogicGroupUserService } from '../../service/logic-group-user.service';
import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { CuiLayer } from 'console-ui-ng';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { LogicGroup } from '../../entity/logic-group';
import { LogicGroupService } from '../../service/logic-group.service';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-logic-group-edit',
    templateUrl: './logic-group-edit.component.html',
    styleUrls: ['./logic-group-edit.component.scss']
})
export class LogicGroupEditComponent implements OnInit {

    logicGroupId: number;
    columns;
    logicGroupUsers: Pagination<LogicGroupUser>;
    selection: LogicGroupUser[];
    logicGroup?: LogicGroup;
    loading: boolean;
    @Input() matchUser: boolean = true;

    constructor(
        private logicGroupUserService: LogicGroupUserService,
        private logicGroupService: LogicGroupService,
        private location: Location,
        private route: ActivatedRoute,
        private modal: NzModalService,
        private dialog: CuiLayer
    ) { }

    ngOnInit() {
        this.columns = [
            { title: 'ID', data: 'id' },
            { title: '用户名', data: 'userName' },
            { title: '姓名', data: 'displayName' },
            { title: '电话', data: 'phoneNumber' },
        ];
        this.route.params.subscribe(
            (params: Params) => {
                this.logicGroupId = +params['logicGroupId'];
            }
        );
        this.loadData();
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.selection = null;
        this.logicGroupUserService.getAllGroupUser(this.logicGroupId, page).subscribe(
            data => { this.logicGroupUsers = data; this.loading = false; },
            err => { this.loading = false; }
        );
        this.logicGroupService.getOne(this.logicGroupId).subscribe(
            data => this.logicGroup = data
        );
    }

    userLookupOk(selected) {
        if (selected && selected.length > 0) {
            this.logicGroupUserService.addGroupUser(this.logicGroupId, selected).subscribe(
                ok => {
                    tipMessage('添加用户成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage(err, 'error');
                }
            );
        } else {
            this.modal.warning({ title: '请选择要添加的用户！', zIndex: 1200 });
            return;
        }
    }

    delete(logicGroupUser?: LogicGroupUser) {
        let ids = [];
        if (logicGroupUser) {
            ids.push(logicGroupUser.id);
        } else {
            if (!this.selection) {
                this.modal.warning({
                    title: `请选择要删除的用户`,
                    zIndex: 1003,
                });
                return;
            }
            this.selection.forEach(element => {
                ids.push(element.id);
            });
        }

        this.modal.confirm({
            title: `确定要删除用户？`,
            zIndex: 1003,
            onOk: () => {
                this.logicGroupUserService.deleteGroupUser(ids).subscribe(
                    ok => {
                        tipMessage('删除成功', 'success');
                        this.loadData();
                    },
                    err => tipMessage('删除失败', 'error')
                );
            }
        });
    }

    backGroup() {
        this.location.back();
    }

}
