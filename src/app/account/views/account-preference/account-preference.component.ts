import { AccountService } from './../../service/account.service';
import { AccountInfo } from './../../entity/account-info';
import { User } from 'app/system/entity/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-account-preference',
    templateUrl: './account-preference.component.html',
    styleUrls: ['./account-preference.component.scss']
})
export class AccountPreferenceComponent implements OnInit {

    accountInfo: AccountInfo;
    _form: FormGroup;

    _languages = [
        { value: 'zh_CN', label: '简体中文', disabled: false },
        { value: 'en_US', label: 'English', disabled: false },
    ];
    _identities = [
        { value: 'LEARNER', label: '学员', disabled: false },
        { value: 'INSTRUCTOR', label: '教辅', disabled: false },
        { value: 'ADMINISTRATOR', label: '管理员', disabled: false },
    ];

    constructor(private fb: FormBuilder, private accountInfoService: AccountService) { }

    ngOnInit() {
        this.findUser();
        // this.initForm();
    }

    initForm() {
        let m = this.accountInfo || new AccountInfo();
        this._form = this.fb.group({
            id: [m.id],
            language: [m.language || 'zh_CN'],
            defaultRole: [m.defaultRole || 'ADMINISTRATOR'],
            managerGroup: [m.managerGroup]
        });
    }

    findUser() {
        this.accountInfoService.findUser().subscribe(
            user => {
                this.accountInfo = user;
                this.initForm();
            }
        )
    }

    getFormControl(name) {
        return this._form.controls[name];
    }

    markAsDirty() {
        for (let key of Object.keys(this._form.controls)) {
            this._form.controls[key].markAsDirty();
        }
    }

    save() {
        this.markAsDirty();
        let value = this._form.value;
        this.accountInfoService.editPreference(value).subscribe(
            user => {
                this.accountInfo = user;
                this.initForm();
                tipMessage("偏好设置成功", 'success');
            },
            err => { tipMessage(err) }
        )
    }

    reset() {
        this.initForm();
    }

    logSelectGroup(e) {
        console.log(e);
    }

}
