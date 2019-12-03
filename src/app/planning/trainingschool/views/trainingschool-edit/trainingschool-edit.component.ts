
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Message } from 'console-ui-ng';
import { TrainingSchool } from './../../entity/trainingschool';
import { TrainingSchoolService } from './../../service/trainingschool.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
    selector: 'spk-trainingschool-edit',
    templateUrl: './trainingschool-edit.component.html',
    styleUrls: ['./trainingschool-edit.component.scss']
})
export class TrainingSchoolEditComponent implements OnInit {

    trainingSchool: TrainingSchool;
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
            tipMessage('创建研修院表单校验失败');
        }
    };
    constructor(
        private trainingSchoolService: TrainingSchoolService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.submitLoading = false;
        this.route.data.subscribe((data: { trainingSchool: TrainingSchool }) => {
            this.trainingSchool = data.trainingSchool;
        });
        this.validateForm = this.fb.group({
            name: [this.trainingSchool.name, [Validators.required]],
            userGroup: [this.trainingSchool.userGroup.name, [Validators.required]]
        });
    }

    doSubmit(event) {
        this.submitLoading = true;
        event.id = this.trainingSchool.id;
        this.trainingSchoolService.checkIsCreated(event).subscribe(
            result => {
                if (result == true) {
                    tipMessage('研修院名称已存在');
                    this.submitLoading = false;
                } else {
                    this.trainingSchoolService.save(event).subscribe(
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
