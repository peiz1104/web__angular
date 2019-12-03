import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../entity/user';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { FormDataUtil } from '../../../core';
import { FormGroup } from '@angular/forms/src/model';

@Component({
  selector: 'spk-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  @Input() isCreate: boolean;
  @Input() saveLoading: boolean;
  @Input() nextLoading: boolean;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  confirmPassword: string = "";

  _form: FormGroup;
  isConfirm: boolean = false;
  radioValue: boolean = true;

  _languages = [
    { value: 'zh_CN', label: '简体中文', disabled: false },
    { value: 'en_US', label: 'English', disabled: false },
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let m = this.user || new User();
    if (m.id) {
      this._form = this.fb.group({
        username: [m.username, [Validators.required]], // , Validators.pattern(/^[a-zA-Z0-9_-]{2,20}$/)
        firstName: [m.firstName],
        lastName: [m.lastName],
        displayName: [m.displayName, [Validators.required]],
        phoneNumber: [m.phoneNumber],
        email: [m.email, [Validators.required]],
        password: [],
        confirmPassword: [],
        sex: [m.sex],
        status: [m.status],
        userGroup: [m.userGroup],
        startDate: [m.startDate],
        endDate: [m.endDate],
        language: [m.language || 'zh_CN'],
        avatar: [m.avatar || '']
      });
    } else {
      this._form = this.fb.group({
        username: [m.username, [Validators.required]],
        firstName: [m.firstName],
        lastName: [m.lastName],
        displayName: [m.displayName, [Validators.required]],
        phoneNumber: [m.phoneNumber],
        email: [m.email, [Validators.required]],
        password: [m.password, [Validators.required]],
        confirmPassword: [m.confirmPassword, [Validators.required]],
        sex: [m.sex],
        status: [m.status],
        userGroup: [m.userGroup],
        startDate: [m.startDate],
        endDate: [m.endDate],
        language: [m.language || 'zh_CN'],
        avatar: [m.avatar || '']
      });
    }
  }

  onImageUpload(e) {
    this._form.value['avatar'] = e[0].relativePath;
  }

  getFormControl(name) {
    return this._form.controls[name];
  }

  markAsDirty() {
    for (let key of Object.keys(this._form.controls)) {
      this._form.controls[key].markAsDirty();
    }
  }

  testConfirm() {
    let opswd = this.getFormControl('password').value;
    let npswd = this.getFormControl('confirmPassword').value;
    this.isConfirm = opswd === npswd ? false : true;
  }

  _save(event, next?) {
    this.markAsDirty();
    if (this._form.invalid) {
      return;
    }
    let emitValue = { originalEvent: event, value: this._form.value };
    if (next) {
      emitValue['next'] = 'next';
    }
    this.save.emit(emitValue);
  }

  _cancel(event) {
    this.cancel.emit({ originalEvent: event });
  }

  keyUp() {
    let reg = /[^\w_]/g;
    let valueInfo = this.getFormControl('username').value;
    this._form.get('username').setValue(valueInfo.replace(reg, ""));
  }
}
