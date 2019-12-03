import { ClassroomService } from './../../service/classroom.service';
import { OfferingService } from './../../../offering/service/offering.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Classroom } from './../../entity/classroom';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-classroom-notice-box',
  templateUrl: './classroom-notice-box.component.html',
  styleUrls: ['./classroom-notice-box.component.scss']
})
export class ClassroomNoticeBoxComponent implements OnInit {

  classroom: Classroom;

  constructor(private router: Router, private route: ActivatedRoute,
  private classroomService: ClassroomService) { }


  ngOnInit() {
    this.route.data.subscribe((data: { classroom: Classroom }) => {
      this.classroom = data.classroom;
    });
  }

  afterBoxInited(event) {
    this.classroom.noticeBox = event;
    this.classroomService.save(this.classroom).subscribe(classroom => {
      console.log("组件初始成功");
    });
  }
}
