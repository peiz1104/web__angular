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
    selector: 'spk-training-class-messages-info',
    templateUrl: './training-class-messages-info.component.html',
    styleUrls: ['./training-class-messages-info.component.scss']
})
export class TrainingClassMessagesInfoComponent implements OnInit {
    message: any;
    messageInfo: any;
    messageRange: any;
    messageId: number;
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
        { title: 'ID', data: 'id', styleClass: 'text-center' },
        { title: '名称', data: 'name', styleClass: 'text-center' },
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
            { label: '站内短消息', value: 'INNER', checked: false, disabled: true },
            { label: '邮件 ', value: 'EMAIL', checked: false, disabled: true },
            // { label: '短信', value: 'SMS', checked: false, disabled: true },
        ];
        this.scopeOption = [
            { label: '必修注册', value: 'REQUIRED', checked: false, disabled: true },
            { label: '选修注册已选', value: 'OPEN_ENROLLED', checked: false, disabled: true },
            { label: '选修注册未选', value: 'OPEN_NOT_ENROLLED', checked: false, disabled: true },
            { label: '审批注册已通过', value: 'CLOSED_ENROLLED', checked: false, disabled: true },
            { label: '审批注册未通过', value: 'CLOSED_REFUSED', checked: false, disabled: true },
        ]
        this.route.params.subscribe(
            obj => {
                this.sourceId = obj['tbcId'];
            }
        );
        this.route.data.subscribe((data: { target: TrainingClass }) => {
            this.messageBoxId = data.target.messageBoxId;
            this.trainingName = data.target.name;
        });
        // this.initForm();
        this.getMessageById();

    }
    initForm() {
        let m = this.messageInfo;
        let n = this.messageRange;
        this.validateForm = this.fb.group({
            types: [this.modeOption],
            scopes: [this.scopeOption],
            title: [m && m.title || null],
            content: [m && m.content || null],
            sendTime: [m && m.sendTime || null],
            attachmentUrl: [m && m.attachmentUrl || null],
            attachmentName: [m && m.attachmentName || null],
            fullPath: [m && m.fullPath || null],
            userIds: [n && n.users || null],
            userGroupIds: [n && n.userGroups || null],
            logicalGroupIds: [n && n.logicalGroups || null],
        });
        this._value = n && n.logicalGroups || null;
    }

    getMessageById() {
        this.route.params.subscribe(
            obj => {
                this.messageId = obj['id'];
            }
        );
        this.trainingClassMessageApiService.getMessageInfo(this.messageId).subscribe(
            obj => {
                this.message = obj;
                this.messageInfo = obj.message;
                this.messageRange = obj.messageSendRange;
                if (this.messageRange && this.messageRange.types) {
                    this.modeOption.forEach(item => {
                        this.messageRange.types.forEach(type => {
                            if (type == item.value) {
                                item.checked = true;
                            }
                        });
                    })
                }
                if (this.messageRange && this.messageRange.scopes) {
                    this.scopeOption.forEach(item => {
                        this.messageRange.scopes.forEach(scope => {
                            if (scope == item.value) {
                                item.checked = true;
                            }
                        });
                    })
                }
                this.initForm();
                console.log("messageInfo", this.messageInfo);
                console.log("messageRange", this.messageRange);
                this.loading = true;
            },
            err => {
                tipMessage('获取消息详情失败!', '', 5000);
                this.goBack();
            }
        );
    }

    _disabledDate(current: Date): boolean {
        return current.getTime() < Date.now() - 86400000;
    }

    realPath(e) {
        this.path = e[0].relativePath;
        this.realName = e[0].originFileName;
        this.fullPath = e[0].fullPath;
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


    sendTimeValidator = (control: FormControl): { [s: string]: boolean } => {

        if (control.value != null && control.value < Date.now()) {
            return { sendTimebefore: true, error: true };
        }
    };
    // 用户组选择
    loadUserGoupData() {
        this.spinning = true;
        let params = {
            'messageBox.id': this.messageBoxId,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
        };
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
}
