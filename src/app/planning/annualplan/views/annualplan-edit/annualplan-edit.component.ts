
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Message } from 'console-ui-ng';
import { AnnualPlan } from './../../entity/annualplan';
import { AnnualplanService } from './../../service/annualplan.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-annualplan-edit',
  templateUrl: './annualplan-edit.component.html',
  styleUrls: ['./annualplan-edit.component.scss']
})
export class AnnualplanEditComponent implements OnInit {
  annualPlan: AnnualPlan;
  msg: Message[] = [];
  validateForm: FormGroup;
  small;
  submitLoading: boolean;
  _submitForm = ($event, value) => {
    $event.preventDefault();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    if (this.validateForm.valid) {
      let event = this.validateForm.value;
      event.name = this.validateForm.value.years + '年' + this.annualPlan.org.name + '年度培训计划';
      this.doSubmit(this.validateForm.value);
    } else {
      tipMessage('编辑年度计划表单校验失败', 'warning');
    }
  };
  constructor(private annualplanService: AnnualplanService,
    private message: NzMessageService, private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.submitLoading = false;
    this.route.data.subscribe((data: { annualPlan: AnnualPlan }) => {
      this.annualPlan = data.annualPlan;
    });
    this.validateForm = this.fb.group({
      years: [this.annualPlan.years + '', [Validators.required]], // 年限
      name: [this.annualPlan.name.substring(4), [Validators.required]], // 名称
      trainingBudget: [this.annualPlan.trainingBudget, [Validators.required]], // 培训预算
      researchBudget: [this.annualPlan.researchBudget, [Validators.required]] // 研发预算
    });
  }

  doSubmit(event) {
    this.submitLoading = true;
    event.id = this.annualPlan.id;
    if (event.years != this.annualPlan.years) {
      this.annualplanService.checkPlanCreatedThisYear(event.years, this.annualPlan.org.id).subscribe(
        craetedFlag => {
          if (craetedFlag == true) { // 当年已创建
            tipMessage(`${event.years}年已创建年度计划！`, 'warning');
            this.submitLoading = false;
            return;
          } else {
            this.annualplanService.save(event).subscribe(
              ok => {
                tipMessage('修改成功', 'success');
                this.toList();
              },
              err => {
                tipMessage('修改失败');
                this.submitLoading = false;
              }
            );
          }
        }
      );
    } else {
      this.annualplanService.save(event).subscribe(
        ok => {
          tipMessage('修改成功', 'success');
          this.toList();
        },
        err => {
          tipMessage('修改失败');
        }
      );
    }
  }

  onCancel(e) {
    this.toList();
  }

  toList() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }
}
