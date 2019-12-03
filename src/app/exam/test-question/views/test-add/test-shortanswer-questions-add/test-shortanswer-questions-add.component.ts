/*
 * @Author: mozhengqian
 * @Date: 2017-11-08 14:02:58
 * @Last Modified by: mozhengqian
 * @Last Modified time: 2017-11-14 17:54:01
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'spk-test-shortanswer-questions-add',
  templateUrl: './test-shortanswer-questions-add.component.html',
  styleUrls: ['./test-shortanswer-questions-add.component.scss']
})

export class TestShortanswerQuestionsAddComponent implements OnInit {
  @Input() validateUPForm: FormGroup;
  @Input() formupbtn: any;
  @Output() returnFun: any = new EventEmitter<string>();
  @Input() baseCodeType: any;

  saveLoading: boolean = false; // 保存loading
  validateForm: FormGroup;
  selectTextType: boolean = false; // 是否使用富文本
  selectTextAnalysisType: boolean = true; // 是否使用富文本
  selectAnswerTextType: boolean = false; // 是否使用富文本
  baseCode: string = '';
  knowledgeId: string = '';
  userGroupId: string = '';
  typeName: string = '';
  difficult: any;
  questionType: any;
  checkboxbool: boolean = false;
  question: any = {
    "clobCasual": "",                // 类型：String  必有字段  备注：富文本题干
    "isAvail": true,                // 类型：Boolean  必有字段  备注：是否发布 默认发布true
    "isBigText": false,                // 类型：Boolean  必有字段  备注：题干是否为大文本；true：大文本；false：不是大文本
    "isDeleted": false,                // 类型：Boolean  必有字段  备注：是否删除 默认false
  }
  constructor(
    private testQuestionService: TestQuestionService,
    public activatedRoute: ActivatedRoute,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder,
    private nzModalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.baseCode = this.baseCodeType || this.activatedRoute.snapshot.params['baseCode'];
    this.typeName = this.activatedRoute.snapshot.params['typeName'];
    this.knowledgeId = this.activatedRoute.snapshot.params['knowledgeId'];
    this.userGroupId = this.activatedRoute.snapshot.params['userGroupId'];
    this.setFormInit();
  }

  setFormInit() {
    console.log(this.questionType);
    let params = {
      casual: [null, [Validators.required], this.checkMaxLength.bind(null, false)],
      isBigText: [false, [Validators.required]],
      isBigTextAnalysis: [this.selectTextAnalysisType,
        [Validators.required]],
      queAnalysis: [
        this.validateForm && this.validateForm.controls["queAnalysis"].value,
        [Validators.maxLength(300)],
        // this.checkMaxLength.bind(null, null)
      ],
      answer: [null, [Validators.required], this.checkMaxLength.bind(null, true)],
    };
    this.validateForm = this.fb.group(params);
  }
  changeAnswerType() {
    this.selectAnswerTextType = !this.selectAnswerTextType;
    // tslint:disable-next-line:no-unused-expression
    this.validateForm && this.validateForm.get('answer') && this.validateForm.get('answer').setValue('');
  }
  // 题干切换富文本
  changeCausBigText() {
    // tslint:disable-next-line:no-unused-expression
    this.validateForm && this.validateForm.get('casual') && this.validateForm.get('casual').setValue('');
  }
   // 解析切换富文本
   changeCausBigTextAnalysis() {
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get("analysis") &&
      this.validateForm.get("analysis").setValue("");
  }
  checkMaxLength = (type, control: FormControl): any => {
    let isBigText = this.selectTextType;
    if (type) {
      isBigText = this.selectAnswerTextType;
    }
    return Observable.create(function (observer) {
      let reg = /<[^<>]+>/g;
      let value = control.value || '';
      if (isBigText) { // 是富文本
        value = control.value.replace(reg, '')
      }
      if (value.trim() == '') {
        if (isBigText && (control.value.indexOf('img') > -1 || control.value.indexOf('video') > -1)) {
          observer.next(null);
        } else {
          observer.next({ required: true });
        }
      } else if (value.length > 1000) {
        observer.next({ error: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };
  _submitForm = ($event, value) => {
    this.saveLoading = true;
    $event.preventDefault();
    this.formupbtn.click();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    if (this.validateUPForm.valid && this.validateForm.valid) {
      let upForm = this.validateUPForm.value;
      let answerList = [
        {
          answer: 0,
          isBigText: this.selectAnswerTextType,
          answerText: value[`answer`],
          isCorrect: 'Y',
        }
      ];

      let params = {
        answerList: [
          ...answerList
        ],
        knowledgeId: this.knowledgeId,
        question: {
          baseCode: this.baseCode,
          casual: this.selectTextType ? '' : value.casual,
          ...this.question,
          isBigText: this.selectTextType,
          clobCasual: this.selectTextType ? value.casual : '',
          queAnalysis: value.queAnalysis ,
          ...upForm,
          endTime: upForm.endTime && moment(upForm.endTime),
          startTime: upForm.startTime && moment(upForm.startTime),
        }
      }
      this.testQuestionService.addQuestion(params).subscribe(
        (data) => {
          this.saveLoading = false;
          this.returnFun.emit();
        },
        error => {
          this.saveLoading = false;
          this.nzMessageService.error(error);
        }
      );
    } else {
      this.nzMessageService.error('表单还有未通过的项!');
      this.saveLoading = false;
    }
  };
}