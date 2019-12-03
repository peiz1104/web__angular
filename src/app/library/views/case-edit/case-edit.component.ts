import { NzMessageService } from 'ng-zorro-antd';
import { Condition } from './../../../learning/offering/entity/condition';
import { Component, OnInit } from '@angular/core';
import { CaseInfo } from '../../entity/case-info';
import { CaseInfoService } from '../../service/case.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer, Message } from 'console-ui-ng';
import { FormDataUtil } from '../../../core/utils/form-data-util';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-case-edit',
  templateUrl: './case-edit.component.html',
  styleUrls: ['./case-edit.component.scss']
})
export class CaseEditComponent implements OnInit {

  msg: Message[];
  caseInfo: CaseInfo;
  condition: Condition;
  err: string;
  loading: boolean = false;

  constructor(private caseInfoService: CaseInfoService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService) { }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let id = +params['id'];
        this.caseInfoService.get(id).subscribe(
          formCaseInfo => {
            this.caseInfo = formCaseInfo;
            this.condition = this.caseInfo.requiredCondition;
          }
        );
      }
    );
  }

  onSubmit(event) {
    this.loading = true;
    console.log(event.value)
    this.caseInfoService.update(event.value).subscribe(
      trainBase => {
        this.loading = false;
        tipMessage('保存成功', 'success');
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      err => {
        this.loading = false;
        this.msg = [{ severity: 'danger', summary: '保存失败', detail: err, id: 1 }];
        this.err = err;
      }
    );
  }

  initCondition() {
    console.log(this.caseInfo.id);
    this.condition = this.caseInfo.requiredCondition;
  }

  onCancel(e) {
    this.toList();
  }

  toList() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
