/*
 * @Author: mozhengqian
 * @Date: 2017-11-07 10:57:23
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-03 17:29:56
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
  selector: "spk-test-matching-questions-add",
  templateUrl: "./test-matching-questions-add.component.html",
  styleUrls: ["./test-matching-questions-add.component.scss"]
})
export class TestMatchingQuestionsAddComponent implements OnInit {
  @Input() validateUPForm: FormGroup;
  @Input() formupbtn: any;
  @Output() returnFun: any = new EventEmitter<string>();
  @Input() baseCodeType: any;

  validateForm: FormGroup;
  baseCode: string = "";
  knowledgeId: string = "";
  userGroupId: string = "";
  typeName: string = "";
  difficult: any;
  bigQuestionStuts: any = []; // 问题是否富文本状态集合
  bigOptionStuts: any = []; // 选项是否富文本状态集合
  radioList: any[] = []; // 匹配答案
  errorMsg: any; // 是否全部匹配答案
  selectTextType: boolean = false; // 是否使用富文本
  selectTextAnalysisType: boolean = true; // 是否使用富文本
  questionType: any;
  saveLoading: boolean = false; // 保存loading
  answeroptionList: any = [
    // 选项集合
    {}
  ];
  answerquestionList: any = [
    // 问题集合
    {}
  ];
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
        observer.next({ error: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };
  // 题干切换富文本
  changeCausBigText() {
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get("casual") &&
      this.validateForm.get("casual").setValue("");
  }
   // 解析切换富文本
   changeCausBigTextAnalysis() {
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get("analysis") &&
      this.validateForm.get("analysis").setValue("");
  }
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
  // 问题切换富文本显示
  changeBigQuestion = i => {
    this.bigQuestionStuts[i] = !this.bigQuestionStuts[i];
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get(`question${i}`) &&
      this.validateForm.get(`question${i}`).setValue("");
  };
  // 选项切换富文本显示
  changeBigOption = i => {
    this.bigOptionStuts[i] = !this.bigOptionStuts[i];
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get(`answer${i}`) &&
      this.validateForm.get(`answer${i}`).setValue("");
  };
  setFormInit(flag?) {
    let params = {};
    this.answerquestionList.forEach((answer, index) => {
      if (this.validateForm && this.validateForm.controls[`question${index}`]) {
        // tslint:disable-next-line:max-line-length
        this.validateForm
          .get(`question${index}`)
          .setValue(
            (answer.validate && answer.validate[0]) ||
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
    this.answeroptionList.forEach((answer, index) => {
      if (this.validateForm && this.validateForm.controls[`answer${index}`]) {
        // tslint:disable-next-line:max-line-length
        this.validateForm
          .get(`answer${index}`)
          .setValue(
            (answer.validate && answer.validate[0]) ||
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
          this.checkMaxLength.bind(null, false)
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
  _submitForm = ($event, value) => {
    this.saveLoading = true;
    $event.preventDefault();
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
          answer: dindex,
          answerText: value[`question${index}`],
          isBigText: !!this.bigQuestionStuts[index],
          isCorrect: null
        };
        dindex++;
      });
      this.answeroptionList.forEach((answer, index) => {
        answerList[dindex] = {
          answer: dindex,
          answerText: value[`answer${index}`],
          isBigText: !!this.bigOptionStuts[index],
          isCorrect: null
        };
        this.radioList.forEach((item, i) => {
          if (item == index) {
            answerList[i]["isCorrect"] = dindex;
          }
        });
        dindex++;
      });
      let params = {
        answerList: [...answerList],
        knowledgeId: this.knowledgeId,
        question: {
          baseCode: this.baseCode,
          casual: this.selectTextType ? "" : value.casual,
          ...this.question,
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
        this.radioList.splice(id, 1);
      }
      this.answerquestionList = oldData;
    }
  }
  adOption() {
    this.setOptionInit();
    this.setQuestionInit();
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
  addQuestion() {
    this.setQuestionInit();
    this.setOptionInit();
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
