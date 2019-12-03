import { Component, OnInit } from '@angular/core';
import { TrainingClass } from '../../../../training/entity/training-class';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spk-tbc-detail',
  templateUrl: './tbc-detail.component.html',
  styleUrls: ['./tbc-detail.component.scss']
})
export class TbcDetailComponent implements OnInit {

  trainingClass: TrainingClass;

  menuIsCollapsed;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {trainingClass: TrainingClass}) => {
      this.trainingClass = data.trainingClass;
    });
  }

}
