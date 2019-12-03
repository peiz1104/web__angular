import { Component, OnInit } from '@angular/core';
import { CaseInfoService } from '../../service/case.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CuiLayer } from 'console-ui-ng';
import { Location } from '@angular/common';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-case-import',
  templateUrl: './case-import.component.html',
  styleUrls: ['./case-import.component.scss']
})
export class CaseImportComponent implements OnInit {

  // constructor(
  //   private CaseInfoService: CaseInfoService) { }

  // ngOnInit() {
  // }

  // downloadModel() {
  //   window.location.href = window.location.origin + "/api/cases/caseModel";
  // }

  id: number;
  excelInfo: any = {};
  right: any[];
  stepNumber: number = 0; // 导入步骤步数
  leadSelectFile: string;
  leadProgress: number = 50; // 加载进度条
  ifSubmitImport: boolean = true;
  canNextStep: boolean = true;
  importErrInfo: string = "";
  loading: boolean;
  leadColumns: any = [
    { title: '案例编码', data: 'caseCode' },
    { title: '案例名称', data: 'name' },
    { title: '案例来源', data: 'sourceShow' },
    { title: '经典案例', data: 'isClassicShow' },
    { title: '案例内容', data: 'content' },
    { title: '发布', data: 'isPublishedShow' },
    { title: '完成时间', data: 'endtime', tpl: 'endtime' },
    { title: '适用对象', data: 'userObject' },
    { title: '简介', data: 'introduction' },
    { title: '关键字', data: 'keyword' },
    { title: '开发单位', data: 'developmentUnit' },
    { title: '案例题材', data: 'themeShow' },
    { title: '组织编码', data: 'userGroupCode' },
    { title: '组织名称', data: 'userGroupName' },
    { title: '错误信息', data: 'errInfo' },
  ];
  fileExecle: any = {};
  constructor(
    private caseInfoService: CaseInfoService,
    private dialog: CuiLayer,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
  }

  initImport(file) {
    this.loading = true;
    this.fileExecle = file;
    this.leadSelectFile = file['originFileName'];
    this.caseInfoService.caseImport(file["fullPath"]).subscribe(
      success => {
        this.excelInfo = success;
        this.canNextStep = false;
        this.importErrInfo = "";
        this.doneStepOK();
        this.loading = false;
      },
      err => {
        this.canNextStep = true;
        this.importErrInfo = err;
        this.ifSubmitImport = true;
        this.loading = false;
      }
    );
  }

  downloadExcelModel() {
    window.location.href = window.location.origin + "/api/cases/caseModel";
  }
  previousStep() {
    this.stepNumber = --this.stepNumber;
  }
  nextStep(num: number) {
    if (num == 0) {
      if (!this.leadSelectFile) {
        this.importErrInfo = "请选择导入的文件！";
        return;
      }
    }
    this.stepNumber = ++this.stepNumber;
  }
  doneStep() {
    this.ifSubmitImport = true;
    this.caseInfoService.saveImport(this.fileExecle["fullPath"]).subscribe(
      success => {
        tipMessage('文件导入成功！', 'success');
        // this.location.back();
        this.stepNumber = ++this.stepNumber;
      },
      err => { this.dialog.confirm(err) }
    );
  }
  doneStepOK() {
    this.right = this.excelInfo.right || [];
    if (this.right.length <= 0) {
      this.ifSubmitImport = true;
    } else {
      this.ifSubmitImport = false;
    }
  }
  cancelStep() {
    this.location.back();
  }
}
