import { TeachernewService } from './../../service/teachernew.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-teacher-qualification-edit',
  templateUrl: './teacher-qualification-edit.component.html',
  styleUrls: ['./teacher-qualification-edit.component.scss']
})
export class TeacherQualificationEditComponent implements OnInit {

  qualificationId: number;
  teacher: any;
  constructor(
    private route: Router,
    private routeInfo: ActivatedRoute,
    private teachernewService: TeachernewService,
    private message: NzMessageService,
    private location: Location
  ) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params) => {
      this.qualificationId = params.id;
    })
    this.teachernewService.get(this.qualificationId).subscribe(
      res => {
        this.teacher = res;
      },
      err => {
        return tipMessage(err);
      }
    )
  }
  onSave(event) {
    let value = event.value;
    this.teachernewService.update(this.qualificationId, value).subscribe(
      ok => {
        tipMessage('保存成功', 'success');
        this.location.back();
      },
      err => {
        return tipMessage(err);
      }
    )
  }

  goBack() {
    this.location.back();
  }

}
