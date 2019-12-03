import { UgcActivityMessageService } from './../../../../service/ugc-activity-message.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UgcActivity } from './../../../../entity/ugc-activity';
import { Request } from '@angular/http';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-activity-messages-add',
    templateUrl: './ugc-activity-messages-add.component.html',
    styleUrls: ['./ugc-activity-messages-add.component.scss']
})
export class UgcActivityMessagesAddComponent implements OnInit {

    validateForm: FormGroup;
    modeOption: any;
    scopeOption: any;
    isVisible: boolean = false;
    selection: any = [];
    path: string;
    ugcActivity: UgcActivity;
    realName: string;
    sourceId: number;
    messageBoxId: number;
    selectedScope: any = [];
    userIsNull: boolean = false;
    loading: boolean = false;

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

    constructor(
        private fb: FormBuilder,
        private ugcActivityMessageService: UgcActivityMessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.modeOption = [
            { label: '站内短消息', value: 'modeStation', checked: true, disabled: true },
            { label: '邮件 ', value: 'modeEmail', checked: false },
            { label: '短信', value: 'modeNews', checked: false },
        ];
        this.scopeOption = [
            { label: '注册人员', value: 'REQUIRED', checked: false },
            { label: '报名人员', value: 'OPEN_ENROLLED', checked: false },
            { label: '审核人员', value: 'OPEN_NOT_ENROLLED', checked: false },
            { label: '专家', value: 'CLOSED_ENROLLED', checked: false }
        ]
        this.validateForm = this.fb.group({
            types: [null, [Validators.required]],
            scopes: [null, []],
            title: [null, [Validators.required]],
            content: [null, [Validators.required]],
            receiveUsers: [[]],
            sendTime: [null],
            attachmentUrl: [null],
        });
        this.route.params.subscribe(
            obj => {
                this.sourceId = obj['activityId'];
            }
        );
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
            this.messageBoxId = data.ugcActivity.messageBoxId;
        });
        this.ugcActivityMessageService.getPersonTotalInScopes(this.sourceId).subscribe(
            obj => {
                this.scopeOption.forEach(item => {
                    if (obj[item.value] == 0) {
                        item.disabled = true;
                        item.checked = false;
                    }
                })
            },
            err => {
                tipMessage(err);
            }
        )
    }

    realPath(e) {
        this.path = e[0].relativePath;
        this.realName = e[0].originFileName;
    }
    _submitForm() {
        this.loading = true;
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }

        this.selectedScope = [];
        for (const i in this.validateForm.value.scopes) {
            if (this.validateForm.value.scopes[i].checked) {
                this.selectedScope.push(this.validateForm.value.scopes[i].value);
            }
        }
        this.validateForm.value.scopes = this.selectedScope;

        if (this.selectedScope.length == 0 && this.selection.length == 0) {
            this.userIsNull = true;
            this.loading = false;
            return;
        } else {
            this.userIsNull = false;
        }


        if (this.validateForm.invalid) {
            this.loading = false;
            return;
        }
        this.selection.forEach(e => {
      this.validateForm.value.receiveUsers.push(e);
        });
        this.validateForm.value.attachmentUrl = this.path;

        this.validateForm.value.types = ['INNER'];
        if (this.modeOption[1].checked) {
            this.validateForm.value.types.push('EMAIL');
        };
        if (this.modeOption[2].checked) {
            this.validateForm.value.types.push('SMS');
        }

        let value = this.validateForm.value;
        value.messageBox = { id: this.messageBoxId };
        value.sourceId = +this.sourceId;
        value.attachmentName = this.realName;
        value.sourceType = 'ugc_activity';
        value.plainText = this.validateForm.value.content;
        this.ugcActivityMessageService.createMess(this.ugcActivity.id, value).subscribe(
            ok => {
                tipMessage("保存成功", 'success');
                this.loading = false;
                this.goBack();
            },
            error => {
                tipMessage(error);
                this.loading = false;
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
    console.log("this.selection handleCancel:", this.selection);
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

        if (this.selectedScope.length == 0 && this.selection.length == 0) {
            return { required: true, error: true };
        }
    };
}
