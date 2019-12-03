
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Message } from 'console-ui-ng';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { TrainingLevel } from './../../entity/training-level';
import { TrainingLevelService } from './../../service/training-level.service';
import { TrainingClassification } from './../../../training-classification/entity/training-classification';

import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-training-level-add',
    templateUrl: './training-level-add.component.html',
    styleUrls: ['./training-level-add.component.scss']
})
export class TrainingLevelAddComponent implements OnInit, DoCheck {

    trainingLevel: TrainingLevel;
    msg: Message[] = [];
    validateForm: FormGroup;
    trainingClassifications: TrainingClassification[];
    small;
    // 提交按钮加载标识，防止重复提交
    submitLoading: boolean;
    // switchValue: boolean = true;

    _submitForm = ($event, value) => {
        $event.preventDefault();
        // if (this.switchValue) {
        //     this.validateForm.removeControl("shouldAbsence");
        //     this.validateForm.removeControl("maxAbsence");
        // }
        if (this.validateForm.valid) {
            let event = this.validateForm.value;
            // console.log(event.maxAbsence, event.shouldAbsence)
            if (Number(event.maxAbsence) > Number(event.shouldAbsence)) {
                return tipMessage('最大缺勤次数不能超过应考勤次数！');
            }
            this.doSubmit(event);
        } else {
            tipMessage('创建培训级别表单校验失败');
        }
    };
    constructor(private trainingLevelService: TrainingLevelService,
        private router: Router,
        private route: ActivatedRoute, private fb: FormBuilder) { }

    ngOnInit() {
        this.submitLoading = false;
        this.trainingLevel = new TrainingLevel();
        this.trainingLevelService.getAllTrainingClassification().subscribe(
            trainingClassifications => this.trainingClassifications = trainingClassifications
        )
        this.setDefaultFormData()
    }
    ngDoCheck() {
        // this.switchValue ? this.setDefaultFormData() : this.allowDefaultFormData();
    }
    doSubmit(event) {
        this.submitLoading = true;
        let trainingClassification = new TrainingClassification()
        trainingClassification.id = event.trainingClassificationId;
        this.trainingLevel.trainingClassification = trainingClassification
        this.trainingLevel.name = event.name;
        this.trainingLevel.isAdjust = event.isAdjust;
        // if (!this.switchValue) {
        this.trainingLevel.maxAbsence = event.maxAbsence;
        this.trainingLevel.shouldAbsence = event.shouldAbsence;
        // }
        this.trainingLevelService.checkIsCreated(this.trainingLevel, event.trainingClassificationId).subscribe(
            result => {
                if (result == true) {
                    tipMessage('该名称已存在');
                    this.submitLoading = false;
                } else {
                    this.trainingLevelService.create(this.trainingLevel).subscribe(
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
            }
        )
    }

    onCancel(e) {
        this.toList();
    }

    setDefaultFormData() { //  设置表单数据初始化
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            trainingClassificationId: [null, [Validators.required]],
            // isAdjust: [this.switchValue],
            isAdjust: [true],
            shouldAbsence: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            maxAbsence: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
        });
    }
    // 如果允许调整为true时显示formdata
    toList() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
