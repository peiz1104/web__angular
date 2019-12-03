/*
 * @Author: mozhengqian
 * @Date: 2017-11-15 11:04:38
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-02 15:45:21
 */
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TestQuestionService } from "app/exam/service/test-question.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import * as moment from "moment";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "spk-test-completion-questions-edit",
  templateUrl: "./test-completion-questions-edit.component.html",
  styleUrls: ["./test-completion-questions-edit.component.scss"]
})
export class TestCompletionQuestionsEditComponent implements OnInit {
  @Input() data: any = {};
  @Input() validateUPForm: FormGroup;
  @Input() formupbtn: any;
  @Output() returnFun: any = new EventEmitter<string>();
  validateForm: FormGroup;
  baseCode: string = "";
  saveLoading: boolean = false; // 保存loading
  userGroupId: string = "";
  typeName: string = "";
  difficult: any;
  questionType: any;
  focusIndex: any = 0;
  bigTextStuts: any[] = [];
  queId: any = "";
  answerError: any; // 选项错误信息
  answerList: any = [
    // 选项集合
  ];
  selectTextType: boolean = false; // 是否使用富文本
  selectTextAnalysisType: boolean = true; // 是否使用富文本
  checkboxbool: boolean = false;
  isBigClick: boolean = false;
  synVisible: boolean = false;
  parentId: number;
  isPaper: any;
  bool: boolean = false;
  question: any = {
    isAvail: true, // 类型：Boolean  必有字段  备注：是否发布 默认发布true
    isDeleted: false // 类型：Boolean  必有字段  备注：是否删除 默认false
  };
  constructor(
    private testQuestionService: TestQuestionService,
    public activatedRoute: ActivatedRoute,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder,
    private nzModalService: NzModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.baseCode = this.data.baseCode;
    this.typeName = this.data.typeName;
    this.queId = this.activatedRoute.snapshot.params["queId"];
    this.isPaper = this.activatedRoute.snapshot.params["isPaper"] == "true";
    this.answerList = this.data.answerList;
    this.selectTextType =
      this.data.isBigText == "true" || this.data.isBigText == true;
    this.parentId = this.activatedRoute.snapshot.params["parentId"] || -1;
    this.bool = this.activatedRoute.snapshot.params["isZt"] ? false : true;
    this.setFormInit();
  }
  handleSynVisible() {
    if (!this.synVisible) {
      this._submitForm(window.event, this.validateForm.value, () => {
        this.synVisible = true;
      });
    } else {
      this.synVisible = false;
    }
  }
  getCasual() {
    if (this.validateForm && this.validateForm.controls) {
      if (this.selectTextType) {
        return (
          this.validateForm && this.validateForm.controls["clobCasual"].value
        );
      } else {
        return this.validateForm && this.validateForm.controls["casual"].value;
      }
    } else {
      return this.data.clobCasual || this.data.casual;
    }
  }
  getCasual2() {
    if (this.validateForm && this.validateForm.controls) {
      if (this.selectTextAnalysisType) {
        return this.validateForm && this.validateForm.controls['queAnalysis'].value;
      } else {
        return this.validateForm && this.validateForm.controls['queAnalysis'].value;
      }
    } else {
      return this.data.queAnalysis;
    }
  }
  // 题干切换富文本
  changeCausBigText() {
    if (
      this.isBigClick &&
      this.validateForm &&
      this.validateForm.get("casual")
    ) {
      this.answerList = [];
      this.bigTextStuts = [];
      this.removeAnswer();
      this.validateForm.get("casual").setValue("");
    }
  }
  changeCausBigTextAnalysis() {
    console.log('切换解析富文本:', this.isBigClick);
    if (this.isBigClick && this.validateForm && this.validateForm.get('queAnalysis')) {
      this.validateForm.get('queAnalysis').setValue('');
    }
  }
  // 选项切换选项富文本模式
  changeBigText(key) {
    this.bigTextStuts[key] = !this.bigTextStuts[key];
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get(`answer${key}`) &&
      this.validateForm.get(`answer${key}`).setValue("");
  }
  removeAnswer() {
    if (this.validateForm && this.validateForm.controls) {
      let i = 0;
      while (this.validateForm.controls[`answer${i}`]) {
        this.validateForm.removeControl(`answer${i}`);
        i++;
      }
    }
  }
  checkMaxLength = (index, control: FormControl): any => {
    let isBigText = this.selectTextType;
    if (index !== null) {
      isBigText = this.bigTextStuts[index];
    }
    return Observable.create(function(observer) {
      let reg = /<[^<>]+>/g;
      let value = control.value || "";
      if (isBigText) {
        // 是富文本
        value = control.value.replace(reg, "");
      }
      if (value.trim() == "") {
        if (
          isBigText &&
          (control.value.indexOf("img") > -1 ||
            control.value.indexOf("video") > -1)
        ) {
          observer.next(null);
        } else {
          observer.next({ required: true });
        }
      } else if (value.length > 300) {
        observer.next({ error: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };
  setDefalutForm() {
    if (this.validateForm && this.validateForm.controls) {
      let params = {};
      let i = this.answerList.length;
      while (this.validateForm.controls[`answer${i}`]) {
        this.validateForm.removeControl(`answer${i}`);
        this.bigTextStuts[i] = false;
        i++;
      }
      // this.validateForm.patchValue(params);
    }
  }
  setFormInit(flag?) {
    let params = {};
    this.answerList.forEach((answer, index) => {
      console.log("是否:", this.bigTextStuts[index], answer.isBigText, index);
      this.bigTextStuts[index] = answer.isBigText;
      if (this.validateForm && this.validateForm.controls[`answer${index}`]) {
        this.validateForm
          .get(`answer${index}`)
          .setValue(
            (answer.validate && answer.validate[0]) || answer.answerText
          );
      } else {
        // tslint:disable-next-line:max-line-length
        params[`answer${index}`] = answer.validate || [
          answer.answerText,
          [Validators.required],
          this.checkMaxLength.bind(null, index)
        ]; // 选项数据初始化
      }
      // tslint:disable-next-line:max-line-length
      // params[`answer${index}`] = this.answerList[index].validate || [answer.answerText , [Validators.required], this.checkMaxLength.bind(null, null)];
    });
    this.setDefalutForm();
    if (flag) {
      params = {
        ...this.validateForm.controls,
        ...params
      };
    } else {
      params = {
        casual: [
          this.getCasual(),
          [Validators.required],
          this.checkMaxLength.bind(null, null)
        ],
        isBigText: [this.selectTextType, [Validators.required]],
        queAnalysis: [this.getCasual2(), [Validators.maxLength(300)]],
        isBigTextAnalysis: [this.selectTextAnalysisType,
          [Validators.required]],
        ...params
      };
    }
    this.validateForm = this.fb.group(params);
    let that = this;
    setTimeout(() => {
      that.isBigClick = true;
    }, 0);
  }
  _submitForm = ($event, value, call?: Function) => {
    this.saveLoading = true;
    // tslint:disable-next-line:no-unused-expression
    $event && $event.preventDefault && $event.preventDefault();
    this.formupbtn.click();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    if (this.answerList.length == 0) {
      this.answerError = "请添加至少一个空！";
      this.saveLoading = false;
      return;
    }
    if (this.validateUPForm.valid && this.validateForm.valid) {
      let upForm = this.validateUPForm.value;
      let answerList = [];
      this.answerList.forEach((answer, index) => {
        let bool = false;
        answerList[index] = {
          queId: answer.queId,
          queVersion: answer.queVersion,
          answer: index,
          answerText: value[`answer${index}`],
          isBigText: !!this.bigTextStuts[index],
          isCorrect: "Y"
        };
        if (this.isPaper) {
          answerList[index] = {
            ...answerList[index],
            answerId: answer.answerId,
            examQueId: answer.examQueId || this.data.queId
          };
        }
      });
      let params:any = {
        answerList: [...answerList],
        qbId: upForm.qbId
      };
      if (this.isPaper) {
        params = {
          ...this.data,
          ...params,
          queId: this.queId,
          clobCasual: this.selectTextType ? value.casual : "",
          userGroupId: this.data.userGroupId,
          baseCode: this.baseCode,
          casual: this.selectTextType ? "" : value.casual,
          ...this.question,
          isBigText: this.selectTextType,
          queAnalysis: value.queAnalysis,
          ...upForm,
          answerLength: upForm.answerTime,
          queScore: upForm.score,
          endTime: upForm.endTime && moment(upForm.endTime),
          startTime: upForm.startTime && moment(upForm.startTime)
        };
        this.testQuestionService.questionPaperUpdate(params).subscribe(
          data => {
            this.saveLoading = false;
            if (call) {
              call();
            } else {
              this.returnFun.emit();
            }
          },
          error => {
            this.saveLoading = false;
            this.nzMessageService.error(error);
          }
        );
      } else {
        params = {
          ...params,
          question: {
            queId: this.queId,
            clobCasual: this.selectTextType ? value.casual : "",
            userGroupId: this.data.userGroupId,
            baseCode: this.baseCode,
            casual: this.selectTextType ? "" : value.casual,
            ...this.question,
            isBigText: this.selectTextType,
            queAnalysis: value.queAnalysis,
            ...upForm,
            endTime: upForm.endTime && moment(upForm.endTime),
            startTime: upForm.startTime && moment(upForm.startTime)
          }
        };
        this.testQuestionService.questionUpdate(params).subscribe(
          data => {
            this.saveLoading = false;
            if (call) {
              call();
            } else {
              this.returnFun.emit();
            }
          },
          error => {
            this.saveLoading = false;
            this.nzMessageService.error(error);
          }
        );
      }
    } else {
      this.nzMessageService.error("表单还有未通过的项!");
      this.saveLoading = false;
    }
  };
  setOptionInit(id?) {
    if (this.validateForm) {
      // tslint:disable-next-line:forin
      let oldData = [];
      this.answerList.forEach((answer, index) => {
        oldData.push({
          ...answer,
          validate: [
            this.validateForm.get(`answer${index}`).value,
            [Validators.required],
            this.checkMaxLength.bind(null, index)
          ]
        });
      });
      if (id || id == 0) {
        this.bigTextStuts.splice(id, 1);
        oldData.splice(id, 1);
      }
      this.answerList = oldData;
    }
  }
  searchSubStr(str, subStr, num) {
    let pos = str.indexOf(subStr);
    let i = 0;
    while (pos > -1) {
      if (i == num) {
        break;
      }
      pos = str.indexOf(subStr, pos + 1);
      i++;
    }
    return pos;
  }
  textFocus($event) {
    this.focusIndex = $event.target.selectionStart;
  }
  adOption() {
    this.answerError = "";
    let casual = this.validateForm.controls["casual"].value || "";
    if (this.selectTextType && casual.indexOf("<p>") > -1) {
      // 富文本模式下
      casual = casual.substr(0, casual.lastIndexOf("</p>")) + "_____</p>";
    } else {
      casual =
        casual.substr(0, this.focusIndex) +
        "_____" +
        casual.substr(this.focusIndex, casual.length);
    }
    this.validateForm.get(`casual`).setValue(casual);
    this.setOptionInit();
    this.answerList.push({
      validate: [
        "",
        [Validators.required],
        this.checkMaxLength.bind(null, this.answerList.length)
      ]
    });
    this.setFormInit(true);
  }

  deleteOption(id) {
    if (this.validateForm) {
      let casual = this.validateForm.controls["casual"].value || "";
      let index = this.searchSubStr(casual, "_____", id);
      casual =
        casual.substr(0, index) + casual.substr(index + 5, casual.length);
      this.validateForm.get(`casual`).setValue(casual);
    }
    this.setOptionInit(id);
    setTimeout(() => {
      this.setFormInit(true);
    }, 0);
  }
}
