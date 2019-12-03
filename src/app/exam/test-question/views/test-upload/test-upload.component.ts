import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TestQuestionService } from "app/exam/service/test-question.service";
import { Observable } from "rxjs/Observable";
import { NzMessageService } from "ng-zorro-antd";
import { Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { AccountService } from "app/account/service/account.service";
@Component({
  selector: "spk-test-upload",
  templateUrl: "./test-upload.component.html",
  styleUrls: ["./test-upload.component.scss"]
})
export class TestUploadComponent implements OnInit {
  @Input() selectTreeId: any;
  @Input() managerGroup: any;
  choosFile: any;
  xhr: any;
  flag: string = "0";
  fileType: string = "EXCEL";
  errorList: any[] = [];
  uploadObj: any = {
    stageMessager: "上传中",
    endNum: "0",
    errorObj: []
  };
  accountInfo: any = {};
  isShowDesc: boolean = false;
  proessNum: number = 0;
  interval: any;
  timeout: any;
  dicTypeList: any = [];
  isShowProess: boolean = false;
  uploadLoading: boolean = false; // 上传确定loading
  @Output() importTest: any = new EventEmitter<string>();
  constructor(
    private fb: FormBuilder,
    private testQuestionService: TestQuestionService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private accountInfoService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.testQuestionService
      .getDictionaries({ dicType: "QUESTION_TYPE_UPLOAD" })
      .subscribe(data => {
        data.map(item => {
          this.dicTypeList.push(item.dicCode);
        });
        this.fileType = this.dicTypeList[0];
      });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    console.log("销毁。。。。。。。");
    this.uploadLoading = false;
    // tslint:disable-next-line:no-unused-expression
    this.interval && clearInterval(this.interval);
    // tslint:disable-next-line:no-unused-expression
    this.timeout && clearTimeout(this.timeout);
  }
  changeFile(file) {
    this.choosFile = file.target.files[0];
    this.isShowProess = false;
    this.uploadObj = {
      stageMessager: "上传中",
      endNum: "0",
      errorObj: []
    };
  }
  changeValue = () => {
    this.isShowProess = false;
    this.uploadObj = {
      stageMessager: "上传中",
      endNum: "0",
      errorObj: []
    };
  };
  showDesc() {
    // 查看模板说明
    this.isShowDesc = !this.isShowDesc;
  }
  uploadError = evt => {
    let json = evt.target.responseText && JSON.parse(evt.target.responseText);
    if (json.error) {
      this.uploadObj.errorMsg = json.message;
      if (this.interval) {
        clearInterval(this.interval);
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.isShowProess = false;
      this.uploadLoading = false;
    }
  };
  returnFun() {
    this.isShowProess = false;
    this.uploadLoading = false;
    this.importTest.emit();
  }
  getProess = () => {
    if (!this.uploadLoading) {
      return;
    }
    this.testQuestionService
      .getUploadProess({ fileType: this.fileType, date: new Date().getTime() })
      .subscribe(
        data => {
          this.uploadObj = data;
          if (
            this.uploadObj.errorMsg ||
            (this.uploadObj.errorObj && this.uploadObj.errorObj.length > 0)
          ) {
            if (this.interval) {
              clearInterval(this.interval);
            }
            if (this.timeout) {
              clearTimeout(this.timeout);
            }
            this.isShowProess = false;
            this.uploadLoading = false;
            return;
          }
          if (data.endNum) {
            // 有返回信息
            if (this.interval) {
              clearInterval(this.interval);
            }
            const add = (data.endNum - this.proessNum) / 10;
            let i = 0;
            this.interval = setInterval(() => {
              if (i >= 10) {
                this.proessNum = parseFloat(parseFloat(data.endNum).toFixed(1));
                if (data.endNum >= 100) {
                  this.uploadLoading = false;
                  this.uploadObj.errorObj = data.errorObj || [];
                  if (this.uploadObj.errorObj.length == 0) {
                    this.nzMessageService.success("导入成功！");
                  }
                }
                if (this.interval) {
                  clearInterval(this.interval);
                }
              } else {
                this.proessNum = this.proessNum + add;
                this.proessNum = parseFloat(
                  parseFloat(this.proessNum + "").toFixed(1)
                );
              }
              i++;
            }, 500);
            if (data.endNum < 100) {
              this.timeout = setTimeout(this.getProess, 5000);
            }
          } else {
            this.timeout = setTimeout(this.getProess, 5000);
          }
        },
        error => {
          this.uploadObj.errorMsg = error.message;
          this.uploadLoading = false;
        }
      );
  };
  onSubmit() {
    if (!this.selectTreeId) {
      this.nzMessageService.error("不能选择根分类！");
      return;
    }
    if (!this.choosFile) {
      this.nzMessageService.error("请选择文件！");
      return;
    }
    this.xhr = new XMLHttpRequest();
    this.uploadLoading = true;
    this.isShowProess = false;
    setTimeout(() => {
      this.isShowProess = true;
    }, 0);
    this.uploadObj = {
      stageMessager: "上传中",
      endNum: "0",
      errorObj: []
    };
    this.proessNum = 0;
    let fd = new FormData();
    fd.append("file", this.choosFile); // 文件追到到FormData
    fd.append("fileType", this.fileType); // 文件追到到FormData
    fd.append("knowId", this.selectTreeId);
    fd.append("date", new Date().getTime() + "");
    fd.append("flag", this.fileType == "EXCEL" ? this.flag : "0");
    fd.append("userGroupId", this.managerGroup.id);
    this.xhr.open("POST", "/api/exam/question/import", true);
    this.xhr.send(fd);
    this.xhr.addEventListener("error", this.uploadError, true);
    this.xhr.addEventListener("load", this.uploadError, true);
    this.timeout = setTimeout(this.getProess, 2000);
  }
}
