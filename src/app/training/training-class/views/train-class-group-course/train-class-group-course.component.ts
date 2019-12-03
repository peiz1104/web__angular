import { NzMessageService } from 'ng-zorro-antd';
import { TrainingClass } from './../../../entity/training-class';
import { ActivatedRoute } from '@angular/router';
import { OfferingCourseApiService } from './../../../service/offering-course-api.service';
import { Course } from './../../../../learning/course/entity/course';
import { Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OfferingGroup } from 'app/training/entity/offering_group';
import { TrainingClassGroupService } from 'app/training/service/training-class-group.service';

@Component({
  selector: 'spk-train-class-group-course',
  templateUrl: './train-class-group-course.component.html',
  styleUrls: ['./train-class-group-course.component.scss']
})
export class TrainClassGroupCourseComponent implements OnInit {

  offeringId: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {trainingClass: TrainingClass}) => {
      this.offeringId = data.trainingClass.id;

    });
  }

}
