import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'app/learning/course/entity/course';

@Component({
  templateUrl: './course-strategy.component.html',
  styleUrls: ['./course-strategy.component.scss']
})
export class CourseStrategyComponent implements OnInit {
  courseId: number;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data: {course: Course}) => {
       this.courseId = data.course.id;
    });
  }

  ngOnInit() {
  }

}
