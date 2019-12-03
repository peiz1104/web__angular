import { TeachernewService } from './../../service/teachernew.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-teacher-qualification-add',
  templateUrl: './teacher-qualification-add.component.html',
  styleUrls: ['./teacher-qualification-add.component.scss']
})
export class TeacherQualificationAddComponent implements OnInit {

  constructor(
    private teachernewService: TeachernewService,
    private message: NzMessageService,
    private location: Location
  ) { }

  ngOnInit() {
  }
  onSave(event) {
    let value = event.value;
    this.teachernewService.add(value).subscribe(
      ok => {
        tipMessage('添加成功', 'success');
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
