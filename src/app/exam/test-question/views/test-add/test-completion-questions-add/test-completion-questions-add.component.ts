/*
 * @Author: mozhengqian
 * @Date: 2017-11-08 13:25:37
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-11-28 13:54:58
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
  selector: "spk-test-completion-questions-add",
  templateUrl: "./test-completion-questions-add.component.html",
  styleUrls: ["./test-completion-questions-add.component.scss"]
})
export class TestCompletionQuestionsAddComponent implements OnInit {
  @Input() validateUPForm: FormGroup;
  @Input() formupbtn: any;
  @Input() baseCodeType: any;
  @Output() returnFun: any = new EventEmitter<string>();
  saveLoading: boolean = false; // 保存loading
  validateForm: FormGroup;
  baseCode: string = "";
  knowledgeId: string = "";
  userGroupId: string = "";
  typeName: string = "";
  bigTextStuts: any[] = [];
  difficult: any;
  questionType: any;
  focusIndex: any = 0; // 光标所在地下标
  selectTextType: boolean = false; // 是否使用富文本
  selectTextAnalysisType: boolean = true; // 是否使用富文本
  answerList: any = [
    // 选项集合
  ];
  answerError: any; // 选项错误信息
  checkboxbool: boolean = false;
  question: any = {
    clobCasual: "", // 类型：String  必有字段  备注：富文本题干
    isAvail: true, // 类型：Boolean  必有字段  备注：是否发布 默认发布true
    isBigText: false, // 类型：Boolean  必有字段  备注：题干是否为大文本；true：大文本；false：不是大文本
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
    this.baseCode =
      this.baseCodeType || this.activatedRoute.snapshot.params["baseCode"];
    this.typeName = this.activatedRoute.snapshot.params["typeName"];
    this.knowledgeId = this.activatedRoute.snapshot.params["knowledgeId"];
    this.userGroupId = this.activatedRoute.snapshot.params["userGroupId"];
    this.setFormInit();
  }
  // flag为true代表为答案
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
      // .patchValue(params);
    }
  }
  setFormInit(flag?) {
    let params = {};
    this.answerList.forEach((answer, index) => {
      if (this.validateForm && this.validateForm.controls[`answer${index}`]) {
        // this.validateForm.get(`answer${index}`).setValue(answer.validate[0]);
        this.validateForm.controls[`answer${index}`].setValue(
          answer.validate[0]
        );
      } else {
        // tslint:disable-next-line:max-line-length
        params[`answer${index}`] = this.answerList[index].validate || [
          null,
          [Validators.required],
          this.checkMaxLength.bind(null, index)
        ]; // 选项数据初始化
      }
      // params[`answer${index}`] = this.answerList[index].validate || [null, [Validators.required] , this.checkMaxLength.bind(null, null)];
    });
    this.setDefalutForm();
    if (flag) {
      params = {
        ...this.validateForm.controls,
        ...params
      };
    } else {
      params = {
        // tslint:disable-next-line:max-line-length
        casual: [
          this.validateForm && this.validateForm.controls["casual"].value,
          [Validators.required],
          this.checkMaxLength.bind(null, null)
        ],
        isBigText: [
          (this.validateForm &&
            this.validateForm.controls["isBigText"].value) ||
            false,
          [Validators.required]
        ],
        isBigTextAnalysis: [this.selectTextAnalysisType,
          [Validators.required]],
        queAnalysis: [
          this.validateForm && this.validateForm.controls["queAnalysis"].value,
          [Validators.maxLength(300)],
          // this.checkMaxLength.bind(null, null)
        ],
        ...params
      };
    }
    this.validateForm = this.fb.group(params);
  }
  _submitForm = ($event, value) => {
    this.saveLoading = true;
    $event.preventDefault();
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
          answer: index,
          answerText: value[`answer${index}`],
          isBigText: !!this.bigTextStuts[index],
          isCorrect: "Y"
        };
      });
      let params = {
        answerList: [...answerList],
        knowledgeId: this.knowledgeId,
        question: {
          baseCode: this.baseCode,
          ...this.question,
          casual: this.selectTextType ? "" : value.casual,
          isBigText: this.selectTextType,
          clobCasual: this.selectTextType ? value.casual : "",
          queAnalysis: value.queAnalysis ,
          ...upForm,
          endTime: upForm.endTime && moment(upForm.endTime),
          startTime: upForm.startTime && moment(upForm.startTime)
        }
      };
      this.testQuestionService.addQuestion(params).subscribe(
        data => {
          this.saveLoading = false;
          this.returnFun.emit();
        },
        error => {
          this.saveLoading = false;
          this.nzMessageService.error(error);
        }
      );
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
          validate: [
            this.validateForm.get(`answer${index}`).value,
            [Validators.required],
            this.checkMaxLength.bind(null, true)
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
  // 题干切换富文本
  changeCausBigText() {
    if (this.validateForm && this.validateForm.get("casual")) {
      this.answerList = [];
      this.bigTextStuts = [];
      this.removeAnswer();
      this.validateForm.get("casual").setValue("");
    }
  }
  // 解析切换富文本
  changeCausBigTextAnalysis() {
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get("analysis") &&
      this.validateForm.get("analysis").setValue("");
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
      let params = {};
      let i = 0;
      while (this.validateForm.controls[`answer${i}`]) {
        this.validateForm.removeControl(`answer${i}`);
        i++;
      }
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
