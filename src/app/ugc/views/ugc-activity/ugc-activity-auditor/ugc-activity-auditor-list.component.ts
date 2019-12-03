import { NzMessageService, NzModalSubject, NzModalService } from 'ng-zorro-antd';
import { UgcActivityAuditor } from './../../../entity/ugc-activity-auditor';
import { ActivatedRoute } from '@angular/router';
import { UgcActivity } from './../../../entity/ugc-activity';
import { UgcActivityAuditorService } from './../../../service/ugc-activity-auditor.service';
import { Course } from './../../../../learning/course/entity/course';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserGroup } from '../../../../exam/exam-paper/entity/user-group';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-activity-auditor-list',
    templateUrl: './ugc-activity-auditor-list.component.html',
    styleUrls: ['./ugc-activity-auditor-list.component.scss']
})
export class UgcActivityAuditorListComponent implements OnInit {

    ugcActivity: UgcActivity;
    searchList: any;
    data: Pagination<UgcActivityAuditor>;
    loading: boolean;
    selection: UgcActivityAuditor[];
    _searchForm: FormGroup;
    ugLookupModal: NzModalSubject;
    userLookupModal: NzModalSubject;
    userGroupSelected: UserGroup[];
    selectedId: number;
    columns: Column[] = [
        { title: '用户名', tpl: 'usename' },
        { title: '姓名', tpl: 'dispaleName' },
        { title: '手机号', tpl: 'phoneNumber' },
        { title: '电子邮箱', tpl: 'email' },
        { title: '所属组织', tpl: 'userGroup' },
        { title: '审核范围', tpl: 'scopes' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' },
    ];

    constructor(
        private route: ActivatedRoute,
        private ugcActivityAuditorService: UgcActivityAuditorService,
        private fb: FormBuilder,
        private modal: NzModalService,
        private layer: CuiLayer,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
            this.initSearchForm();
            this.loadData();
        });
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            searchText: [],
        });
    }
    loadData() {
        let params = {
            ...this.searchList,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        this.loading = true;
        this.ugcActivityAuditorService.getAllOfPage(this.ugcActivity.id, params).subscribe(
            data => {
                this.loading = false;
                this.data = data;
            },
            error => {
                this.loading = false;
            }
        );
    }

    _submitForm($event, value) {
        $event.preventDefault();
        this.searchList = value;
        this.loadData();
    }

    delete(auditors: UgcActivityAuditor[], single_flag?: boolean) {
        auditors = auditors ? auditors : this.selection;
        if (!auditors || auditors.length <= 0) {
            tipMessage('请选择需要删除的审核人员！', 'warning', 2000);
            return;
        }
        if (single_flag) {
            this.ugcActivityAuditorService.deleted(this.ugcActivity.id, auditors.map(it => it.id)).subscribe(
                () => {
                    tipMessage('删除审核人员成功！', 'success');
                    this.loadData();
                },
                err => { this.message.error(err.message); }
            );
        } else {
            this.modal.confirm({
                title: "确认要删除选中的审核人吗？",
                onOk: () => {
                    this.ugcActivityAuditorService.deleted(this.ugcActivity.id, auditors.map(it => it.id)).subscribe(
                        () => {
                            tipMessage('删除审核人员成功', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage(err.message);
                        }
                    );
                }
            })
        }
    }

    openUserLookupDialog(titleTpl, contentTpl, footerTpl) {
        this.userLookupModal = this.modal.open({
            title: titleTpl,
            content: contentTpl,
            footer: footerTpl,
            maskClosable: false,
            width: 1000,
            zIndex: 1003
        });
    }

    userLookupOk(selected) {
        // let selected = this.userSelected;
        if (selected && selected.length > 0) {
            // TODO: send to server
            this.ugcActivityAuditorService.add(this.ugcActivity.id, selected.map(it => it.id)).subscribe(
                ok => {
                    tipMessage('添加用户成功', 'success');
                    this.loadData();
                    // this.layerRef.close();
                    this.userLookupModal.destroy('onOk');
                },
                err => {
                    tipMessage(err);
                }
            );
        } else {
            this.modal.warning({ title: '请选择要添加的用户！', zIndex: 1200 });
            return;
        }
    }

    userLookupCancel() {
        this.userLookupModal.destroy('onCancel');
    }

    userGroupLookupOk(selected, id) {
        if (selected && selected.length > 0) {
            // TODO: send to server

            let selectedAuditor = new UgcActivityAuditor();
            selectedAuditor.id = id;
            selectedAuditor.scopes = selected;
            this.ugcActivityAuditorService.addScope(this.ugcActivity.id, selectedAuditor).subscribe(
                ok => {
                    tipMessage('添加组织成功', 'success');
                    // this.loadTerms();
                    // this.layerRef.close();
                    this.loadData();
                },
                err => {
                    tipMessage('添加组织失败');
                }
            );
        } else {
            tipMessage('你没有选择组织，将不做修改！', 'warning', 3000);
            return;
        }
    }

    selectUserGroup(userGroups) {
        this.userGroupSelected = userGroups;
    }

    openUserGroupLookupDialog(titleTpl, contentTpl, footerTpl) {
        this.ugLookupModal = this.modal.open({
            title: titleTpl,
            content: contentTpl,
            footer: footerTpl,
            maskClosable: false,
            width: 360
        });
    }

}
