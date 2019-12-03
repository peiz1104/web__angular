import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UserGroupService } from './../../service/user-group.service';
import { Component, OnInit } from '@angular/core';
import { CuiLayer } from 'console-ui-ng';
import { Location } from '@angular/common';

@Component({
  selector: 'spk-user-group-wizard',
  templateUrl: './user-group-wizard.component.html',
  styleUrls: ['./user-group-wizard.component.scss']
})
export class UserGroupWizardComponent implements OnInit {

  taskKey;

  correctImport: any[];
  // 导入步骤数
  stepBeginNum: number = 0;
  // 上传文件的类型
  leadFile: string;
  // 路由ID
  tbcId: any;
  // 文件上穿类型
  fileExe: any = {};
  excelInfo: any = {};
  ifSubmitImport: boolean = true;
  canNextStep: boolean = true;
  importErrInfo: string = "";
  // 列表信息展示
  stepNumber: number = 0;

  pourColumns: any = [
      { title: '编码', data: 'orgCode' },
      { title: '名称', data: 'orgName' },
      { title: '父组织编码', data: 'parentCode' },
      { title: '父组织名称', data: 'parentName' },
      { title: '错误信息', data: 'errInfo' }
    ];

  loading: boolean;
  importNow: boolean = false;
  trainingName: string;
  constructor(
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private userGroupService: UserGroupService,
  private dialog: CuiLayer,
    private location: Location
  ) { }

  ngOnInit() {
  }

  onUploadComplete(file) {
    this.fileExe = file['fileInfo'];
    this.leadFile = this.fileExe ? this.fileExe["originFileName"] : null;
    this.taskKey = file['taskKey'];
    this.loading = true;
    this.getImportProgress();
  }

  getImportProgress() {
    this.loading = true;
    this.userGroupService.importProgress(this.taskKey).subscribe(
      success => {
        this.excelInfo = success ? (success['progress'] || 0) : 0;
        if (!this.excelInfo) {
          setTimeout(() => {
            this.getImportProgress();
          }, 1000);
        } else {
          this.excelInfo = success['parsedData'];
          if (!this.excelInfo) {
            this.getImportProgress();
          } else {
            this.canNextStep = false;
            this.doneStepOK();
            this.importErrInfo = "";
            this.loading = false;
          }
        }
      },
      err => {
        this.canNextStep = true;
        this.importErrInfo = err;
        this.ifSubmitImport = true;
        this.loading = false;
      }
    );
  }

  downloadModel() {
    window.location.href = window.location.origin + `/api/userGroups/excelModel`;
  }
  previousStep() {
    this.stepBeginNum = --this.stepBeginNum;
  }
  nextStep(num: number) {
    if (num == 0) {
      if (!this.leadFile) {
        this.importErrInfo = "请选择导入的文件！";
        return;
      }
    }
    this.stepBeginNum = ++this.stepBeginNum;
  }

  doneStep() {
    this.importNow = true;
    this.ifSubmitImport = true;
    this.userGroupService.import(this.taskKey).subscribe(
      success => {
        this.message.success('文件导入成功！');
        this.stepBeginNum = ++this.stepBeginNum;
      },
      err => { this.dialog.confirm(err) }
    );
  }

  doneStepOK() {
    this.correctImport = this.excelInfo ? this.excelInfo.correctImport : [];
    if (this.correctImport.length <= 0) {
      this.ifSubmitImport = true;
    } else {
      this.ifSubmitImport = false;
    }
  }
  cancelStep() {
    this.location.back();
  }
}
