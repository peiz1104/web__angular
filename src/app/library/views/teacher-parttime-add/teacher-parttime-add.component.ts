import { TeacherPartService } from './../../service/teachernew.service';
import { Component, OnInit ,Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-teacher-parttime-add',
  templateUrl: './teacher-parttime-add.component.html',
  styleUrls: ['./teacher-parttime-add.component.scss']
})
export class TeacherParttimeAddComponent implements OnInit {
    @Input() isStarShow: boolean;

  constructor(
    private teacherPartService: TeacherPartService,
    private message: NzMessageService,
    private location: Location
  ) { }

  ngOnInit() {
    let target = window.localStorage.getItem('target')
    this.isStarShow = JSON.parse(target)

  }
  onSave(event) {
    let value = event.value;
    value.teacherType = "PARTTIME";
    this.teacherPartService.add(value).subscribe(
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
