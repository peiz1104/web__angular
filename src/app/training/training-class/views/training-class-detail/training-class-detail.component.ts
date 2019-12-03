import { TrainingClass } from './../../../entity/training-class';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TrainingClassXType } from '../../service/training-class-xtype.service';

@Component({
  selector: 'spk-training-class-detail',
  templateUrl: './training-class-detail.component.html',
  styleUrls: ['./training-class-detail.component.scss']
})
export class TrainingClassDetailComponent implements OnInit {

  trainingClass: TrainingClass;

  menuIsCollapsed;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public xtype: TrainingClassXType
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {trainingClass: TrainingClass}) => {
      this.trainingClass = data.trainingClass;
    });
  }

}
