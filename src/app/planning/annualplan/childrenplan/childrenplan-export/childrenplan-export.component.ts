import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AnnualSubPlanService } from './../../service/annualsubplan.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-childrenplan-export',
  templateUrl: './childrenplan-export.component.html',
  styleUrls: ['./childrenplan-export.component.scss']
})
export class ChildrenPlanExportComponent implements OnInit {

  annualPlanId: number; // 年度计划id
  fullPath: string; // 文件完整路径
  buttonShow: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private annualSubPlanService: AnnualSubPlanService
  ) { }

  ngOnInit() {
    this.annualPlanId = this.activatedRoute.snapshot.params.id;
    this.annualSubPlanService.export(this.annualPlanId).subscribe(
      result => {
        this.fullPath = result;
        this.buttonShow = true;
      }
    );
  }

  download() {
    // this.annualSubPlanService.exportdownload(this.fullPath, '')
  }
}
