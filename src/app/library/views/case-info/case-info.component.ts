import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { CaseInfo } from '../../entity/case-info';
import { CaseInfoService } from '../../service/case.service';
import { CuiLayer } from 'console-ui-ng';

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
        let id = +params['id'];
        this.loadData(id);
      }
    );
  }

  loadData(id) {
    this.loading = true;
    this.caseInfoService.get(id).subscribe(
      FormCaseInfo => { this.caseInfo = FormCaseInfo; this.loading = false;},
      err =>{
        this.loading = false;
      }
    );
  }

  downloadFile(relativePath) {
    location.href = window.location.origin + relativePath;
    // this.CaseInfoService.downloadFile(window.location.origin + relativePath);
  }
}
