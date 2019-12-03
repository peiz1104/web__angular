
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Message } from 'console-ui-ng';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrainingClassification } from './../../entity/training-classification';
import { TrainingClassificationService } from './../../service/training-classification.service';
import { PersonnelClassification } from './../../../personnel-classification/entity/personnel-classification';
import { tipMessage } from 'app/account/entity/message-tip';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';


@Component({
    selector: 'spk-training-classification-add',
    templateUrl: './training-classification-add.component.html',
    styleUrls: ['./training-classification-add.component.scss']
})
export class TrainingClassificationAddComponent implements OnInit {

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
        this.trainingClassification = new TrainingClassification();
        this.trainingClassificationService.getAllPersonnelClassification().subscribe(
            personnelClassifications => this.personnelClassifications = personnelClassifications
        )
        this.setDefaultFormData();
    }

    doSubmit(event) {
        this.submitLoading = true;
        let personnelClassification = new PersonnelClassification()
        personnelClassification.id = event.personnelClassificationId;
        this.trainingClassification.personnelClassification = personnelClassification
        this.trainingClassification.name = event.name;
        this.trainingClassificationService.checkIsCreated(this.trainingClassification, event.personnelClassificationId).subscribe(
            result => {
                if (result == true) {
                    tipMessage('该名称已存在');
                    this.submitLoading = false;
                } else {
                    this.trainingClassificationService.create(this.trainingClassification).subscribe(
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
            personnelClassificationId: [null, [Validators.required]]
        });
    }

    toList() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
