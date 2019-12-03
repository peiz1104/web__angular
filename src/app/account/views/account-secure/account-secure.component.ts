import { CuiLayer, LayerConfig } from 'console-ui-ng';
import { AccountService } from './../../service/account.service';
import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { AccountInfo } from './../../entity/account-info';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { confirmPasswordValidator } from 'app/account/validator/confirmPasswordValidator';
import { tipMessage } from 'app/account/entity/message-tip';
import { NzToolTipModule } from 'ng-zorro-antd/src/tooltip/nz-tooltip.module';

@Component({
    selector: 'spk-account-secure',
    templateUrl: './account-secure.component.html',
    styleUrls: ['./account-secure.component.scss']
})
export class AccountSecureComponent implements OnInit {
    _passwordForm: FormGroup;
    _phoneForm: FormGroup;
    _emailForm: FormGroup;
    accountInfo: AccountInfo;
    currentModal: NzModalSubject;
    isConfirmLoading = false;
    editId: number;
    phonePattern = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$";

    constructor(private fb: FormBuilder,
        private accountInfoService: AccountService, private model: NzModalService) {
        this.accountInfo = new AccountInfo();
    }
    ngOnInit() {
        this.findUser();
    }

    initEmailForm() {
        this._emailForm = this.fb.group({
            editId: [this.editId],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    initPasswordForm() {
        this._passwordForm = this.fb.group({
            editId: [this.editId],
            newPassword: ['', [Validators.required]],
            confirmPassword: ['', []],
            oldPassword: ['', [Validators.required]]
        });

        this.getControl(this._passwordForm, 'confirmPassword').setValidators(
            [confirmPasswordValidator(this.getControl(this._passwordForm, 'confirmPassword')), Validators.required]);
    }

    initPhoneForm() {
        this._phoneForm = this.fb.group({
            editId: [this.editId],
            phoneNumber: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
        });
    }

    findUser() {
        this.accountInfoService.findUser().subscribe(
            user => {
                this.accountInfo = user;
                this.editId = this.accountInfo ? this.accountInfo.id : -1;
                this.initEmailForm();
                this.initPasswordForm();
                this.initPhoneForm();
            }
        )
    }

    markAsDirty(_formGroup: FormGroup) {
        for (let key of Object.keys(_formGroup.controls)) {
            _formGroup.controls[key].markAsDirty();
            _formGroup.markAsDirty();
        }
    }

    getControl(_formGroup: FormGroup, key: string): AbstractControl {
        return _formGroup.get(key);
    }

    savePassword() {
        this.isConfirmLoading = true;
        this.markAsDirty(this._passwordForm);
        if (this._passwordForm.invalid) {
            tipMessage('表单填写有误，请根据提示更正后重新尝试', '', 5000);
            this.isConfirmLoading = false;
            return;
        }
	if (this.getControl(this._passwordForm, "newPassword").value != this.getControl(this._passwordForm, "confirmPassword").value) {
	    console.log(this.getControl(this._passwordForm, "newPassword").value);
	    console.log(this.getControl(this._passwordForm, "confirmPassword").value);
	    tipMessage('新密码和确认密码两次输入不一致','warning');
	    this.isConfirmLoading = false;
	    return;
	}
        let value = this._passwordForm.value;
        this.accountInfoService.editPassword(value).subscribe(
            user => {
                this.accountInfo = user;
                tipMessage("更改成功", 'success');
                this.currentModal.destroy("onOk");
            },
            err => {
                this.isConfirmLoading = false;
                tipMessage(err)
            }
        )
    }

    saveEmail() {
        this.isConfirmLoading = true;
        this.markAsDirty(this._emailForm);
        if (this._emailForm.invalid) {
            tipMessage('表单填写有误，请根据提示更正后重新尝试', '', 5000);
            this.isConfirmLoading = false;
            return;
        }
        let value = this._emailForm.value;
        this.accountInfoService.editEmail(value).subscribe(
            user => {
                this.accountInfo = user;
                tipMessage("更改成功", 'success');
                this.currentModal.destroy("onOk");
            },
            err => {
                this.isConfirmLoading = false;
                tipMessage(err)
            }
        )
    }

    savePhone() {
        this.isConfirmLoading = true;
        this.markAsDirty(this._phoneForm);
        if (this._phoneForm.invalid) {
            tipMessage('表单填写有误，请根据提示更正后重新尝试', '', 5000);
            this.isConfirmLoading = false;
            return;
        }
        let value = this._phoneForm.value;
        this.accountInfoService.editPhone(value).subscribe(
            user => {
                this.accountInfo = user;
                tipMessage("更改成功", 'success');
                this.currentModal.destroy("onOk");
            },
            err => {
                this.isConfirmLoading = false;
                tipMessage(err)
            }
        )
    }

    reset(_formGroup: FormGroup) {
        _formGroup.reset();
    }

    replaceEmail(email): string {
        return this.accountInfoService.replaceEmail(email);
    }

    replacePhone(phone): string {
        return this.accountInfoService.replacePhone(phone);
    }

    showModalForTemplate(titleTpl, contentTpl, footerTpl, operationFlag) {
        if (operationFlag == 'email') {
            this.initEmailForm();
        } else if (operationFlag == 'phone') {
            this.initPhoneForm();
        } else {
            this.initPasswordForm();
        }
        this.isConfirmLoading = false;
        this.currentModal = this.model.open({
            title: titleTpl,
            content: contentTpl,
            footer: footerTpl,
            maskClosable: false,
            onOk() {
            }
        });
    }

    // get oldPassword() { return this._passwordForm.get('oldPassword')};
}
