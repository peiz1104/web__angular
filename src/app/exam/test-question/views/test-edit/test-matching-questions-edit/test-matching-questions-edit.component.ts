/*
 * @Author: mozhengqian
 * @Date: 2017-11-07 10:57:23
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-03 17:44:25
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
  selector: "spk-test-matching-questions-edit",
  templateUrl: "./test-matching-questions-edit.component.html",
  styleUrls: ["./test-matching-questions-edit.component.scss"]
})
export class TestMatchingQuestionsEditComponent implements OnInit {
  @Input() data: any = {};
  @Input() validateUPForm: FormGroup;
  @Input() formupbtn: any;
  @Output() returnFun: any = new EventEmitter<string>();
  validateForm: FormGroup;
  radioList: any[] = []; // 匹配答案
  errorMsg: any; // 是否全部匹配答案
  baseCode: string = "";
  userGroupId: string = "";
  typeName: string = "";
  difficult: any;
  questionType: any;
  isBigClick: boolean = false;
  queId: any = "";
  saveLoading: boolean = false; // 保存loading
  parentId: number;
  bigQuestionStuts: any = []; // 问题是否富文本状态集合
  bigOptionStuts: any = []; // 选项是否富文本状态集合
  synVisible: boolean = false;
  answeroptionList: any = [
    // 选项集合
  ];
  selectTextType: boolean = false; // 是否使用富文本
  selectTextAnalysisType: boolean = true; // 是否使用富文本
  answeroptionListData: any = []; // 选项原始数据集合
  answerquestionList: any = [
    // 问题集合
  ];
  bool: boolean = false;
  answerquestionListData: any = []; // 问题原始数据集合
  question: any = {
    isAvail: true, // 类型：Boolean  必有字段  备注：是否发布 默认发布true
    isDeleted: false // 类型：Boolean  必有字段  备注：是否删除 默认false
  };
  radioIndexList: any = [];
  isPaper: any;
  constructor(
    private testQuestionService: TestQuestionService,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.baseCode = this.data.baseCode;
    this.typeName = this.data.typeName;
    this.queId = this.activatedRoute.snapshot.params["queId"];
    this.parentId = this.activatedRoute.snapshot.params["parentId"] || -1;
    this.userGroupId = this.activatedRoute.snapshot.params["userGroupId"];
    this.isPaper = this.activatedRoute.snapshot.params["isPaper"] == "true";
    this.bool = this.activatedRoute.snapshot.params["isZt"] ? false : true;
    this.selectTextType =
      this.data.isBigText == "true" || this.data.isBigText == true;
    let qindex = 0,
      oindex = 0;
    // tslint:disable-next-line:no-unused-expression
    this.data.answerList &&
      this.data.answerList.forEach((answer, index) => {
        if (answer.isCorrect) {
          this.answerquestionListData.push(answer);
          this.answerquestionList.push({
            validate: [
              answer.answerText,
              [Validators.required],
              this.checkMaxLength.bind(null, true)
            ]
          });
          this.bigQuestionStuts[qindex] = answer.isBigText;
          this.radioList[answer.answer] = answer.isCorrect;
          qindex++;
        } else {
          this.answeroptionListData.push(answer);
          this.bigOptionStuts[oindex] = answer.isBigText;
          this.answeroptionList.push({
            validate: [
              answer.answerText,
              [Validators.required],
              this.checkMaxLength.bind(null, true)
            ]
          });
          oindex++;
        }
      });
    this.radioList.forEach((item, i) => {
      this.radioList[i] = item - this.answerquestionList.length;
    });
    this.parentId = this.activatedRoute.snapshot.params["parentId"] || -1;
    this.userGroupId = this.activatedRoute.snapshot.params["userGroupId"];
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
  checkMaxLength = (flag, control: FormControl): any => {
    let isBigText = this.selectTextType;
    return Observable.create(function(observer) {
      let reg = /<[^<>]+>/g;
      let value = control.value || "";
      if (isBigText && !flag) {
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
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };
  setDefalutForm() {
    if (this.validateForm && this.validateForm.controls) {
      let i = this.answerquestionList.length;
      while (this.validateForm.controls[`question${i}`]) {
        this.validateForm.removeControl(`question${i}`);
        i++;
      }
      let j = this.answeroptionList.length;
      while (this.validateForm.controls[`answer${j}`]) {
        this.validateForm.removeControl(`answer${j}`);
        j++;
      }
    }
  }
  // 题干切换富文本
  changeCausBigText() {
    if (
      this.isBigClick &&
      this.validateForm &&
      this.validateForm.get("casual")
    ) {
      this.validateForm.get("casual").setValue("");
    }
  }
  changeCausBigTextAnalysis() {
    console.log('切换解析富文本:', this.isBigClick);
    if (this.isBigClick && this.validateForm && this.validateForm.get('queAnalysis')) {
      this.validateForm.get('queAnalysis').setValue('');
    }
  }
  // 问题切换富文本显示
  changeBigQuestion = i => {
    this.bigQuestionStuts[i] = !this.bigQuestionStuts[i];
    if (
      this.isBigClick &&
      this.validateForm &&
      this.validateForm.get(`question${i}`)
    ) {
      // tslint:disable-next-line:no-unused-expression
      this.validateForm &&
        this.validateForm.get(`question${i}`) &&
        this.validateForm.get(`question${i}`).setValue("");
    }
  };
  // 选项切换富文本显示
  changeBigOption = i => {
    this.bigOptionStuts[i] = !this.bigOptionStuts[i];
    if (
      this.isBigClick &&
      this.validateForm &&
      this.validateForm.get(`answer${i}`)
    ) {
      // tslint:disable-next-line:no-unused-expression
      this.validateForm &&
        this.validateForm.get(`answer${i}`) &&
        this.validateForm.get(`answer${i}`).setValue("");
    }
  };
  setFormInit(flag?) {
    let params= {};
    this.answeroptionList.forEach((answer, index) => {
      if (this.validateForm && this.validateForm.controls[`answer${index}`]) {
        // tslint:disable-next-line:max-line-length
        this.validateForm
          .get(`answer${index}`)
          .setValue(
            answer.validate[0] ||
              this.validateForm.controls[`answer${index}`].value
          );
      } else {
        params[`answer${index}`] = answer.validate || [
          null,
          [Validators.required],
          this.checkMaxLength.bind(null, true)
        ];
      }
    });
    this.answerquestionList.forEach((answer, index) => {
      if (this.validateForm && this.validateForm.controls[`question${index}`]) {
        // tslint:disable-next-line:max-line-length
        this.validateForm
          .get(`question${index}`)
          .setValue(
            answer.validate[0] ||
              this.validateForm.controls[`question${index}`].value
          );
      } else {
        params[`question${index}`] = answer.validate || [
          null,
          [Validators.required],
          this.checkMaxLength.bind(null, true)
        ];
      }
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
          this.checkMaxLength.bind(null, false)
        ],
        isBigText: [this.selectTextType, [Validators.required]],
        queAnalysis: [this.getCasual2(), [Validators.maxLength(300)]],
        isBigTextAnalysis: [this.selectTextAnalysisType,
          [Validators.required]],
        ...params
      };
    }
    this.validateForm = this.fb.group(params);
    setTimeout(() => {
      this.isBigClick = true;
    }, 0);
  }
  isAllSelect = () => {
    let isTrue = true;
    let i = 0;
    this.radioList.forEach(item => {
      i++;
      if (!item && item !== 0) {
        isTrue = false;
      }
    });
    return isTrue && i == this.answerquestionList.length;
  };
  _submitForm = ($event, value, call?: Function) => {
    this.saveLoading = true;
    // tslint:disable-next-line:no-unused-expression
    $event && $event.preventDefault && $event.preventDefault();
    this.formupbtn.click();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    let isTrue = this.isAllSelect();
    this.errorMsg = isTrue ? null : "请为问题匹配答案";
    if (this.validateUPForm.valid && this.validateForm.valid && isTrue) {
      let upForm = this.validateUPForm.value;
      let answerList = [];
      let dindex = 0;
      this.answerquestionList.forEach((answer, index) => {
        answerList[dindex] = {
          queId: this.answerquestionListData[index].queId,
          queVersion: this.answerquestionListData[index].queVersion,
          answer: dindex,
          isBigText: !!this.bigQuestionStuts[index],
          answerText: value[`question${index}`],
          isCorrect: null
        };
        if (this.isPaper) {
          answerList[dindex] = {
            ...answerList[dindex],
            answerId: this.answerquestionListData[index].answerId,
            examQueId:
              this.answerquestionListData[index].examQueId || this.data.queId
          };
        }
        dindex++;
      });
      this.answeroptionList.forEach((answer, index) => {
        answerList[dindex] = {
          queId: answer.queId,
          queVersion: answer.queVersion,
          answer: dindex,
          isBigText: !!this.bigOptionStuts[index],
          answerText: value[`answer${index}`],
          isCorrect: null
        };
        if (this.isPaper) {
          answerList[dindex] = {
            ...answerList[dindex],
            answerId: this.answeroptionListData[index].answerId,
            examQueId:
              this.answeroptionListData[index].examQueId || this.data.queId
          };
        }
        this.radioList.forEach((item, i) => {
          if (item == index) {
            answerList[i]["isCorrect"] = dindex;
          }
        });
        dindex++;
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
      this.answeroptionList.forEach((answer, index) => {
        oldData.push({
          validate: [
            this.validateForm.get(`answer${index}`).value,
            [Validators.required],
            this.checkMaxLength.bind(null, true)
          ]
        });
      });
      if (id || id === 0) {
        this.bigOptionStuts.splice(id, 1);
        oldData.splice(id, 1);
        this.answeroptionListData.splice(id, 1);
        this.radioList.forEach((item, i) => {
          if (item > oldData.length - 1) {
            this.radioList[i] = null;
          }
        });
      }
      this.answeroptionList = oldData;
    }
  }
  // 匹配答案变化事件
  radioChange = (i, j) => {
    this.radioList[i] = j;
  };
  adOption() {
    this.setOptionInit();
    this.setQuestionInit();
    this.answeroptionListData.push({});
    this.answeroptionList.push({
      validate: [
        null,
        [Validators.required],
        this.checkMaxLength.bind(null, true)
      ]
    });
    this.setFormInit(true);
  }

  deleteOption(id) {
    this.setOptionInit(id);
    this.setQuestionInit();
    setTimeout(() => {
      this.setFormInit(true);
    }, 0);
  }
  setQuestionInit(id?) {
    if (this.validateForm) {
      // tslint:disable-next-line:forin
      let oldData = [];
      this.answerquestionList.forEach((answer, index) => {
        oldData.push({
          validate: [
            this.validateForm.get(`question${index}`).value,
            [Validators.required],
            this.checkMaxLength.bind(null, true)
          ]
        });
      });
      if (id || id === 0) {
        this.bigQuestionStuts.splice(id, 1);
        oldData.splice(id, 1);
        this.answerquestionListData.splice(id, 1);
        this.radioList.splice(id, 1);
      }
      this.answerquestionList = oldData;
    }
  }
  addQuestion() {
    this.setQuestionInit();
    this.setOptionInit();
    this.answerquestionListData.push({});
    this.answerquestionList.push({
      validate: [
        null,
        [Validators.required],
        this.checkMaxLength.bind(null, true)
      ]
    });
    this.setFormInit(true);
  }
  deleteQuestion(id) {
    this.setQuestionInit(id);
    this.setOptionInit();
    setTimeout(() => {
      this.setFormInit(true);
    }, 0);
  }
}
