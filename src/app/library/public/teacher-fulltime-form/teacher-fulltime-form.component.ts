import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherPartService, TeachernewService } from './../../service/teachernew.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-teacher-fulltime-form',
  templateUrl: './teacher-fulltime-form.component.html',
  styleUrls: ['./teacher-fulltime-form.component.scss']
})
export class TeacherFulltimeFormComponent implements OnInit {

  @Input() teacher: any = {};
  @Input() isEdit?: boolean = false;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();


  validateForm: FormGroup;
  userId: number;
  newId: number;
  constructor(
    private fb: FormBuilder,
    private teachernewService: TeachernewService,
    private teacherPartService: TeacherPartService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.initForm(this.teacher);
  }

  initForm(m) {
    // let m = this.teacher || {};
    this.validateForm = this.fb.group({
      username: [m.user && m.user.username],
      teacherName: [m.user && m.user.displayName, [Validators.required]],
      userGroupId: [m.user && m.user.userGroup.name, [Validators.required]],
      sex: m.user && m.user.sex,
      sexText: [m.user && (m.user.sex == 'MALE' ? '男' : '女')],
      birthday: [m.user && m.user.userAttribute && moment(m.user.userAttribute.birthday).unix() || ''],
      phoneNumber: [m.user && m.user.phoneNumber],
      email: [m.user && m.user.email],
      oldRank: m.rank,
      rank: [m.rank], // 职级
      star: [m.star], // 星级
      channel: [m.channel], // 渠道
      qualifications: [m.qualifications], // 讲师资格
      inductionTime: m.inductionTime? m.inductionTime : [moment(m.inductionTime).unix()], // 入职时间
      startDate: m.startDate? m.startDate : [moment(m.startDate).unix()], // 任教开始时间
      classHour: [m.classHour], // 课时数
      avgScore: [m.avgScore], // 平均得分
      schoolName: [m.schoolName], // 毕业学校
      graduationTime: m.graduationTime? m.graduationTime : [moment(m.graduationTime).unix()], // 毕业时间
      major: [m.major], // 所学专业
      education: [m.education], // 学历
      degree: [m.degree], // 学位
      workSummary: [m.workSummary], //工作小结
      description: [m.description], // 描述

    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  markAsDirty() {
    for (let name of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[name].markAsDirty();
    }
  }

  _save(event) {
    this.markAsDirty();
    if (this.validateForm.invalid) {
      return;
    }
    this.validateForm.value['userId'] = this.userId;
    this.validateForm.value['userGroupId'] = this.newId;
    this.save.emit({ originalEvent: event, value: this.validateForm.value });
  }

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    }
  }
  back(event) {
    this.cancel.emit({ originalEvent: event });
  }
  userLookupOk(e) {
    this.teacherPartService.isHas(e[0].id).subscribe(

      ok => {
        if (ok == 'false') {
          this.userId = e[0].id;
          this.newId = e[0].userGroup.id;
          this.initForm({ user: e[0] });
        } else {
          tipMessage('讲师已存在，请重新选择');
        }
      },
    )

  }

}
