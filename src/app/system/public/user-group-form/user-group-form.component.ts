import { UserGroupService } from './../../service/user-group.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserGroup } from '../../entity/user-group';
import { NgForm, FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'spk-user-group-form',
  templateUrl: './user-group-form.component.html',
  styleUrls: ['./user-group-form.component.scss']
})
export class UserGroupFormComponent implements OnInit {
  @Input() userGroup: UserGroup;
  @Input() isCreate: boolean;
  @Input() loading: boolean;

  @Output() doSubmit = new EventEmitter();

  _form: FormGroup;
  codeIsExist: boolean = false;
  nameIsExist: boolean = false;

  regionTypes = [
    { label: '请选择', value: '' },
    { label: '总公司', value: 'PARENT' },
    { label: '省公司', value: 'PROVINCE' },
    { label: '地市公司', value: 'PREFECTURE' }
  ];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private ugService: UserGroupService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let m = this.userGroup || new UserGroup();
    this._form = this.fb.group({
      id: [m.id],
      code: [m.code, [Validators.required, Validators.maxLength]],
      name: [m.name, Validators.required],
      regionType: [m.regionType],
      parent: [m.parent],
      description: [m.description, Validators.maxLength],
    });
  }

  markAsDirty() {
    for (let key of Object.keys(this._form.controls)) {
      this._form.controls[key].markAsDirty();
    }
  }

  getFormControl(name) {
    return this._form.controls[name];
  }

  onSubmit(e) {
    this.markAsDirty();
    if (this.codeIsExist) {
      return;
    }
    if (this._form.invalid) {
      this.message.error('组织信息填写有误，请修改后重试。');
      return;
    }

    let parentId, selfId;
    if (this.getFormControl("parent").value) {
      parentId = +this.getFormControl("parent").value.id;
    }
    if (this.getFormControl("id").value) {
      selfId = +this.getFormControl("id").value;
    }
    let params = { groupName: this.getFormControl('name').value, parentId: parentId, selfId: selfId }
    this.ugService.nameExist(params).subscribe(
      ok => {
        this.nameIsExist = false;
        this.submitInfo();
      },
      err => {
        this.nameIsExist = true;
        return;
      }
    );

  }

  submitInfo() {
    let regionType = this.getFormControl('regionType').value;
    if (!regionType) {
      regionType = "";
    }
    if (this.isCreate && regionType.trim().length == 0) {
      this.getFormControl("regionType").setValue(null);
    }
    let value = this._form.value;
    value['id'] = this.userGroup.id;
    this.doSubmit.emit(value);
  }

  codeExist() {
    if (!this.getFormControl("code").dirty) {
      return;
    } else {
      this.ugService.codeExist(this.getFormControl('code').value).subscribe(
        ok => {
          this.codeIsExist = false;
        },
        err => {
          this.codeIsExist = true;
        }
      );
    }
  }
}
