import { TrainingClassMessageApiService } from './../../../../service/training-class-message.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingClass } from './../../../../entity/training-class';
import { Request } from '@angular/http';
import { duration } from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-messages-add',
    templateUrl: './training-class-messages-add.component.html',
    styleUrls: ['./training-class-messages-add.component.scss']
})
export class TrainingClassMessagesAddComponent implements OnInit {
    validateForm: FormGroup;
    modeOption: any;
    scopeOption: any;
    isVisible: boolean = false;
    selection: any = [];
    path: string;
    fullPath: string;
    realName: string;
    sourceId: number;
    messageBoxId: number;
    selectedScope: any = [];
    loading: boolean = false;
    trainingName: string;
    searchtext;
    userGroupId;
    userGroupIds;
    ueditorSetting = {
        toolbars: [[
            'source', '|', 'undo', 'redo', '|', 'bold', 'italic', '|',
            'underline', 'strikethrough', '|', 'superscript', 'subscript', '|',
            'forecolor', 'backcolor', '|', 'removeformat', '|', 'insertorderedlist', 'insertunorderedlist', '|',
            'selectall', 'cleardoc', 'paragraph', '|', 'fontfamily', 'fontsize', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'link', 'unlink'
        ]]
    };

    _value: any[] = []; // 用户组选择
    isVisibleUserGroup: boolean = false;
    spinning: boolean = false;
    data: any;
    selectionUserGroup: any[] = [];
    columns = [
        // { title: 'ID', data: 'id', styleClass: 'text-center' },
        { title: '名称', data: 'name', styleClass: 'text-left' },
        { title: '所属组织', tpl: 'userGroup', styleClass: 'text-left' },
        { title: '创建人', tpl: 'createUser' },
        { title: '创建日期', tpl: 'createDate', styleClass: 'text-center' }
    ];
    constructor(
        private fb: FormBuilder,
        private trainingClassMessageApiService: TrainingClassMessageApiService,
        private location: Location,
        private route: ActivatedRoute
    ) {
    }

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
            scopes: [null, [this.scopesValidator]],
            title: [null, [Validators.required]],
            content: [null, [Validators.required]],
            // receiveUsers: [[]],
            sendTime: [null, [this.sendTimeValidator]],
            attachmentUrl: [null],
            fullPath: [null],
            userIds: [],
            userGroupIds: []
        });
        this.route.params.subscribe(
            obj => {
                this.sourceId = obj['tbcId'];
            }
        );
        this.route.data.subscribe((data: { target: TrainingClass }) => {
            this.messageBoxId = data.target.messageBoxId;
            this.trainingName = data.target.name;
        });
        this.trainingClassMessageApiService.getPersonTotalInScopes(this.sourceId).subscribe(
            obj => {
                this.scopeOption.forEach(item => {
                    if (obj[item.value] == 0) {
                        item.disabled = true;
                        item.checked = false;
                    }
                })
            });
    }
    _disabledDate(current: Date): boolean {
        return current.getTime() < Date.now() - 86400000;
    }

    realPath(e) {
        this.path = e[0].relativePath;
        this.realName = e[0].originFileName;
        this.fullPath = e[0].fullPath;
    }
    _submitForm() {
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }
        if (this.validateForm.invalid) {
            this.loading = false;
            return;
        }

        // this.selection.forEach(e => {
        //     this.validateForm.value.receiveUsers.push(e.id);
        // });
        this.validateForm.value.attachmentUrl = this.path;
        this.validateForm.value.fullPath = this.fullPath;
        this.validateForm.value.types = ['INNER'];
        if (this.modeOption[1].checked) {
            this.validateForm.value.types.push('EMAIL');
        };
        if (this.modeOption[2] && this.modeOption[2].checked) {
            this.validateForm.value.types.push('SMS');
        }
        this.validateForm.value.scopes = this.selectedScope;
        let value = this.validateForm.value;
        value.messageBox = { id: this.messageBoxId };
        value.sourceId = +this.sourceId;
        value.attachmentName = this.realName;
        value.sourceType = 'training_class';
        value.plainText = this.validateForm.value.content;
        value.userIds = this.getIds(value.userIds);
        value.logicalGroupIds = this.getIds(this._value);
        value.userGroupIds = this.getIds(value.userGroupIds);
        // console.log(value, 4444);
        if (value.scopes.length == 0 && value.userIds.length == 0 && value.logicalGroupIds.length == 0 && value.userGroupIds.length == 0) {
            return tipMessage('通知范围、用户、用户组、组织至少选一', '', 5000);
        }
        this.loading = true;
        this.trainingClassMessageApiService.createMess(value).subscribe(
            ok => {
                tipMessage('消息开始发送,这可能需要一段时间,请稍后刷新列表查看结果!', 'info', 5000);
                this.loading = false;
                this.goBack();
            },
            error => {
                this.loading = false;
                tipMessage(error);
            }
        )

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
    scopesValidator = (control: FormControl): { [s: string]: boolean } => {
        this.selectedScope = [];

        for (const i in control.value) {
            if (control.value[i].checked) {
                this.selectedScope.push(control.value[i].value);
            }
        }
        return {};
    };

    get isUserNull() {
        if (this.selectedScope.length == 0 && this.selection.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    sendTimeValidator = (control: FormControl): { [s: string]: boolean } => {

        if (control.value != null && control.value < Date.now()) {
            return { sendTimebefore: true, error: true };
        }
    };
    // 用户组选择
    loadUserGoupData() {
        this.spinning = true;

        let params = {
            name: this.searchtext,
            'messageBox.id': this.messageBoxId,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
        };
        if (this.userGroupIds) {
            if (Object.prototype.toString.call(this.userGroupIds) == "[object Array]") {
                params['userGroupIds'] = this.userGroupIds.map(it => it.id);
            } else {
                params['userGroupIds'] = this.userGroupIds.id;
            }
        }
        this.trainingClassMessageApiService.getUserGroupList(params).subscribe(
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
    }
    handleOkUserGroup(event) {
        this._value = this._value.concat(this.filterHasUser(this.selectionUserGroup));
        // console.log(this._value, this.selectionUserGroup);
        this.isVisibleUserGroup = false;
        this.selectionUserGroup = [];
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
                return value.replace(/\,|\，/g, '/')
            } else {
                return value;
            }
        } else {
            return '---'
        }
    }
}
