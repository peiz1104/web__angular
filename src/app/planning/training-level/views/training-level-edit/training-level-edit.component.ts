
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Message } from 'console-ui-ng';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    selector: 'spk-training-level-edit',
    templateUrl: './training-level-edit.component.html',
    styleUrls: ['./training-level-edit.component.scss']
})
export class TrainingLevelEditComponent implements OnInit {

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
        // console.log(value, 4456)
        if (this.validateForm.valid) {
            let event = this.validateForm.value;
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
        this.route.data.subscribe((data: { trainingLevel: TrainingLevel }) => {
            this.trainingLevel = data.trainingLevel;
        });
        this.trainingLevelService.getAllTrainingClassification().subscribe(
            trainingClassifications => this.trainingClassifications = trainingClassifications
        )
        // this.switchValue = this.trainingLevel.isAdjust == undefined ? true : this.trainingLevel.isAdjust;
        this.validateForm = this.fb.group({
            name: [this.trainingLevel.name, [Validators.required]],
            trainingClassificationId: [this.trainingLevel.trainingClassification.id, [Validators.required]],
            isAdjust: [this.trainingLevel.isAdjust == undefined ? true : this.trainingLevel.isAdjust],
            // tslint:disable-next-line:max-line-length
            shouldAbsence: [this.trainingLevel.shouldAbsence ? this.trainingLevel.shouldAbsence : '', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            maxAbsence: [this.trainingLevel.maxAbsence ? this.trainingLevel.maxAbsence : '', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
        });
        console.log(this.validateForm)
        // this.validateForm.get("shouldAbsence").setValue(0);removeControl
    }

    doSubmit(event) {
        this.submitLoading = true;
        let trainingClassification = new TrainingClassification()
        trainingClassification.id = event.trainingClassificationId;
        this.trainingLevel.trainingClassification = trainingClassification
        this.trainingLevel.name = event.name;
        this.trainingLevel.isAdjust = event.isAdjust;
        // if (!this.switchValue) {
        this.trainingLevel.shouldAbsence = event.shouldAbsence;
        this.trainingLevel.maxAbsence = event.maxAbsence;
        // }
        this.trainingLevelService.checkIsCreated(this.trainingLevel, event.trainingClassificationId).subscribe(
            result => {
                if (result == true) {
                    tipMessage('该名称已存在')
                    this.submitLoading = false;
                } else {
                    this.trainingLevelService.save(this.trainingLevel).subscribe(
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

    toList() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
