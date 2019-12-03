import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Message } from 'console-ui-ng';
import { TrainingPlanService } from './../../service/trainingplan.service';
import { PersonnelClassification } from './../../../../personnel-classification/entity/personnel-classification';
import { PersonnelClassificationService } from './../../../../personnel-classification/service/personnel-classification.service';
import { TrainingClassification } from './../../../../training-classification/entity/training-classification';
import { TrainingClassificationService } from './../../../../training-classification/service/training-classification.service';
import { TrainingLevel } from './../../../../training-level/entity/training-level';
import { TrainingLevelService } from './../../../../training-level/service/training-level.service';

declare let $: any;
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-trainingplan-add',
    templateUrl: './trainingplan-add.component.html',
    styleUrls: ['./trainingplan-add.component.scss']
})

export class TrainingPlanAddComponent implements OnInit {

    init_options = [];
    annualPlanId: number; // 年度计划id
    msg: Message[] = [];
    validateForm: FormGroup;
    // 人员分类
    personnelClassifications: PersonnelClassification[];
    // 培训分类
    trainingClassifications: TrainingClassification[];
    // 培训级别
    trainingLevels: TrainingLevel[];

    // 提交按钮加载标识，防止重复提交
    submitLoading: boolean;

    //  document.getElementById('cui-layout-workbench').scrollTop=window.outerHeight
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
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private trainingPlanService: TrainingPlanService,
        private personnelClassificationService: PersonnelClassificationService,
        private trainingClassificationService: TrainingClassificationService,
        private trainingLevelService: TrainingLevelService
    ) {
    }
    ngOnInit() {
        this.submitLoading = false;
        this.personnelClassificationService.getAll().subscribe(
            personnelClassifications => this.personnelClassifications = personnelClassifications
        )
        this.setDefaultFormData();
        this.annualPlanId = this.activatedRoute.snapshot.params.id;
        this.personnelClassificationService.getAllTrainingSettingAttributes().subscribe(
            settingAttributes => {
                this.init_options = settingAttributes;
            }
        )
    }

    _submitForm = ($event) => { // 表单提交
        $event.preventDefault();
        let validateForm = this.validateForm;
        if (validateForm.valid) {
            this.doSubmit(validateForm.value);
        } else {
            tipMessage('表单校验失败');
        }
    };
    _resetForm(index) { // 重置表单
        $.fn.fullpage.destroy('all');
        if (this.validateForm && index == 0) {
            this.validateForm.reset();
            // tslint:disable-next-line:forin
            for (const key in this.validateForm.controls) {
                this.validateForm.controls[key].markAsPristine();
            }
        }
        this.setDefaultFormData();
    }


    setDefaultFormData() { //  设置表单数据初始化
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            trainingDate: ['1月'],
            trainingPlace: [null],
            trainingDays: [0],
            trainingNumber: [0],
            correspondingNumber: [0],
            trainingObject: [null],
            personnelClassification: [null],
            trainingClassification: [null],
            trainingLevel: [null],
            trainingCostPer: [0],
            otherCosts: [0],
            trafficFee: [0],
            trainingBudget: [0],
            expenseLevel: [0],
            expenseLower: [0],
            trainingContent: [null],
            remark: [''],
            isDesignatingCourse: ['false'],
            isQuote: ['false'],
            settingAttibutes: [[]]
        });
    }

    doSubmit(event) {
        this.submitLoading = true;
        event.annualId = this.annualPlanId;
        this.trainingPlanService.create(event).subscribe(
            c => {
                tipMessage('保存成功！', 'success');
                this.toList();
            },
            e => {
                this.msg = e;
                this.submitLoading = false;
            }
        );
    }

    toList() {
        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
    }

    // 计算境内内部培训计划经费
    evaluateTrainingBudget() {
        // 培训人数
        let trainingNumber = this.validateForm.value.trainingNumber;
        // 本级人数
        let correspondingNumber = this.validateForm.value.correspondingNumber;
        // 培训天数
        let trainingDays = this.validateForm.value.trainingDays;
        // 培训经费标准
        let trainingCostPer = this.validateForm.value.trainingCostPer;
        // 本级交通费
        let trafficFee = this.validateForm.value.trafficFee;
        // 其它费用
        let otherCosts = this.validateForm.value.otherCosts;
        // 计算获得培训总预算
        let trainingBudget = trainingNumber * trainingDays * trainingCostPer +
            trafficFee + otherCosts;
        this.validateForm.get('trainingBudget').setValue(trainingBudget.toFixed(2));
    }


    setAttibutes(value) {
        // console.log(value, 111)
        // let personnelClassification = {};
        // personnelClassification['id'] = value[0];
        // let trainingClassification = {};
        // trainingClassification['id'] = value[1];
        // let trainingLevel = {};
        // trainingLevel['id'] = value[2];
        // console.log(personnelClassification, trainingClassification, trainingLevel)
        // this.validateForm.get('personnelClassification').setValue(personnelClassification);
        // this.validateForm.get('trainingClassification').setValue(trainingClassification);
        // this.validateForm.get('trainingLevel').setValue(trainingLevel);
    }

}
