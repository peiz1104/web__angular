import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Pagination } from '../../../core';
import { LogicGroup } from '../../entity/logic-group';
import { LogicGroupService } from '../../service/logic-group.service';
import { Data } from '@angular/router/src/config';
import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { isArray } from 'util';
import { element } from 'protractor';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import { AuthService } from "../../../core/auth/auth.service";
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-logic-group-list',
    templateUrl: './logic-group-list.component.html',
    styleUrls: ['./logic-group-list.component.scss']
})
export class LogicGroupListComponent implements OnInit {
    columns;
    logicGroups: Pagination<LogicGroup>;
    selection: LogicGroup[];
    loading: boolean = false;
    searchtext;

    userGroupId;
    userGroupIds;
    isCreate: boolean;       // 用于判断添加还是修改用户组信息
    logicGroup: LogicGroup;  // 用于编辑用户组信息

    @ViewChild('logicGroupFormLookup') logicGroupFormLookup: TemplateRef<any>;

    modalSubject: NzModalSubject;

    constructor(
        private logicGroupService: LogicGroupService,
        private modal: NzModalService,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.columns = [
            { title: '名称', data: 'name' },
            { title: '所属组织', tpl: 'userGroup' },
            { title: '是否发布', tpl: 'isPutout', styleClass: "text-center" },
            { title: '创建人', data: 'createdByDisplayName', styleClass: "text-center" },
            { title: '创建日期', tpl: "createdDate", styleClass: "text-center" },
        ];
        this.authService.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.userGroupIds = [user.managerGroup];
                }
                this.loadData();
            })
    }

    hasSelection() {
        return this.selection && this.selection.length > 0;
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.selection = null;

        let params = {
            name: this.searchtext,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.userGroupIds) {
            if (Object.prototype.toString.call(this.userGroupIds) == "[object Array]") {
                params['userGroupIds'] = this.userGroupIds.map(it => it.id);
            } else {
                params['userGroupIds'] = this.userGroupIds.id;
            }
        }
        this.logicGroupService.getAllOfPage(params).subscribe(
            groups => {
                this.logicGroups = groups; this.loading = false;
            },
            err => {
                this.loading = false
            }
        );
    }

    delete(logicGroup?: LogicGroup, single_flag?: boolean) {
        let ids = [];
        if (logicGroup) {
            ids.push(logicGroup.id);
        } else {
            if (!this.selection || this.selection.length == 0) {
                /* this.modal.warning({
                            title: `请选择要删除的用户组`
                }); */
                tipMessage("请选择要删除的用户组");
                return;
            }
            this.selection.forEach(element => {
                ids.push(element.id);
            });
        }

        if (single_flag) {
            this.logicGroupService.delete(ids).subscribe(
                ok => {
                    tipMessage('删除成功', 'success');
                    this.loadData();
                },
                err => tipMessage('删除失败', 'error')
            );
        } else {
            this.modal.confirm({
                title: `确定要删除选择的用户组吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.logicGroupService.delete(ids).subscribe(
                        ok => {
                            tipMessage('删除成功', 'success');
                            this.loadData();
                        },
                        err => tipMessage('删除失败', 'error')
                    );
                }
            });
        }

    }

    openPapersDialogCreate() {
        this.isCreate = true;
        this.getModalSubject();
    }

    openPapersDialogUpdate(id: number) {
        this.isCreate = false;
        this.logicGroupService.getOne(id).subscribe(
            returnLogicGroup => {
                this.logicGroup = returnLogicGroup;
                this.getModalSubject(returnLogicGroup.name);
            }
        );
    }

    getModalSubject(name?: any) {
        let titleShow
        if (!name) {
            titleShow = "创建用户组";
        } else {
            titleShow = name + ": 编辑";
        }
        this.modalSubject = this.modal.open({
            title: titleShow,
            content: this.logicGroupFormLookup,
            footer: false,
            width: 640,
            maskClosable: false,
            zIndex: 1003,
        });
    }

    onSubmit(logicGroup: LogicGroup) {
        this.loading = true;
        if (this.isCreate) {
            this.saveLogicGroup(logicGroup);
        }
        if (!this.isCreate) {
            this.updateLogicGroup(logicGroup);
        }
    }

    updateLogicGroup(logicGroup) {
        let fd = FormDataUtil.covert(logicGroup);
        fd.append("id", '' + this.logicGroup.id);
        this.logicGroupService.updateLogicGroup(fd).subscribe(
            trainBase => {
                this.loading = false;
                tipMessage('修改成功', 'success');
                this.modalSubject.destroy("onOk");
                this.loadData();
            },
            err => {
                this.loading = false;
                tipMessage(err, 'error')
            }
        );
    }

    saveLogicGroup(logicGroup) {
        this.logicGroupService.saveLogicGroup(logicGroup).subscribe(
            trainBase => {
                this.loading = false;
                tipMessage('保存成功', 'success');
                this.modalSubject.destroy("onOk");
                this.loadData();
            },
            err => {
                this.loading = false;
                tipMessage(err, 'error');
            }
        );
    }

    paperLookupCancel() {
    }
    getFullNamePath(value) {
        if (value) {
            if (value.indexOf(',') != -1 || value.indexOf('，') != -1) {
                return value.replace(/\,|\，/g, '/');
            } else {
                return value;
            }
        } else {
            return '---'
        }
    }


    /**
     * 发布讲师
     * @param param
     */
    ispublish(param) {
        let str = !!param.isPutout ? '取消发布' : '发布';
        let selected = param ? [param] : this.selection;
        if (!selected || selected.length == 0) {
            this.modal.warning({
                title: `请选择要${str}的用户组`,
                zIndex: 1003
            });
            return;
        }

        this.modal.confirm({
            title: `确定要${str}选择的用户组吗？`,
            zIndex: 1003,
            onOk: () => {
                let obj = {
                    isPutout: !param.isPutout,
                }
                this.logicGroupService.isPublish(selected.map(it => it.id), obj).subscribe(
                    ok => {
                        tipMessage(`${str}成功`, 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage(`${str}失败`, 'error');
                    }
                )
            }
        });
    }


}
