import { SubjectActivityApiService } from './../../../service/subject-activity-api.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SubjectActivity } from 'app/subject/entity/subject-activity';

@Component({
  selector: 'spk-subject-activity-detail',
  templateUrl: './subject-activity-detail.component.html',
  styleUrls: ['./subject-activity-detail.component.scss']
})
export class SubjectActivityDetailComponent implements OnInit {

  menuIsCollapsed = false;
  subjectInfo: SubjectActivity;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectActivityApiService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let subjectId = +params['subjectId'];
        this.subjectService.getOne(subjectId).subscribe(
          subjectInfo => {
            this.subjectInfo = subjectInfo;
          }
        );
      }
    );
  }
  changeMenuwidth = (value) => {
    this.menuIsCollapsed = !this.changeMenuwidth;
  }
}
