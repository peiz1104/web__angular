import { CourseService } from './../../../course/service/course.service';
import { ActivatedRoute } from '@angular/router';
import { Classroom } from './../../entity/classroom';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-classroom-course',
  templateUrl: './classroom-course.component.html',
  styleUrls: ['./classroom-course.component.scss']
})
export class ClassroomCourseComponent implements OnInit {

  classroom: Classroom;

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {classroom: Classroom}) => {
      this.classroom = data.classroom;
    })
  }

  loadCourse() {
    // this.courseService.getOne(this.classroom.offeringCourse.course.id)
  }

}
