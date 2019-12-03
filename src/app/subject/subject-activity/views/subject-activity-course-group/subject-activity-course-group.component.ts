import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'spk-subject-activity-course-group',
  templateUrl: './subject-activity-course-group.component.html',
  styleUrls: ['./subject-activity-course-group.component.scss']
})
export class SubjectActivityCourseGroupComponent implements OnInit {

  offeringId: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (obj: { subjectActivity: any }) => {
        this.offeringId = obj.subjectActivity.id;
      }
    );
  }

}
