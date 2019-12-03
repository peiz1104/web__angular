import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { TrainingPlan } from './../../entity/trainingplan'

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-trainingplan-view',
  templateUrl: './trainingplan-view.component.html',
  styleUrls: ['./trainingplan-view.component.scss']
})
export class TrainingPlanViewComponent implements OnInit {
  trainingPlan: TrainingPlan;

  InternalTrainingInData: any = {};
  autosize = {
    minRows: 7,
    maxRows: 7
  };
  layoutData = {
    layout1: '8',
    layout2: '12',
    layout3: '4',
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { trainingPlan: TrainingPlan }) => {
      this.trainingPlan = data.trainingPlan;
    });
    let id = this.activatedRoute.snapshot.params.id;
    this.setDefaultFormData();
  }

  setDefaultFormData() {// 设置表单数据初始化
    this.InternalTrainingInData = {
      projectNumber: this.trainingPlan.projectNumber,
      name: this.trainingPlan.name,
      trainingDate: this.trainingPlan.trainingDate,
      trainingPlace: this.trainingPlan.trainingPlace,
      trainingDays: this.trainingPlan.trainingDays,
      trainingNumber: this.trainingPlan.trainingNumber,
      correspondingNumber: this.trainingPlan.correspondingNumber,
      trainingObject: this.trainingPlan.trainingObject,
      personnelClassification: this.trainingPlan.personnelClassification,
      trainingClassification: this.trainingPlan.trainingClassification,
      trainingLevel: this.trainingPlan.trainingLevel,
      trainingCostPer: this.trainingPlan.trainingCostPer,
      otherCosts: this.trainingPlan.otherCosts,
      trafficFee: this.trainingPlan.trafficFee,
      trainingBudget: this.trainingPlan.trainingBudget,
      expenseLevel: this.trainingPlan.expenseLevel,
      expenseLower: this.trainingPlan.expenseLower,
      trainingContent: this.trainingPlan.trainingContent,
      remark: this.trainingPlan.remark,
      isDesignatingCourse: this.trainingPlan.isDesignatingCourse + '',
      isCompulsory: this.trainingPlan.isCompulsory + '',
      isQuote: this.trainingPlan.isQuote + ''
    };
  }

}
