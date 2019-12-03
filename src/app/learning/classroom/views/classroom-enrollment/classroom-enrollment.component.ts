import { Classroom } from './../../entity/classroom';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-classroom-enrollment',
  templateUrl: './classroom-enrollment.component.html',
  styleUrls: ['./classroom-enrollment.component.scss']
})
export class ClassroomEnrollmentComponent implements OnInit {

  classroom: Classroom;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( (data: {classroom: Classroom}) => {
      this.classroom = data.classroom;
    })
  }

}
