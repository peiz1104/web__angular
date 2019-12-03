import { TrainingClass } from './../../../entity/training-class';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spk-training-class-score-strategy',
  templateUrl: './training-class-score-strategy.component.html',
  styleUrls: ['./training-class-score-strategy.component.scss']
})
export class TrainingClassScoreStrategyComponent implements OnInit {

  classId: number;
  trainingName: string;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data: {trainingClass: TrainingClass}) => {
       this.classId = data.trainingClass.id;
      this.trainingName = data.trainingClass.name;
    });
  }

  ngOnInit() {
  }
}
