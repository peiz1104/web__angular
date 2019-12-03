import { Router, ActivatedRoute } from '@angular/router';
import { Classroom } from './../../entity/classroom';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-classroom-condition',
  templateUrl: './classroom-condition.component.html',
  styleUrls: ['./classroom-condition.component.scss']
})
export class ClassroomConditionComponent implements OnInit {

  classroom: Classroom;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {classroom: Classroom}) => {
      this.classroom = data.classroom;
    });
  }

}
