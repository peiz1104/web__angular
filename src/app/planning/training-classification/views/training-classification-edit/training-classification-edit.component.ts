
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Message } from 'console-ui-ng';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrainingClassification } from './../../entity/training-classification';
import { TrainingClassificationService } from './../../service/training-classification.service';
import { PersonnelClassification } from './../../../personnel-classification/entity/personnel-classification';

import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-classification-edit',
    templateUrl: './training-classification-edit.component.html',
    styleUrls: ['./training-classification-edit.component.scss']
})
export class TrainingClassificationEditComponent implements OnInit {

    trainingClassification: TrainingClassification;
    msg: Message[] = [];
    validateForm: FormGroup;
    personnelClassifications: PersonnelClassification[];
    small;
    // 提交按钮加载标识，防止重复提交
    submitLoading: boolean;

    _submitForm = ($event, value) => {
        $event.preventDefault();
        if (this.validateForm.valid) {
            let event = this.validateForm.value;
            this.doSubmit(event);
        } else {
            tipMessage('创建培训分类表单校验失败');
        }
    };
    constructor(private trainingClassificationService: TrainingClassificationService,
        private router: Router,
        private route: ActivatedRoute, private fb: FormBuilder) { }

    ngOnInit() {
        this.submitLoading = false;
        this.route.data.subscribe((data: { trainingClassification: TrainingClassification }) => {
            this.trainingClassification = data.trainingClassification;
        });
        this.trainingClassificationService.getAllPersonnelClassification().subscribe(
            personnelClassifications => this.personnelClassifications = personnelClassifications
        )
        this.validateForm = this.fb.group({
            name: [this.trainingClassification.name, [Validators.required]],
            personnelClassificationId: [this.trainingClassification.personnelClassification.id, [Validators.required]]
        });
    }

    doSubmit(event) {
        this.submitLoading = true;
        let personnelClassification = new PersonnelClassification()
        personnelClassification.id = event.personnelClassificationId;
        this.trainingClassification.personnelClassification = personnelClassification
        this.trainingClassification.name = event.name;
        // tslint:disable-next-line:max-line-length
        this.trainingClassificationService.checkIsCreated(this.trainingClassification, event.personnelClassificationId).subscribe(
            result => {
                if (result == true) {
                    tipMessage('改名称已存在');
                    this.submitLoading = false;
                } else {
                    this.trainingClassificationService.save(this.trainingClassification).subscribe(
                        c => {
                            tipMessage('保存成功');
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
