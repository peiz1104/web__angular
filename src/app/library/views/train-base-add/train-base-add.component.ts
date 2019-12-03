import { Component, OnInit } from '@angular/core';
import { TrainBaseService } from '../../service/train-base.service';
import { TrainBase } from '../../entity/train-base';
import { Router, ActivatedRoute } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';

@Component({
  templateUrl: './train-base-add.component.html'
})
export class TrainBaseAddComponent implements OnInit {
  err;

  constructor(private trainBaseService: TrainBaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: CuiLayer
  ) { }

  ngOnInit() {
  }

  save(formTrainBase: TrainBase) {
    this.trainBaseService.add(formTrainBase).subscribe(
      trainBase => {
        this.dialog.msg('保存成功');
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      err => this.err = err
    );
  }

  onSubmit(trainBase) {
    this.save(trainBase);
  }

}
