import { Course } from './../../../../learning/course/entity/course';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-subject-activity-course-detail',
  templateUrl: './subject-activity-course-detail.component.html',
  styleUrls: ['./subject-activity-course-detail.component.scss']
})
export class SubjectActivityCourseDetailComponent implements OnInit {

  course: Course;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {course: Course}) => {
      this.course = data.course;
    })
  }

}
