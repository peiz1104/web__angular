import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { Teacher } from '../../entity/teacher';
import { User } from 'app/system/entity/user';
import { NgForm } from '@angular/forms';
import { FormDataUtil } from '../../../core';

@Component({
  selector: 'spk-teacher-internal-form',
  templateUrl: './teacher-internal-form.component.html',
  styleUrls: ['./teacher-internal-form.component.scss']
})
export class TeacherInternalFormComponent implements OnInit {

  @Input() teacher: Teacher;
  @Input() loading: boolean;

  teacherWorkCode: string = "";


  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  user: User;
  constructor() { }
  ngOnInit() {
    if (this.teacher.user) {
      this.user = this.teacher.user;
    }
    let Num = "";
    for (let i = 0; i < 6; i++) {
      Num += Math.floor(Math.random() * 10);
    }
    this.teacher.teacherNo = 'JS' + Num;
  };
  onSubmit(e) {
    this.doSubmit.emit({ originEvent: e, teacher: this.teacher });
  }
  doAfterUserSelected(event?: any[]) {
    if (event && event.length > 0) {
      this.teacherWorkCode = event[0].username;
      this.teacher.name = event[0].displayName;
      this.teacher.user = event[0];
      this.teacher.email = event[0].email;
      this.teacher.sex = event[0].sex;
      this.teacher.phoneNumber = event[0].phoneNumber;
      this.teacher.userGroup = event[0].userGroup;
      if (event[0].userGroup) {
        this.teacher.userGroupName = event[0].userGroup.name;
      }
    }
  }
}
