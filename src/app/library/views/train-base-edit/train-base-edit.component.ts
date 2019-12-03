import { Component, OnInit } from '@angular/core';
import { TrainBaseService } from '../../service/train-base.service';
import { TrainBase } from '../../entity/train-base';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { FormDataUtil } from '../../../core';

@Component({
  templateUrl: './train-base-edit.component.html'
})
export class TrainBaseEditComponent implements OnInit {
   trainBase: TrainBase;
   err;

  constructor(
    private trainBaseService: TrainBaseService,
    private router: Router,
    private route: ActivatedRoute,
    private layer: CuiLayer
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let id = +params['id'];
        this.loadData(id);
      }
    );
  }

  loadData(id) {
    this.trainBaseService.get(id).subscribe(
      trainBase => this.trainBase = trainBase
    );
  }

  save(formTrainBase: TrainBase) {
    formTrainBase.id = this.trainBase.id;
    this.trainBaseService.update(formTrainBase).subscribe(
      trainBase => {
        this.layer.msg('保存成功');
        this.router.navigate(['../../'], {relativeTo: this.route});
      },
    );
  }

  onSubmit(user) {
    console.log('>>>', user);
    this.save(user);
  }

}
