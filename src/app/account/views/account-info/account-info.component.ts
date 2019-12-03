import { AccountInfo } from './../../entity/account-info';
import { AccountService } from './../../service/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-account-info',
    templateUrl: './account-info.component.html',
    styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
    _form: FormGroup;
    accountInfo: AccountInfo;
    constructor(private fb: FormBuilder, private accountInfoService: AccountService) {
        this.accountInfo = new AccountInfo();
    }

    ngOnInit() {
        this.findUser();
        // this.initForm();
    }

    initForm() {
        let accountInfo = this.accountInfo ? this.accountInfo : new AccountInfo();
        this._form = this.fb.group({
            id: [accountInfo.id],
            phoneNumber: [this.accountInfoService.replacePhone(accountInfo.phoneNumber), [Validators.required]],
            email: [this.accountInfoService.replaceEmail(accountInfo.email), [Validators.required, Validators.email]]
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
    markAsDirty() {
        for (let key of Object.keys(this._form.controls)) {
            this._form.controls[key].markAsDirty();
        }
    }

    save() {
        this.markAsDirty();
        if (this._form.invalid) {
            tipMessage('表单填写有误，请根据提示更正后重新尝试', '', 4000);
            return;
        }

        let value = this._form.value;
        this.accountInfoService.editBaseInfo(value).subscribe(
            user => {
                this.accountInfo = user;
                tipMessage('保存成功', 'success');
            },
            err => { tipMessage(err) }
        )
    }

    reset() {
        this.initForm();
    }
}
