import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Teacher } from '../../entity/teacher';

@Component({
  selector: 'spk-teacher-ext-from',
  templateUrl: './teacher-ext-from.component.html',
  styleUrls: ['./teacher-ext-from.component.scss']
})
export class TeacherExtFromComponent implements OnInit {

  @Input() isCreate: boolean;
  @Input() loading: boolean;
  @Input() teacher: Teacher;
  @Output() doSubmit: EventEmitter<any> = new EventEmitter();

  _form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if (this.isCreate) {
      this.teacher = new Teacher();
      let Num = "";
      for (let i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
      }
      this.teacher.teacherNo = 'JS' + Num;
    }
    this._initForm();
  }

  _initForm() {
    let m = this.teacher || new Teacher();
    this._form = this.fb.group({
      id: [m.id],
      name: [m.name, [Validators.required]],
      sex: [m.sex || 'MALE', Validators.required],
      birthday: [m.birthday],
      startDate: [m.startDate],
      phoneNumber: [m.phoneNumber],
      userGroup: [m.userGroup],
      teacherNo: [m.teacherNo],
      rank: [m.rank || 'I', Validators.required],
      email: [m.email],
      major: [m.major, Validators.required],
      education: [m.education || 'D', Validators.required],
      degree: [m.degree || 'X', Validators.required],
      teacherType: ['EXTERNAL']
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

  onSubmit(f: NgForm) {
    this.doSubmit.emit(this._form.value);
  }

}
