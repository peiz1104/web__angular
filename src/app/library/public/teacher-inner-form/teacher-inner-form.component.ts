import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Teacher } from '../../entity/teacher';
import { User } from '../../../system/entity/user';

@Component({
  selector: 'spk-teacher-inner-form',
  templateUrl: './teacher-inner-form.component.html',
  styleUrls: ['./teacher-inner-form.component.scss']
})
export class TeacherInnerFormComponent implements OnInit {

  @Input() teacher?: Teacher;
  @Input() loading?: boolean;
  @Input() isCreate?: boolean;

  _form: FormGroup;

  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  user: User;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if (this.isCreate) {
      this.teacher = new Teacher();
      let Num = "";
      for (let i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
      }
      this.teacher.teacherNo = 'JS' + Num;
    } else {
      if (this.teacher.user) {
        this.user = this.teacher.user;
      }
    }
    this._initForm();
  };

  _initForm() {
    let m = this.teacher || new Teacher();
    this._form = this.fb.group({
      id: [m.id],
      name: [m.name],
      user: [m.user || this.user],
      sex: [m.sex || 'MALE'],
      birthday: [m.birthday],
      startDate: [m.startDate],
      phoneNumber: [m.phoneNumber],
      userGroupName: [m.userGroupName],
      inductionTime: [m.inductionTime],
      post: [m.post],
      teacherNo: [m.teacherNo],
      rank: [m.rank || 'I', Validators.required],
      email: [m.email],
      classHour: [m.classHour, [Validators.pattern(/^([1-9][0-9]*)$/)]],
      avgScore: [m.avgScore, [Validators.pattern(/^([1-9][0-9]*)$/)]],
      schoolName: [m.schoolName],
      graduationTime: [m.graduationTime],
      major: [m.major],
      education: [m.education || 'D', Validators.required],
      degree: [m.degree || 'X', Validators.required],
      description: [m.description],
      teacherType: ['INTERNAL']
    });
  }

  getFormControl(name) {
    return this._form.controls[name];
  }

  markAsDirty() {
    for (let key of Object.keys(this._form.controls)) {
      this._form.controls[key].markAsDirty();
    }
  }

  onSubmit(e) {
    this.doSubmit.emit({ originEvent: e, value: this._form.value });
  }
  doAfterUserSelected(event?: any[]) {
    if (event && event.length > 0) {
      this.getFormControl("name").setValue( event[0].displayName);
      this.getFormControl("user").setValue( event[0]);
      this.getFormControl("email").setValue( event[0].email);
      this.getFormControl("sex").setValue( event[0].sex);
      this.getFormControl("phoneNumber").setValue( event[0].phoneNumber);
      if (event[0].userGroup) {
        this.teacher.userGroupName = event[0].userGroup.name;
        this.getFormControl("userGroupName").setValue( event[0].userGroup.name);
      }
    }
  }

}
