import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { TrainingSchoolPlan } from './../../entity/trainingschoolplan';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-trainingschoolplan-view',
    templateUrl: './trainingschoolplan-view.component.html',
    styleUrls: ['./trainingschoolplan-view.component.scss']
})
export class TrainingSchoolPlanViewComponent implements OnInit {

    trainingSchoolPlan: TrainingSchoolPlan;
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
        this.activatedRoute.data.subscribe((data: { trainingSchoolPlan: TrainingSchoolPlan }) => {
            this.trainingSchoolPlan = data.trainingSchoolPlan;
        });
        let id = this.activatedRoute.snapshot.params.id;
        this.setDefaultFormData();
    }

    setDefaultFormData() {// 设置表单数据初始化
        this.InternalTrainingInData = {
            projectNumber: this.trainingSchoolPlan.projectNumber,
            name: this.trainingSchoolPlan.name,
            trainingDate: this.trainingSchoolPlan.trainingDate,
            trainingPlace: this.trainingSchoolPlan.trainingPlace,
            trainingDays: this.trainingSchoolPlan.trainingDays,
            trainingNumber: this.trainingSchoolPlan.trainingNumber,
            correspondingNumber: this.trainingSchoolPlan.correspondingNumber,
            trainingObject: this.trainingSchoolPlan.trainingObject,
            trainingCategory: this.trainingSchoolPlan.trainingCategory,
            personnelClassification: this.trainingSchoolPlan.personnelClassification,
            trainingClassification: this.trainingSchoolPlan.trainingClassification,
            trainingLevel: this.trainingSchoolPlan.trainingLevel,
            trainingCostPer: this.trainingSchoolPlan.trainingCostPer,
            lectuerTransportationFee: this.trainingSchoolPlan.lectuerTransportationFee,
            lectuerBoard: this.trainingSchoolPlan.lectuerBoard,
            outsideLectuerPretaxFee: this.trainingSchoolPlan.outsideLectuerPretaxFee,
            commission: this.trainingSchoolPlan.commission,
            wages: this.trainingSchoolPlan.wages,
            otherCosts: this.trainingSchoolPlan.otherCosts,
            trafficFee: this.trainingSchoolPlan.trafficFee,
            trainingBudget: this.trainingSchoolPlan.trainingBudget,
            expenseLevel: this.trainingSchoolPlan.expenseLevel,
            expenseLower: this.trainingSchoolPlan.expenseLower,
            trainingContent: this.trainingSchoolPlan.trainingContent,
            trainingDistribution: this.trainingSchoolPlan.trainingDistribution,
            remark: this.trainingSchoolPlan.remark
        };
    }

}
