import { CaseFormComponent } from './../../public/case-form/case-form.component';
import { Condition } from './../../../learning/offering/entity/condition';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CaseInfo } from '../../entity/case-info';
import { Router, ActivatedRoute } from '@angular/router';
import { CuiLayer, Message } from 'console-ui-ng';
import { CaseInfoService } from '../../service/case.service';

@Component({
  selector: 'spk-case-add',
  templateUrl: './case-add.component.html',
  styleUrls: ['./case-add.component.scss']
})
export class CaseAddComponent implements OnInit {

  caseInfo: CaseInfo = new CaseInfo();
  condition: Condition;
  msg: Message[] = [];
  err: string;
  loading: boolean = false;
  canCheck: boolean = false;
  tableIndex: number = 0;

  constructor(private caseInfoService: CaseInfoService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: CuiLayer
  ) { }


  ngOnInit() {
  }

  initCondition() {
    this.caseInfoService.get(this.caseInfo.id).subscribe(
      caseInfo => {
        this.condition = caseInfo.requiredCondition;
      },
      err => { this.dialog.msg('初始化失败，请尝试先保存案例信息'); }
    );
  }

  onSubmit(originalEvent) {
    this.loading = true;
    this.caseInfoService.add(originalEvent.value).subscribe(
      caseInfo => {
        this.loading = false;
        this.dialog.msg('保存成功');
        this.caseInfo = caseInfo;
        this.tableIndex = 1;
        this.canCheck = true;
      },
      err => {
        this.loading = false;
        this.dialog.msg(err);
        // this.msg = err;
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
