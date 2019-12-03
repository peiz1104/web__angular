import { ActivatedRoute } from '@angular/router';
import { TrainingClass } from './../../../entity/training-class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-training-class-enrollment',
  templateUrl: './training-class-enrollment.component.html',
  styleUrls: ['./training-class-enrollment.component.scss']
})
export class TrainingClassEnrollmentComponent implements OnInit {

  trainingClass: TrainingClass;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({trainingClass}: {trainingClass: TrainingClass}) => {
      this.trainingClass = trainingClass;
    });
  }

}
