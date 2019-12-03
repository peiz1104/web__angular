
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Message } from 'console-ui-ng';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonnelClassification } from './../../entity/personnel-classification';
import { PersonnelClassificationService } from './../../service/personnel-classification.service';
import { tipMessage } from 'app/account/entity/message-tip';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
    selector: 'spk-personnel-classification-add',
    templateUrl: './personnel-classification-add.component.html',
    styleUrls: ['./personnel-classification-add.component.scss']
})
export class PersonnelClassificationAddComponent implements OnInit {

    personnelClassification: PersonnelClassification;
    msg: Message[] = [];
    validateForm: FormGroup;
    small;
    // 提交按钮加载标识，防止重复提交
    submitLoading: boolean;

    _submitForm = ($event, value) => {
        $event.preventDefault();
        if (this.validateForm.valid) {
            let event = this.validateForm.value;
            this.doSubmit(event);
        } else {
            tipMessage('创建人员分类表单校验失败');
        }
    };
    constructor(private personnelClassificationService: PersonnelClassificationService,
        private router: Router,
        private route: ActivatedRoute, private fb: FormBuilder) { }

    ngOnInit() {
        this.submitLoading = false;
        this.personnelClassification = new PersonnelClassification();
        this.setDefaultFormData();
    }

    doSubmit(event) {
        this.submitLoading = true;
        this.personnelClassificationService.checkIsCreated(event).subscribe(
            result => {
                if (result == true) {
                    tipMessage('该名称已存在');
                    this.submitLoading = false;
                } else {
                    this.personnelClassificationService.create(event).subscribe(
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
        });
    }

    toList() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
