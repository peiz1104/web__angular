import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResearchService } from './../service/research.service';
import { Request } from '@angular/http';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-noticeadd',
    templateUrl: './noticeadd.component.html',
    styleUrls: ['./noticeadd.component.scss']
})
export class NoticeaddComponent implements OnInit {
    validateForm: FormGroup;
    modeOption: any;
    scopeOption: any;
    isVisible: boolean = false;
    selection: any = [];
    path: string;
    realName: string;
    sourceId: number;
    devId: any;
    messageBoxId: number;
    selectedScope: any = [];
    _checked: boolean = false;
    tchecked: boolean = false;
    submitState: boolean = false;
    _value: any[] = []; // 用户组选择
    isVisibleUserGroup: boolean = false;
    spinning: boolean = false;
    data: any;
    selectionUserGroup: any[] = [];
    searchtext: string;
    userGroupIds: any;
    columns = [
        // { title: 'ID', data: 'id', styleClass: 'text-left' },
        { title: '名称', data: 'name', styleClass: 'text-left' },
        { title: '所属组织', tpl: 'userGroup', styleClass: 'text-left' },
        { title: '创建人', tpl: 'createUser' },
        { title: '创建日期', tpl: 'createDate', styleClass: 'text-center' }
    ];
    constructor(
        private fb: FormBuilder,
        private service: ResearchService,
        private location: Location,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.modeOption = [
            { label: '站内短消息', value: 'modeStation', checked: true, disabled: true },
            { label: '邮件 ', value: 'modeEmail', checked: false },
            // { label: '短信', value: 'modeNews', checked: false },
        ];
        this.scopeOption = [
            { label: '必修注册', value: 'REQUIRED', checked: false },
            { label: '选修注册已选', value: 'OPEN_ENROLLED', checked: false },
            { label: '选修注册未选', value: 'OPEN_NOT_ENROLLED', checked: false },
            { label: '审批注册已通过', value: 'CLOSED_ENROLLED', checked: false },
            { label: '审批注册未通过', value: 'CLOSED_REFUSED', checked: false },
        ]
        this.validateForm = this.fb.group({
            types: [null, [Validators.required]],
            title: [null, [Validators.required]],
            content: [null, [Validators.required]],
            // receiveUsers: [[]],
            sendTime: [null],
            attachmentUrl: [null],
            phaseId: [],
            tphaseId: [],
            userIds: [null],
            userGroupIds: [[]]
        });
        // this.route.params.subscribe(
        //     obj => {
        //         this.sourceId = obj['tbcId'];
        //     }
        // );
        this.route.paramMap.subscribe((params) => {
            this.messageBoxId = +params.get('messageBoxId');
            this.sourceId = +params.get('stepId');
            this.devId = +params.get('id');
        })
    }
    realPath(e) {
        this.path = e[0].relativePath;
        this.realName = e[0].originFileName;
    }
    _submitForm() {
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }
        if (this.validateForm.invalid) {
            return;
        }
        this.selection.forEach(e => {
            this.validateForm.value.receiveUsers.push(e.id);
        });
        this.validateForm.value.attachmentUrl = this.path;

        this.validateForm.value.types = ['INNER'];
        if (this.modeOption[1].checked) {
            this.validateForm.value.types.push('EMAIL');
        };
        if (this.modeOption[2] && this.modeOption[2].checked) {
            this.validateForm.value.types.push('SMS');
        }
        let value = this.validateForm.value;
        value.messageBox = { id: this.messageBoxId };
        value.sourceId = +this.sourceId;
        value.attachmentName = this.realName;
        value.plainText = this.validateForm.value.content;
        value.phaseId = this._checked ? this.sourceId : null;
        value.tphaseId = this.tchecked ? this.sourceId : null;
        value.userIds = this.getIds(value.userIds);
        value.logicalGroupIds = this.getIds(this._value);
        value.userGroupIds = this.getIds(value.userGroupIds);
        // tslint:disable-next-line:max-line-length
        if ((!value.tphaseId && !value.phaseId) && value.userIds.length == 0 && value.logicalGroupIds.length == 0 && value.userGroupIds.length == 0) {
            return tipMessage('研发人员、用户、用户组、组织至少选一', '', 5000);
        }
        this.submitState = true;
        this.service.createMess(this.devId, value).subscribe(
            ok => {
                tipMessage('保存成功！', 'success');
                this.goBack();
                this.submitState = false;
            },
            error => {
                this.submitState = false;
                tipMessage(error);
            }
        )
    }
    loadUserGoupData() {
        this.spinning = true;
        let params = {
            'messageBox.id': this.messageBoxId,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
            name: this.searchtext,
            userGroupIds: this.userGroupIds ? this.userGroupIds.id : this.userGroupIds
        };
        this.service.getUserGroupList(params).subscribe(
            obj => {
                this.data = obj;
                this.spinning = false;
            },
            err => {
                this.spinning = false;
            }
        );
    }
    openLookup() {
        this.isVisibleUserGroup = true;
        this.loadUserGoupData();
    }
    handleCancelUserGroup(event) {
        this._value = this._value;
        this.selectionUserGroup = [];
        this.isVisibleUserGroup = false;
        this.searchtext = undefined;
        this.userGroupIds = undefined;
    }
    handleOkUserGroup(event) {
        this._value = this._value.concat(this.filterHasUser(this.selectionUserGroup));
        // console.log(this._value, this.selectionUserGroup);
        this.isVisibleUserGroup = false;
        this.selectionUserGroup = [];
        this.searchtext = undefined;
        this.userGroupIds = undefined;
    }
    _remove(event, u, _value) {
        // console.log(u, _value);
        // tslint:disable-next-line:no-arg
        let e = arguments[0] || event;
        if (e && e.stopPropagation) {
            e.stopPropagation()
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
        // event.stopPropagation();
        this._value = _value.filter((item) => {
            return item.id != u.id;
        })
    }
    filterHasUser(array: any[]) {
        return array.filter((item, index) => {
            return this.getIds(this._value).indexOf(item.id) == -1;
        })
    }

    goBack() {
        this.location.back();
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    handleCancel(e) {
        this.isVisible = false;
    }
    showPerson() {
        this.isVisible = true;
    }
    persons(arr) {
        this.selection = arr;
        this.isVisible = false;
    }
    delPerson() {
        this.selection = [];
    }
    getIds(array: any) {
        let ids = [];
        if (array) {
            array.map((item, index) => {
                ids.push(item.id);
            })
            return ids;
        } else {
            return ids;
        }
    }
    getUsderGroupPathName(value) {
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
