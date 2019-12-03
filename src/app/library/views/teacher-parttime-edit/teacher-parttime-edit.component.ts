import { TeacherPartService } from './../../service/teachernew.service';
import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-teacher-parttime-edit',
  templateUrl: './teacher-parttime-edit.component.html',
  styleUrls: ['./teacher-parttime-edit.component.scss']
})
export class TeacherParttimeEditComponent implements OnInit {
    @Input() isStarShow: boolean;

  qualificationId: number;
  teacher: any;
  constructor(
    private route: Router,
    private routeInfo: ActivatedRoute,
    private teacherPartService: TeacherPartService,
    private message: NzMessageService,
    private location: Location
  ) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params) => {
      this.qualificationId = params.id;
    })
    this.teacherPartService.get(this.qualificationId).subscribe(
      res => {
        this.teacher = res;
      },
      err => {
        return tipMessage(err);
      }
    )
    let target = window.localStorage.getItem('target')
    this.isStarShow = JSON.parse(target)
  }
  onSave(event) {
    let value = event.value;
    this.teacherPartService.update(this.qualificationId, value).subscribe(
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
