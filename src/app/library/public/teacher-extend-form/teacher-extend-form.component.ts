import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Teacher } from '../../entity/teacher';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserGroup } from 'app/system/entity/user-group';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-teacher-extend-form',
  templateUrl: './teacher-extend-form.component.html',
  styleUrls: ['./teacher-extend-form.component.scss']
})
export class TeacherExtendFormComponent implements OnInit {

  @Input() isCreate: boolean;
  @Input() loading: boolean;
  @Input() teacher: Teacher;
  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  _form: FormGroup;
  _date = moment('1970-01-01');
  userGroup: any;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    if (this.isCreate) {
      this.teacher = new Teacher();
      let Num = "";
      for (let i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
      }
      this.teacher.teacherNo = 'JS' + Num;
    }
    this.initForm();
  }
  onSubmit(event, value) {
    if (this._form.invalid) {
      tipMessage('表单验证失败！');
      return;
    }
    this.teacher = value;
    this.teacher.teacherType = 'EXTERNAL';
    this.teacher.userGroup = this.userGroup;
    this.doSubmit.emit(this.teacher);
    // }
  }

  initForm() {
    let m = this.teacher || new Teacher();
    this._form = this.fb.group({
      teacherNo: [m.teacherNo ? m.teacherNo : this.teacher.teacherNo],
      name: [m.name, [Validators.required]],
      sex: [m.sex],
      birthday: [m.birthday ? moment(m.birthday) : null],
      phoneNumber: [m.phoneNumber, [Validators.required, Validators.pattern(/^1(3[0-9]|4[57]|5[012356789]|7[01678]|8[0-9])\d{8}$/)]],
      email: [m.email, [Validators.pattern(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)]],
      major: [m.major],
      rank: [m.rank],
      education: [m.education],
      degree: [m.degree],

    });
  }

}
