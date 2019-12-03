import { TeacherPartService } from './../../service/teachernew.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-teacher-external-add',
  templateUrl: './teacher-external-add.component.html',
  styleUrls: ['./teacher-external-add.component.scss']
})
export class TeacherExternalAddComponent implements OnInit {

  constructor(
    private teacherPartService: TeacherPartService,
    private message: NzMessageService,
    private location: Location
  ) { }

  ngOnInit() {
  }
  onSave(event) {
    let value = event.value;
    value.teacherType = "EXTERNAL";
    this.teacherPartService.addExternal(value).subscribe(
      ok => {
        this.location.back();
        return tipMessage('保存成功', 'success');
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
