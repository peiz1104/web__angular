import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanActivateChild } from '@angular/router';
import { ExaminationService } from '../../service/examination.service';
import { Examination } from '../../entity/examination';
@Component({
    selector: 'spk-exam-edit',
    templateUrl: './exam-edit.component.html',
    styleUrls: ['./exam-edit.component.scss']
})
export class ExamEditComponent implements OnInit {
    examDetail: Examination;
    type: string;
    link: any;
    constructor(private route: ActivatedRoute, private examinationService: ExaminationService) { }

  ngOnInit() {
    this.examinationService.check_pattern().subscribe(
      data => {
        this.type = data.examPattern;
        console.log(this.type);
      }
    )
    this.route.data.subscribe(
      (data: { examination: any }) => {
        this.examDetail = data.examination;
        console.log('data:', data);
        // if (data.examination) {
        //   console.log(data.examination);
        //   // this.createOrEditor = false ;
        //   // this.examDetail = data.examination;
        // } else {
        //   // this.createOrEditor = true;
        //   console.log(456);
        // }
      }
    )
    this.route.queryParams.subscribe(
      data => {
        if (data.userGroupId && data.userGroupName) {
          this.link = {
            userGroupId: data.userGroupId,
            userGroupName: data.userGroupName
          }
        }
      }
    )
  }

}
