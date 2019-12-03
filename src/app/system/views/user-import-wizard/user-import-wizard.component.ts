import { Data } from '@angular/router/src/config';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrentUserGroup } from '../user-manage-index/user-manage-index.component';
import { CuiLayer } from 'console-ui-ng';
import { Location } from '@angular/common';

@Component({
  selector: 'spk-user-import-wizard',
  templateUrl: './user-import-wizard.component.html',
  styleUrls: ['./user-import-wizard.component.scss']
})
export class UserImportWizardComponent implements OnInit {

  taskKey;

  correctImport: any[];
  // 导入步骤
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
    { title: '用户名', data: 'username' },
    { title: '姓名', data: 'displayName' },
    { title: '手机号', data: 'phoneNumber' },
    { title: '电子邮箱', data: 'email' },
    { title: '部门编号', data: 'orgCode' },
    { title: '部门名称', data: 'orgName' },
    { title: '密码', data: 'password' },
    { title: '生效时间', data: 'startDate', tpl: 'startDate' },
    { title: '到期时间', data: 'endDate', tpl: 'endDate' },
    { title: '错误信息', data: 'errInfo' }
  ];

  loading: boolean;
  importNow: boolean = false;
  trainingName: string;
  constructor(
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
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
    this.userService.importProgress(this.taskKey).subscribe(
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
    window.location.href = window.location.origin + `/api/users/excelModel`;
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
    this.userService.import(this.taskKey).subscribe(
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
