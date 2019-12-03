import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HourService } from '../../../managementservice/hour.service';
import { Pagination } from 'app/core/entity/pagination';
import { NzModalService } from 'ng-zorro-antd';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-assist-management',
    templateUrl: './assist-management.component.html',
    styleUrls: ['./assist-management.component.scss']
})
export class AssistManagementComponent implements OnInit {
    spinning: boolean = false;
    _searchForm: FormGroup;
    _form: FormGroup;
    selection: any[] = [];
    testListData: any;
    searchBy: {
        search?: string,
        userGroup?: any
    } = {};
    columns = [
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '所属组织', tpl: 'userGroup' },
        { title: '管辖范围', tpl: 'opear' },
        { title: '邮箱', tpl: 'email' },
        { title: '操作', tpl: 'actions' }
    ];
    isVisible: boolean = false;
    btnstate: boolean = false;
    editId: number = undefined;
    spinningEdit: boolean = false;
    initFormData: any = {
        userIds: [null, [Validators.required]], // 学员
        userGroup: [null, [Validators.required]]
    };
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private apiservice: HourService,
        private confirm: NzModalService
    ) { }
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.searchBy.userGroup != null) {
            params['userGroupId'] = this.searchBy.userGroup.id;
        }
        if (this.searchBy.search) {
            params['search'] = this.searchBy.search;
        }
        console.log("查询参数", params);
        this.apiservice.getHourAssistList(params).subscribe(
            res => {
                this.spinning = false;
                this.testListData = res;
            },
            err => {
                tipMessage(err);
                this.spinning = false;
            }
        )
    }
    ngOnInit() {
        this._searchForm = this.fb.group({
            search: [],
            userGroup: [],
        })
        this.loadData();
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchBy = value;
        this.loadData();
        return;
    }

    initForm() {
        this._form = this.fb.group(this.initFormData)
    }
    // 选择人员
    userLookupLeaders() {
        this.initForm();
        this.isVisible = true;
    }
    handleCancel(event) {
        this.restform();
    }
    _saveformmessage($event, value) {
        this.btnstate = true;
        let params = {
            'user': { id: value.userIds[0].id },
            'userGroup': { id: value.userGroup.id }
        }
        if (this.editId) {
            this.apiservice.editHourAssistUser(this.editId, params).subscribe(
                res => {
                    this.loadData();
                    this.restform();
                    tipMessage('编辑授权成功！', 'success')
                },
                err => {
                    this.btnstate = false;
                    tipMessage(err);
                }
            )
        } else {
            this.apiservice.addAssistUser(params).subscribe(
                res => {
                    this.loadData();
                    this.restform();
                    tipMessage('添加授权成功！', 'success')
                },
                err => {
                    this.btnstate = false;
                    tipMessage(err)
                }
            )
        }

    }
    goBack() {
        this.restform()
    }
    restform() {
        this.btnstate = false;
        this.isVisible = false;
        this.editId = undefined;
        this.spinningEdit = false;
    }
    // 批量删除
    mutipleDelete(event) {
        if (this.selection && this.selection.length) {
            let ids = this.getIds(this.selection);
            this.confirm.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.apiservice.deleteAssistUser(ids).subscribe(
                        res => {
                            this.loadData();
                            tipMessage('删除成功 ', 'success');
                        },
                        err => {
                            tipMessage('删除失败！');
                        }
                    )

                },
                onCancel() { }
            })
        } else {
            tipMessage('请选择要删除的项！');
        }
    }
    // 单个删除
    deleteuser(ids) {
        this.confirm.confirm({
            title: '删除',
            content: '确定要删除?',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk: () => {
                this.apiservice.deleteAssistUser(ids).subscribe(
                    res => {
                        tipMessage('删除成功 ', 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage('删除失败！')
                    }
                )
            },
            onCancel() { }
        })
    }
    // 编辑授权用户
    editUser(value) {
        this.editId = value.id;
        this.spinningEdit = true;
        this.isVisible = true;
        this.initForm();
        this.apiservice.getHourAssistDetail(this.editId).subscribe(
            res => {
                this._form = this.fb.group({
                    userIds: [[res.user], [Validators.required]], // 学员
                    userGroup: [res.userGroup, [Validators.required]]
                })
                this.spinningEdit = false;
            }
        )
    }
    // 获取ids
    getIds(value: any[]) {
        let ids = [];
        value.map((item) => {
            ids.push(item.id);
        })
        return ids;
    }
    // 获取namePath
    getUserNamePath(value) {
        if (value) {
            if (value.indexOf(',') != -1 || value.indexOf('，') != -1) {
                return value.replace(/\,|\，/g, '/');
            } else {
                return value;
            }
        } else {
            return '---';
        }
    }

}
