
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Message } from 'console-ui-ng';
import { AnnualPlan } from './../../entity/annualplan';
import { AnnualplanService } from './../../service/annualplan.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserGroup } from './../../../../system/entity/user-group';

import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-annualplan-add',
    templateUrl: './annualplan-add.component.html',
    styleUrls: ['./annualplan-add.component.scss']
})
export class AnnualplanAddComponent implements OnInit {

    annualPlan: AnnualPlan;
    msg: Message[] = [];
    validateForm: FormGroup;
    orgs: UserGroup[];
    small;
    submitLoading: boolean;
    _submitForm = ($event, value) => {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        if (this.validateForm.valid) {
            if (this.validateForm.value.org == null) {
                tipMessage('请选择组织！', 'info');
                return;
            }
            let event = this.validateForm.value;
            event.name = this.validateForm.value.years + '年' + this.validateForm.value.org.name + this.annualPlan.name;
            this.doSubmit(event);
        } else {
            tipMessage('创建年度计划表单校验失败', '', 4000);
        }
    };
    constructor(private annualplanService: AnnualplanService,
        private router: Router,
        private route: ActivatedRoute, private fb: FormBuilder) { }

    ngOnInit() {
        this.submitLoading = false;
        this.annualplanService.findUserGroups().subscribe(
            result => this.orgs = result
        );
        this.annualPlan = new AnnualPlan();
        this.annualPlan.name = "培训计划";
        this.validateForm = this.fb.group({
            years: [this.annualPlan.years, [Validators.required]], // 年限
            trainingBudget: [0, [Validators.required]], // 培训预算
            researchBudget: [0, [Validators.required]], // 研发预算
            org: [null] // 所属组织
        });
    }

    doSubmit(event) {
        this.submitLoading = true;
        this.annualplanService.checkPlanCreatedThisYear(event.years, this.validateForm.get('org').value.id).subscribe(
            craetedFlag => {
                if (craetedFlag == true) { // 当年已创建
                    tipMessage(`${event.years}年已创建年度计划！`, 'info');
                    this.submitLoading = false;
                    return;
                } else {
                    this.annualplanService.create(event).subscribe(
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
        );
    }

    onCancel(e) {

        this.toList();
    }

    toList() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
