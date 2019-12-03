import { Course } from './../../../../learning/course/entity/course';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-training-class-course-detail',
  templateUrl: './training-class-course-detail.component.html',
  styleUrls: ['./training-class-course-detail.component.scss']
})
export class TrainingClassCourseDetailComponent implements OnInit {

  course: Course;
  trainingName: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { course: Course, trainingClass: any}) => {
      this.course = data.course;
      this.trainingName = data.trainingClass.name;
    })
  }

}
