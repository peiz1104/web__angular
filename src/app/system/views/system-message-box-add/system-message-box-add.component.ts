import { User } from 'app/system/entity/user';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { CuiPagination, Column, Message } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from '@angular/http';
import { SystemMessageBoxService } from 'app/system/service/system-message-box-service';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-system-message-box-add',
    templateUrl: './system-message-box-add.component.html',
    styleUrls: ['./system-message-box-add.component.scss']
})
export class SystemMessageBoxAddComponent implements OnInit {

    validateForm: FormGroup;
    modeOption: any;
    isVisible: boolean = false;
    selection: any = [];
    path: string;
    realName: string;
    sourceId: number;
    messageBoxId: number;
    selectedScope: any = [];

    pagination: CuiPagination;
    receives: User[];
    searchtext: string;
    _checked: boolean = false;
    d_checked: boolean = false;
  loading: boolean = false;

    columns: Column[] = [
        { title: '用户名', data: 'username', style: { 'max-width': '100px', width: '100px' } },
        { title: '姓名', data: 'displayName', styleClass: 'text-center' },
        { title: '手机号', data: 'phoneNumber', styleClass: 'text-center' },
        { title: '电子邮箱', data: 'emain', styleClass: 'text-center' },
        { title: '所属组织', data: 'userGroup.name', styleClass: 'text-center' },
    ];

    isAllSite: boolean = false;

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
        private location: Location,
        private route: ActivatedRoute,
        private systemMessageBox: SystemMessageBoxService
    ) { }

    ngOnInit() {
        this.messageBoxId = +this.route.snapshot.paramMap.get("messageBoxId");
        this.modeOption = [
            { label: '站内短消息', value: 'modeStation', checked: true, disabled: true },
            { label: '邮件 ', value: 'modeEmail', checked: false },
            { label: '短信', value: 'modeNews', checked: false },
        ];
        this.validateForm = this.fb.group({
            types: [null, [Validators.required]],
            title: [null, [Validators.required]],
            content: [null, [Validators.required]],
            receiveUsers: [[]],
            sendTime: [null],
            attachmentUrl: [null],
            _checked: [null],
            _selectedUsers: []
        });
    }

    getReceives(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.searchtext,
            page: page ? page.number : 0,
            size: page ? page.size : '10',
            sort: page && page.sort ? page.sort : ''
        };
        this.systemMessageBox.receives(params).subscribe(
            pag => {
                this.pagination = pag;
                this.receives = pag.content;
            }
        );
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    // handleCancel(e) {
    //   this._checked = false;
    //   this.isVisible = false;
    // }
    // handleOk(e) {
    //   if (this._checked) {
    //     this.selection.push('全站点');
    //     this.isVisible = false;
    //   } else if (!this.selection.length) {
    //     this._message.warning('请选择用户');
    //   } else {
    //     this.isVisible = false;
    //   }
    // }
    allSite() {
        if (this.modeOption[1].checked || this.modeOption[2].checked) {
            this.isAllSite = true;
        } else {
            this.isAllSite = false;
        }
    }

    doAfterUserSelected(selected) {
        if (this._checked) {
            this.selection.push('全站点');
            this.isVisible = false;
        }
        this.selection = selected;
    }
    // showPerson() {
    //   this.getReceives();
    //   this.isVisible = true;
    // }
    // persons(arr) {
    //   this.selection = arr;
    //   this.isVisible = false;
    // }
    // delPerson() {
    //   this.selection = [];
    // }
    realPath(e) {
        this.path = e[0].relativePath;
        this.realName = e[0].originFileName;
    }
    scopesValidator = (control: FormControl): { [s: string]: boolean } => {
        this.selectedScope = [];

        for (const i in control.value) {
            if (control.value[i].checked) {
                this.selectedScope.push(control.value[i].value);
            }
        }
        if (this.selectedScope.length == 0) {
            return { required: true };
        }
    };


    _submitForm() {
    this.loading = true;
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }
        if (this.validateForm.invalid) {
            return;
        }

        if (this.modeOption[1].checked || this.modeOption[2].checked) {
            if (!this.selection.length) {
                tipMessage('接收人必填', 'error');
                return;
            } else {
                this.selection.forEach(e => {
                    this.validateForm.value.receiveUsers.push(e.id);
                });
            }
        } else {
            if (!this.getFormControl('_checked').value) {
                if (!this.selection.length) {
                    tipMessage('接收人必填', 'error');
                    return;
                } else {
                    this.selection.forEach(e => {
                        this.validateForm.value.receiveUsers.push(e.id);
                    });
                }
            }
        }


        this.validateForm.value.attachmentUrl = this.path;

        this.validateForm.value.types = ['INNER'];
        if (this.modeOption[1].checked) {
            this.validateForm.value.types.push('EMAIL');
        };
        if (this.modeOption[2].checked) {
            this.validateForm.value.types.push('SMS');
        }
        this.validateForm.value.scopes = this.selectedScope;
        let value = this.validateForm.value;
        value.messageBox = { id: this.messageBoxId };
        value.attachmentName = this.realName;
        value.sourceType = 'site';
        value.plainText = this.validateForm.value.content;
        value.allSite = this.getFormControl('_checked').value;
        if (!this.getFormControl('_checked').value) {
            value.allSite = false;
        }


        this.systemMessageBox.createMess(value).subscribe(
            ok => {
        this.loading = false;
                tipMessage('消息开始发送,这可能需要一段时间,请稍后刷新列表查看结果!', 'info', 5000);
                this.location.back();
            },
            error => {
        this.loading = false;
                tipMessage(error, 'error');
            }
        )
    }

    goBack() {
        this.location.back();
    }
}
