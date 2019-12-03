import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'console-ui-ng';
import { TrainingPlan } from './../../entity/trainingplan';
import { TrainingPlanService } from './../../service/trainingplan.service';
import { PersonnelClassification } from './../../../../personnel-classification/entity/personnel-classification';
import { PersonnelClassificationService } from './../../../../personnel-classification/service/personnel-classification.service';
import { TrainingClassification } from './../../../../training-classification/entity/training-classification';
import { TrainingClassificationService } from './../../../../training-classification/service/training-classification.service';
import { TrainingLevel } from './../../../../training-level/entity/training-level';
import { TrainingLevelService } from './../../../../training-level/service/training-level.service';
import { tipMessage } from 'app/account/entity/message-tip';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-trainingplan-edit',
    templateUrl: './trainingplan-edit.component.html',
    styleUrls: ['./trainingplan-edit.component.scss']
})
export class TrainingPlanEditComponent implements OnInit {
    init_options = [];
    settingAttibutesvalue: any = [];
    msg: Message[] = [];
    trainingPlan: TrainingPlan;
    validateForm: FormGroup;
    // 人员分类
    personnelClassifications: PersonnelClassification[];
    // 培训分类
    trainingClassifications: TrainingClassification[];
    // 培训级别
    trainingLevels: TrainingLevel[];

    // 提交按钮加载标识，防止重复提交
    submitLoading: boolean;

    autosize = {
        minRows: 7,
        maxRows: 7
    };
    layoutData = {
        layout1: '8',
        layout2: '12',
        layout3: '4',
    }

    showView: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private trainingPlanService: TrainingPlanService,
        private personnelClassificationService: PersonnelClassificationService,
        private trainingClassificationService: TrainingClassificationService,
        private trainingLevelService: TrainingLevelService
    ) { }

    ngOnInit() {
        this.submitLoading = false;
        this.setDefaultFormData();
        this.activatedRoute.data.subscribe((data: { trainingPlan: TrainingPlan }) => {
            console.log(data, 6666)
            this.trainingPlan = data.trainingPlan;
            this.personnelClassificationService.getAllTrainingSettingAttributes().subscribe(
                settingAttributes => {
                    this.init_options = settingAttributes;
                    if (this.trainingPlan.personnelClassification) {
                        // tslint:disable-next-line:max-line-length
                        // this.settingAttibutesvalue = [this.trainingPlan.personnelClassification.name, this.trainingPlan.trainingClassification.name, this.trainingPlan.trainingLevel.name];
                        this.settingAttibutesvalue = [{
                            value: this.trainingPlan.personnelClassification,
                            label: this.trainingPlan.personnelClassification.name
                        }, {
                            value: this.trainingPlan.trainingClassification,
                            label: this.trainingPlan.trainingClassification.name
                        }, {
                            value: this.trainingPlan.trainingLevel,
                            label: this.trainingPlan.trainingLevel.name
                        }];
                    }
                    this.setDefaultFormData();
                }
            )
            let id = this.activatedRoute.snapshot.params.id;

        });
    }
    _submitForm = ($event, type, value) => { // 表单提交
        $event.preventDefault();
        let validateForm = this.validateForm;
        let correspondingNumber = this.validateForm.controls['correspondingNumber'];
        // tslint:disable-next-line:forin
        if (validateForm.valid) {
            // console.log(validateForm.value.personnelClassificationId, 11)
            if (validateForm.value.trainingClassificationId != null) {
                let personnelClassification = new PersonnelClassification();
                personnelClassification.id = validateForm.value.personnelClassificationId;
                validateForm.value.personnelClassification = personnelClassification;
            }
            if (validateForm.value.trainingClassificationId != null) {
                let trainingClassification = new TrainingClassification();
                trainingClassification.id = validateForm.value.trainingClassificationId;
                validateForm.value.trainingClassification = trainingClassification;
            }
            if (validateForm.value.trainingLevelId != null) {
                let trainingLevel = new TrainingLevel();
                trainingLevel.id = validateForm.value.trainingLevelId;
                validateForm.value.trainingLevel = trainingLevel;
            }
            this.doSubmit(validateForm.value, 'CT');
        } else {
            tipMessage('表单校验失败');
        }
    };
    _resetForm() { // 重置表单
        if (this.validateForm) {
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
            projectNumber: [this.trainingPlan ? this.trainingPlan.projectNumber : ''],
            name: [this.trainingPlan ? this.trainingPlan.name : '', [Validators.required]],
            trainingDate: [this.trainingPlan ? this.trainingPlan.trainingDate : null],
            trainingPlace: [this.trainingPlan ? this.trainingPlan.trainingPlace : ''],
            trainingDays: [this.trainingPlan ? this.trainingPlan.trainingDays : ''],
            trainingNumber: [this.trainingPlan ? this.trainingPlan.trainingNumber : ''],
            correspondingNumber: [this.trainingPlan ? this.trainingPlan.correspondingNumber : ''],
            trainingObject: [this.trainingPlan ? this.trainingPlan.trainingObject : ''],
            // tslint:disable-next-line:max-line-length
            personnelClassificationId: [this.trainingPlan ? (this.trainingPlan.personnelClassification == null ? null : this.trainingPlan.personnelClassification.id) : null],
            trainingClassificationId: [this.trainingPlan ? (this.trainingPlan.trainingClassification == null ? '' : this.trainingPlan.trainingClassification.id) : null],
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:max-line-length
            trainingLevelId: [this.trainingPlan ? (this.trainingPlan.trainingLevel == null ? '' : this.trainingPlan.trainingLevel.id) : null],
            trainingCostPer: [this.trainingPlan ? this.trainingPlan.trainingCostPer : ''],
            otherCosts: [this.trainingPlan ? this.trainingPlan.otherCosts : ''],
            trafficFee: [this.trainingPlan ? this.trainingPlan.trafficFee : ''],
            trainingBudget: [this.trainingPlan ? this.trainingPlan.trainingBudget : ''],
            expenseLevel: [this.trainingPlan ? this.trainingPlan.expenseLevel : ''],
            expenseLower: [this.trainingPlan ? this.trainingPlan.expenseLower : ''],
            trainingContent: [this.trainingPlan ? this.trainingPlan.trainingContent : ''],
            remark: [this.trainingPlan ? this.trainingPlan.remark : ''],
            isDesignatingCourse: [this.trainingPlan ? this.trainingPlan.isDesignatingCourse + '' : ''],
            isQuote: [this.trainingPlan ? this.trainingPlan.isQuote + '' : ''],
            settingAttibutes: [this.settingAttibutesvalue]
        });
    }


    doSubmit(event, type) {
        this.submitLoading = true;
        event.id = this.trainingPlan.id;
        this.trainingPlanService.save(event).subscribe(
            c => {
                tipMessage('保存成功', 'success');
                this.toList();
            },
            e => {
                this.msg = e;
                this.submitLoading = false;
            }
        );
    }

    toList() {
        this.router.navigate(['../../../list'], { relativeTo: this.activatedRoute });
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
        if (value != null && value.length > 0) {
            this.validateForm.get("personnelClassificationId").setValue(value[0]);
            this.validateForm.get("trainingClassificationId").setValue(value[1]);
            this.validateForm.get("trainingLevelId").setValue(value[2]);
        } else if (value.length == 0) {
            // this.settingAttibutesvalue = [];
            this.validateForm.get("personnelClassificationId").setValue(value[0]);
            this.validateForm.get("trainingClassificationId").setValue(value[1]);
            this.validateForm.get("trainingLevelId").setValue(value[2]);
        }
    }

}
