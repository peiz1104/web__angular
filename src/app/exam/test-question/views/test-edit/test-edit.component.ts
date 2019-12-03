/*
 * @Author: mozhengqian
 * @Date: 2017-11-16 10:06:13
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-03 15:47:14
 */
import { Component, OnInit } from "@angular/core";
import { TestQuestionService } from "app/exam/service/test-question.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { Observable } from "rxjs/Observable";
import * as moment from "moment";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "spk-test-edit",
  templateUrl: "./test-edit.component.html",
  styleUrls: ["./test-edit.component.scss"]
})
export class TestEditComponent implements OnInit {
  validateForm: FormGroup; // 编辑头部表单
  codeName: any = {
    DANX: "单选题",
    DUOX: "多选题",
    JD: "简答题",
    ALFX: "案例分析题",
    PD: "判断题",
    YDLJ: "阅读理解题",
    PP: "匹配题",
    TK: "填空题"
  };
  parentId: number; // 父试题id
  queId: any = ""; // 试题id
  qbId: any = ""; // 修改历史ID,修改子题时必传 默认-1
  baseCode: string = ""; // 基础题型
  typeCode: string = ""; // 阅读理解创建字体下拉框选择的题型
  knowledgeId: string = ""; // 试题分类id
  typeName: string = ""; // 试题类型名
  difficult: any; // 难度下拉数据
  questionType: any; // 试题类型下拉数据
  bool: boolean = true; // 是否是阅读理解子题型编辑
  spinning: boolean = true;
  isPaper: any;
  epId: any;
  url: string;
  userGroupId: any; // 组织机构id
  editData: any = undefined; // 获取试题数据，用于编辑试题
  constructor(
    private router: Router,
    private testQuestionService: TestQuestionService,
    private nzMessageService: NzMessageService,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private nzModalService: NzModalService
  ) {}

  ngOnInit() {
    this.userGroupId = this.activatedRoute.snapshot.params["userGroupId"];
    this.knowledgeId = this.activatedRoute.snapshot.params["knowledgeId"];
    this.qbId = this.activatedRoute.snapshot.params["qbId"] || -1;
    this.queId = this.activatedRoute.snapshot.params["queId"];
    this.isPaper = this.activatedRoute.snapshot.params["isPaper"] == "true";
    this.epId = this.activatedRoute.snapshot.params["epId"];
    this.url = this.activatedRoute.snapshot.params["url"];
    this.parentId = this.activatedRoute.snapshot.params["parentId"] || -1;
    this.typeCode = this.activatedRoute.snapshot.params["typeCode"];
    this.bool = this.activatedRoute.snapshot.params["isZt"] ? false : true;
    this.setDefalutFormInit();
    this.getInfo();
  }
  setDefalutFormInit() {
    let params = {};
    if (this.bool) {
      // false: 是阅读理解子题，默认为true，阅读理解子题没有试题难度，试题分类
      params["typeCode"] = [null];
      params["diffCode"] = [null];
      params["score"] = [1.0];
      params["startTime"] = [null];
      params["endTime"] = [null];
      params["answerTime"] = [null];
    }
    this.validateForm = this.fb.group(params);
  }
  getInfo() {
    this.spinning = true;
    this.testQuestionService.getDifficulty().subscribe(data => {
      // 试题难度下拉数据获取
      this.difficult = data;
    });
    this.testQuestionService.getQuestionType().subscribe(data => {
      // 试题类型下来数据获取
      this.questionType = data;
    });
    if (this.isPaper) {
      this.testQuestionService
        .getPaperQuestionInfo(this.queId)
        .subscribe(data => {
          this.parentId = data.parentId || this.parentId;
          this.typeCode = data.typeCode || this.typeCode;
          this.knowledgeId = data.knowId || this.knowledgeId;
          this.inItQuertion(data);
        });
    } else {
      this.testQuestionService.getQuestionInfo(this.queId).subscribe(data => {
        // 试题数据获取
        this.inItQuertion(data);
      });
    }
  }
  inItQuertion(data) {
    this.baseCode = data.baseCode;
    this.typeName = data.typeCode;
    this.editData = data;
    this.spinning = false;
    this.setFormInit(this.editData);
  }
  checkDate = (type, control: FormControl): any => {
    let startTime =
      this.validateForm &&
      this.validateForm.controls["startTime"] &&
      this.validateForm.controls["startTime"].value;
    let endTime =
      this.validateForm &&
      this.validateForm.controls["endTime"] &&
      this.validateForm.controls["endTime"].value;
    let that = this;
    return Observable.create(function(observer) {
      if (startTime && endTime) {
        if (new Date(endTime).getTime() <= new Date(startTime).getTime()) {
          that.nzMessageService.error("结束时间必须大于开始时间");
          if (type == 1) {
            // 输入的开始时间
            that.validateForm.get(`endTime`).setValue(null);
          } else {
            that.validateForm.get(`startTime`).setValue(null);
          }
        }
      }
      observer.next(null);
      observer.complete();
    });
  };
  checkScore = (control: FormControl): any => {
    return Observable.create(function(observer) {
      let value = control.value + "";
      let isTrue = false;
      // if (value.indexOf('.') > -1 && value.substr(value.indexOf('.'), value.length) != '.5') {
      if (
        value.indexOf(".") > -1 &&
        value.substr(value.indexOf(".") + 1, value.length).length > 1
      ) {
        isTrue = true;
      }
      if (control.value > 99 || isTrue) {
        observer.next({ error: true, duplicated: true });
      } else if (control.value <= 0) {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };
  checkAnswerTime = (control: FormControl): any => {
    return Observable.create(function(observer) {
      let value = control.value + "";
      if (value.indexOf(".") > -1) {
        observer.next({ error: true, duplicated: true });
      } else if (control.value <= 0) {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };
  setFormInit(data) {
    let otherObj = {};
    if (this.bool) {
      // false: 是阅读理解子题，默认为true，阅读理解子题没有试题难度，试题分类
      otherObj["typeCode"] = [data.typeCode, [Validators.required]];
      otherObj["startTime"] = [
        data.startTime ? moment(data.startTime) : null,
        [],
        this.checkDate.bind(null, 1)
      ];
      otherObj["endTime"] = [
        data.endTime ? moment(data.endTime) : null,
        [],
        this.checkDate.bind(null, 2)
      ];
    }
    otherObj["diffCode"] = [data.diffCode, [Validators.required]];
    if (this.baseCode != "YDLJ") {
      // 阅读理解没有分数
      otherObj["score"] = [
        this.isPaper ? data.queScore : data.score,
        [Validators.required],
        this.checkScore
      ];
    }
    let params = {
      ...otherObj,
      qbId: this.qbId,
      parentId: this.parentId,
      answerTime: [
        this.isPaper ? data.answerLength : data.answerTime,
        [Validators.required, Validators.maxLength(5)],
        this.checkAnswerTime
      ]
    };
    if (!this.bool) {
      params["typeCode"] = this.typeCode;
    }
    this.validateForm = this.fb.group(params);
  }
  _submitForm = ($event, value) => {
    $event.preventDefault();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    return this.validateForm.valid;
  };
  backToList() {
    this.router.navigate([
      "exam/test-question/list",
      {
        knowledgeId: this.knowledgeId,
        userGroupId: this.userGroupId
      }
    ]);
  }
  backToType() {
    this.router.navigate([
      "/exam/exam-paper/editpaper/" + this.epId + "/addtest",
      { epId: this.epId }
    ]);
  }
  returnFun(e) {
    // 返回方法，传给八个基本题型编辑页面，更新操作完成后的返回列表页面的方法
    if (!this.bool) {
      // 如果是子题
      this.router.navigate([
        `exam/test-question/${this.url || "rqList"}/${this.parentId}`,
        {
          knowledgeId: this.knowledgeId,
          userGroupId: this.userGroupId,
          qbId: this.qbId ? this.qbId : "",
          isPaper: this.isPaper,
          epId: this.epId,
          url: this.url
        }
      ]);
      return;
    }
    // tslint:disable-next-line:max-line-length
    if (this.qbId == -1) {
      if (this.isPaper) {
        this.router.navigate([
          `/exam/exam-paper/editpaper/${this.epId}/addtest`,
          {
            epId: this.epId
          }
        ]);
      } else {
        this.router.navigate([
          `exam/test-question/list`,
          {
            knowledgeId: this.knowledgeId,
            userGroupId: this.userGroupId
          }
        ]);
      }
    } else {
      if (this.isPaper) {
        this.router.navigate([
          `/exam/exam-paper/editpaper/${this.epId}/addtest`,
          {
            epId: this.epId
          }
        ]);
      } else {
        this.router.navigate([
          `exam/test-question/${this.url || "rqList"}/${this.parentId}`,
          {
            knowledgeId: this.knowledgeId,
            qbId: this.qbId ? this.qbId : "",
            userGroupId: this.userGroupId,
            isPaper: this.isPaper,
            url: this.url
          }
        ]);
      }
    }
    // this.router.navigate([...this.returnUrl]);
  }
}

// {
//   "answerList": - [                //类型：Array  必有字段  备注：试题选项列表
//        - {                //类型：Object  必有字段  备注：无
//           "answer":0,                //类型：Number  必有字段  备注：选项排序序列
//           "answerId":0,                //类型：Number  可有字段  备注：无
//           "answerText":"string",                //类型：String  必有字段  备注：选项
//           "isCorrect":"string",                //类型：String  必有字段  备注：正确答案，Y：是；N：否，匹配题为对应的选项的排序序列
//           "queId":0,                //类型：Number  可有字段  备注：无
//           "queVersion":0                //类型：Number  可有字段  备注：无
//       }
//   ],
//   "knowledgeId":0,                //类型：Number  必有字段  备注：试题分类ID
//   "question": - {                //类型：Object  必有字段  备注：无
// 1      "answerTime":0,                //类型：Number  必有字段  备注：作答时长
//       "baseCode":"string",                //类型：String  必有字段  备注：试题基本类型编码
// 1      "casual":"string",                //类型：String  必有字段  备注：文本题干
//       "clobCasual":"string",                //类型：String  必有字段  备注：富文本题干
// 1      "diffCode":"string",                //类型：String  必有字段  备注：试题难度编码
//  1     "endTime":"2017-10-27T08:11:38.696Z",                //类型：String  可有字段  备注：有效结束时间
//       "isApproved":true,                //类型：Boolean  可有字段  备注：无
//       "isAvail":true,                //类型：Boolean  必有字段  备注：是否发布 默认发布true
//       "isBigText":true,                //类型：Boolean  必有字段  备注：题干是否为大文本；true：大文本；false：不是大文本
//       "isDeleted":true,                //类型：Boolean  必有字段  备注：是否删除 默认false
//       "parentId":0,                //类型：Number  必有字段  备注：子题所属父题ID，无父题为-1
//       "queId":0,                //类型：Number  可有字段  备注：无
// 1      "score":0,                //类型：Number  必有字段  备注：分数
//       "siteId":0,                //类型：Number  必有字段  备注：组织ID
// 1     "startTime":"2017-10-27T08:11:38.697Z",                //类型：String  必有字段  备注：有效开始时间
// 1       "typeCode":"string"                //类型：String  必有字段  备注：试题类型编码
//   }
