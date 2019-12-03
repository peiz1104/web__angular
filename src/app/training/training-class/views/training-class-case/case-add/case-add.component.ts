import { CaseInfo } from './../../../../../library/entity/case-info';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CaseInfoService } from '../../../../../library/service/case.service';
import { CuiLayer, Message } from 'console-ui-ng';
import { OfferingCaseService } from '../../../../../learning/offering/service/offering-case-api.service';
import { Params } from '@angular/router/src/shared';
import { TrainingClass } from '../../../../entity/training-class';
import { UserGroup } from 'app/system/entity/user-group';

@Component({
  selector: 'spk-case-add',
  templateUrl: './case-add.component.html',
  styleUrls: ['./case-add.component.scss']
})
export class CaseAddComponent implements OnInit {

  tbcId: number;
  caseInfo: CaseInfo = new CaseInfo();
  msg: Message[] = [];
  loading: boolean = false;
  userGroup: UserGroup;
  trainingName: string;

  constructor(private offeringCaseService: OfferingCaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: CuiLayer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.tbcId = +params['tbcId'];
      }
    );
    this.route.data.subscribe(
      (obj: { trainingClass: any }) => {
        this.userGroup = new UserGroup();
        this.userGroup.id = obj.trainingClass.userGroupId;
        this.userGroup.name = obj.trainingClass.userGroupName;
        this.trainingName = obj.trainingClass.name;
      }
    );
    console.log(this.userGroup);
  }

  onSubmit(originalEvent) {
    this.loading = true;
    this.offeringCaseService.addData(this.tbcId, originalEvent.value).subscribe(
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
