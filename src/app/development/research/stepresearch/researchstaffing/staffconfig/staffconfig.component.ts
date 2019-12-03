import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResearchService } from '../../../service/research.service';
import { NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';

import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { error } from 'util';
import { filter } from '@angular/cdk';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-staffconfig',
    templateUrl: './staffconfig.component.html',
    styleUrls: ['./staffconfig.component.scss']
})
export class StaffconfigComponent implements OnInit {
    _form: FormGroup;
    spinning: boolean = true;
    username: any;
    displayName: any;
    testListData: any;
    selection: any[] = [];
    devStatus: any;
    phaseId: any;
    devId: any;
    isVisible: boolean = false; // 添加人员modal框隐藏
    btnstate: boolean = false;
    userIds: any[] = [];
    edituserId: any;
    editspinning: boolean = false;
    hasuserArray: any[] = [];

    columns: any = [
        { title: '工号', tpl: 'username', styleClass: 'text-left' },
        { title: '姓名', tpl: 'displayName', styleClass: 'text-left' },
        { title: '人员类型', tpl: 'user', styleClass: 'text-center' },
        { title: '所属机构', tpl: 'userGroup', styleClass: 'text-left' },
        { title: '工作任务', data: 'workTask', styleClass: 'text-left' },
        { title: '工作绩效', tpl: 'achievements', styleClass: 'text-center' },
        { title: '工作表现', data: 'workPerformance', styleClass: 'text-left' },
        { title: '编辑', tpl: 'actions', styleClass: 'text-center' },
    ];
    initAddFromData = {
        username: ['', [Validators.required]],
        displayName: ['', [Validators.required]],
        personType: ['', [Validators.required]],
        jobContent: [''],
        workTask: [''],
        achievements: [''],
        workPerformance: ['']
    }
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            username: this.username ? this.username : '',
            displayName: this.displayName ? this.displayName : ''
            // knowledgeId: this.selectTreeId
        };
        this.service.getstageList(this.phaseId, params).subscribe(
            res => {
                this.testListData = res;
                this.spinning = false;
                this.selection = [];
                // console.log(res, 44)
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )

    }
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private service: ResearchService,
        private confirmv: NzModalService,
        private fb: FormBuilder,
    ) { }


    ngOnInit() {
        this.routeInfo.paramMap.subscribe(
            params => {
                this.phaseId = params.get('stepId');
                this.devId = params.get('id');
            }
        )
        this.routeInfo.queryParams.subscribe(
            params => {
                this.devStatus = params.status;
            }
        )
        this.loadData();

    }
    // 搜索
    searchData() {
        this.loadData();
    }
    // 返回
    goBack() {
        window.history.back();
    }
    // 批量删除
    mutipledelete(event) {
        if (this.selection.length) {
            let ids = this.getIds(this.selection);
            this.confirmv.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.deletestageUser(this.phaseId, ids).subscribe(
                        res => {
                            tipMessage('删除成功!', 'success');
                            this.loadData();
                        },
                        error => {
                            return tipMessage(error);
                        }
                    )
                }
            })
        } else {
            return tipMessage('请选择要操作的项！');
        }
    }
    // 添加
    addstpuser(event) {
        this.isVisible = true;
        this._form = this.fb.group(this.initAddFromData);
        this.service.gethasuserids(this.phaseId).subscribe(
            res => {
                this.hasuserArray = res;
            }
        )
    }
    // modal框的显影
    handleCancel(event) {
        this.isVisible = false;
        this.userIds = [];
        this.edituserId = undefined;
        this.hasuserArray = [];
    }
    handleOk(event) {
        this.isVisible = false;
    }
    // 选择人员
    userLookupOk(event) {
        console.log(event);
        let hasrepeat = this.judgehasuser(event);
        if (hasrepeat) {
            tipMessage('将会过滤掉重复的用户！', 'warning', 3000);
        }
        let filterarray = this.filterUser(event);
        let usermessage = this.getusernamedisplayName(filterarray);
        let username = usermessage.username.join(',');
        let displayName = usermessage.displayName.join(',');
        this.userIds = usermessage.userIds;
        this._form.get('username').setValue(username);
        this._form.get('displayName').setValue(displayName);

    }
    // 保存
    _saveformmessage(event, value) {
        if (this._form.invalid) {
            return tipMessage('请选择人员及人员类型！');
        }
        let objParams = {
            ...value,
            userIds: this.userIds,
            achievements: value.achievements ? value.achievements : null
        };
        delete objParams.username;
        delete objParams.displayName;
        this.btnstate = true;
        if (this.edituserId) {
            this.service.savestageedit(this.phaseId, this.edituserId, objParams).subscribe(
                res => {
                    tipMessage('编辑成功！', 'success');
                    this.isVisible = false;
                    this.edituserId = undefined;
                    this.userIds = [];
                    this.btnstate = false;
                    this.loadData();
                },
                error => {
                    this.btnstate = false;
                    return tipMessage('编辑失败！');
                }
            )
        } else {
            this.service.addstageUser(this.phaseId, objParams).subscribe(
                res => {
                    tipMessage('添加成功！', 'success');
                    this.isVisible = false;
                    this.userIds = [];
                    this.btnstate = false;
                    this.hasuserArray = [];
                    this.loadData();
                },
                err => {
                    this.btnstate = false;
                    return tipMessage(err);
                }
            )
        }
    }
    // 编辑
    devedit(value) {
        this.edituserId = value.id;
        this.editspinning = true;
        this.isVisible = true;
        this._form = this.fb.group(this.initAddFromData);
        this.service.editshow(this.phaseId, this.edituserId).subscribe(
            res => {
                // console.log(res);
                this._form = this.fb.group({
                    username: [res.user.username, [Validators.required]],
                    displayName: [res.user.displayName, [Validators.required]],
                    personType: [res.personType, [Validators.required]],
                    jobContent: [res.jobContent],
                    workTask: [res.workTask],
                    achievements: [res.achievements],
                    workPerformance: [res.workPerformance]
                })
                this.editspinning = false;
                this.userIds = [res.id];
            },
            err => {
                this.editspinning = false;
                return tipMessage('获取信息失败！');
            }
        )


    }
    // 获取人员工号及用户姓名
    getusernamedisplayName(array: any[]) {
        let username = [];
        let displayName = [];
        let userIds = [];
        array.map((item, index) => {
            username.push(item.username);
            displayName.push(item.displayName);
            userIds.push(item.id);
        })
        return {
            username: username,
            displayName: displayName,
            userIds: userIds
        }
    }
    // 获取ids
    getIds(array: any[]) {
        let ids = [];
        array.map((item, indx) => {
            ids.push(item.id);
        })
        return ids;
    }
    // 过滤已有人员
    filterUser(array: any[]) {
        return array.filter((item, index) => {
            return this.hasuserArray.indexOf(item.id) == -1;
        })
    }
    // 判断是否有重复人员
    judgehasuser(array: any[]) {
        return array.some((item, index) => {
            return this.hasuserArray.indexOf(item.id) != -1;
        })
    }

    // 所属机构全路径处理
    namePath(str) {
        if (str) {
            return str.replace(/,/g, '/');
        }
    }
}
