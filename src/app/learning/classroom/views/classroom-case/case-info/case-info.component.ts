import { Router, ActivatedRoute } from '@angular/router';
import { CaseInfo } from 'app/library/entity/case-info';
import { Component, OnInit } from '@angular/core';
import { CaseInfoService } from 'app/library/service/case.service';
import { CuiLayer } from 'console-ui-ng';
import { Params } from '@angular/router/src/shared';

@Component({
  selector: 'spk-case-info',
  templateUrl: './case-info.component.html',
  styleUrls: ['./case-info.component.scss']
})
export class CaseInfoComponent implements OnInit {


  err;
  caseInfo: CaseInfo;
  columns;
  loading: boolean;
  constructor(private caseInfoService: CaseInfoService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: CuiLayer) {
    this.columns = [
      { title: "文件名称", data: 'originFileName' },
      { title: "下载操作", tpl: 'downloadFile' },
    ];
  }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let caseId = +params['caseId'];
        this.loadData(caseId);
      }
    );
  }

  loadData(id) {
    this.loading = true;
    this.caseInfoService.get(id).subscribe(
      FormCaseInfo => {
        this.loading = false;
        this.caseInfo = FormCaseInfo;
      },
      err => {
        this.loading = false;
      }
    );
  }

  downloadFile(relativePath) {
    location.href = window.location.origin + relativePath;
  }
}

