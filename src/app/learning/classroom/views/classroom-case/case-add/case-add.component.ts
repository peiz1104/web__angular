import { CaseInfo } from './../../../../../library/entity/case-info';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CaseInfoService } from '../../../../../library/service/case.service';
import { CuiLayer, Message } from 'console-ui-ng';
import { OfferingCaseService } from '../../../../../learning/offering/service/offering-case-api.service';
import { Params } from '@angular/router/src/shared';
import { Classroom } from '../../../entity/classroom';
import { UserGroup } from '../../../../../system/entity/user-group';

@Component({
  selector: 'spk-case-add',
  templateUrl: './case-add.component.html',
  styleUrls: ['./case-add.component.scss']
})
export class CaseAddComponent implements OnInit {

  id: number;
  caseInfo: CaseInfo = new CaseInfo();
  msg: Message[] = [];
  loading: boolean = false;
  userGroup: UserGroup;

  constructor(private offeringCaseService: OfferingCaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: CuiLayer
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {classroom: Classroom}) => {
      this.id = data.classroom.id;
      this.userGroup = data.classroom.userGroup;
    });
  }

  onSubmit(originalEvent) {
    this.loading = true;
    this.offeringCaseService.addData(this.id, originalEvent.value).subscribe(
      caseInfo => {
        this.loading = false;
        this.dialog.msg('保存成功');
        this.router.navigate(["../"], { relativeTo: this.route });
      },
      err => {
        this.loading = false;
        this.msg = err;
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
