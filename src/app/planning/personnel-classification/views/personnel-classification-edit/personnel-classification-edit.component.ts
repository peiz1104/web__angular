
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
    selector: 'spk-personnel-classification-edit',
    templateUrl: './personnel-classification-edit.component.html',
    styleUrls: ['./personnel-classification-edit.component.scss']
})
export class PersonnelClassificationEditComponent implements OnInit {

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
        this.route.data.subscribe((data: { personnelClassification: PersonnelClassification }) => {
            this.personnelClassification = data.personnelClassification;
        });
        this.validateForm = this.fb.group({
            name: [this.personnelClassification.name, [Validators.required]]
        });
    }

    doSubmit(event) {
        this.submitLoading = true;
        event.id = this.personnelClassification.id;
        this.personnelClassificationService.checkIsCreated(event).subscribe(
            result => {
                if (result == true) {
                    tipMessage('该名称已存在');
                    this.submitLoading = false;
                } else {
                    this.personnelClassificationService.save(event).subscribe(
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
