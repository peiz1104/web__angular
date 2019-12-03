/*
 * @Author: mozhengqian
 * @Date: 2017-11-12 13:55:33
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-02 15:52:37
 */
import { Component, OnInit, Input, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'spk-test-choice-questions-edit',
  templateUrl: './test-choice-questions-edit.component.html',
  styleUrls: ['./test-choice-questions-edit.component.scss']
})

export class TestChoiceQuestionsEditComponent implements OnInit {
  @Input() data: any = {};
  @Input() validateUPForm: FormGroup;
  @Input() formupbtn: any;
  @Output() returnFun: any = new EventEmitter<string>();
  validateForm: FormGroup;
  checkBoxList: any[] = [];
  saveLoading: boolean = false; // 保存loading
  baseCode: string = '';
  userGroupId: string = '';
  typeName: string = '选择题';
  difficult: any;
  questionType: any;
  queId: any = '';
  isBigClick: boolean = false;
  bigTextStuts: any[] = [];
  answerList: any = [// 选项集合
  ];
  checkboxbool: boolean = false;
  selectTextType: boolean = false; // 是否使用富文本
  selectTextAnalysisType: boolean = true; // 是否使用富文本
  synVisible: boolean = false;
  isPaper: any;
  parentId: number;
  bool: boolean = false;
  question: any = {
    "isAvail": true,                // 类型：Boolean  必有字段  备注：是否发布 默认发布true
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
    // this.returnFun.emit({originalEvent: event, value: this.xuhao});
    this.baseCode = this.data.baseCode;
    this.typeName = this.data.typeName;
    this.queId = this.activatedRoute.snapshot.params['queId'];
    this.isPaper = this.activatedRoute.snapshot.params['isPaper'] == 'true';
    this.answerList = this.data.answerList;
    console.log(this.data);
    this.selectTextType = this.data.isBigText == 'true' || this.data.isBigText == true;
    this.parentId = this.activatedRoute.snapshot.params['parentId'] || -1;
    this.bool = this.activatedRoute.snapshot.params['isZt'] ? false : true;
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
        return this.validateForm && this.validateForm.controls['clobCasual'].value;
      } else {
        return this.validateForm && this.validateForm.controls['casual'].value;
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
  checkMaxLength = (index, control: FormControl): any => {
    let isBigText = this.selectTextType;
    if (index !== null) {
      isBigText = this.bigTextStuts[index];
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
    let radioindex = null;
    this.answerList.forEach((answer, index) => {
      this.bigTextStuts[index] = answer.isBigText;
      if (answer.isCorrect == 'Y') {
        radioindex = index;
      }
      if (this.validateForm && this.validateForm.controls[`answer${index}`]) {
        this.validateForm.get(`answer${index}`).setValue(answer.validate && answer.validate[0] || answer.answerText);
      } else {
        // tslint:disable-next-line:max-line-length
        params[`answer${index}`] = answer.validate || [answer.answerText, [Validators.required], this.checkMaxLength.bind(null, index)]; // 选项数据初始化
      }
      if (this.baseCode == 'DUOX') {
        this.checkBoxList[index] = this.checkBoxList[index] === undefined ? answer.isCorrect == 'Y' : this.checkBoxList[index];
      }
    });
    this.setDefalutForm();
    if (this.baseCode == 'DANX') {
      let indexvalue = this.validateForm && this.validateForm.controls['radio_index'].value;
      let radio_index = radioindex;
      if (indexvalue || indexvalue === 0) {
        radio_index = indexvalue;
      }
      params[`radio_index`] = [radio_index, [Validators.required]];
    }
    if (flag) {
      params = {
        ...this.validateForm.controls,
        ...params
      };
    } else {
      params = {
        casual: [this.getCasual(), [Validators.required], this.checkMaxLength.bind(null, null)],
        isBigText: [this.selectTextType,
          [Validators.required]],
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
    // let isTrue = this.isValid();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    if (this.validateUPForm.valid && this.validateForm.valid && !this.validatorCheckBox(value)) {
      let upForm = this.validateUPForm.value;
      let answerList = [
      ];
      this.answerList.forEach((answer, index) => {
        let bool = false;
        if (this.baseCode == 'DANX') {
          bool = value.radio_index == index;
        } else if (this.baseCode == 'DUOX') {
          bool = this.checkBoxList[index];
        }
        answerList[index] = {
          // answerId: answer.answerId,
          queId: answer.queId,
          queVersion: answer.queVersion,
          answer: index,
          isBigText: !!this.bigTextStuts[index],
          answerText: value[`answer${index}`],
          isCorrect: bool ? 'Y' : 'N',
        };
        if (this.isPaper) {
          answerList[index] = {
            ...answerList[index],
            answerId: answer.answerId,
            examQueId: answer.examQueId || this.data.queId
          }
        }
      });
      let params: any = {
        answerList: [
          ...answerList
        ],
        qbId: upForm.qbId
      }
      if (this.isPaper) {
        params = {
          ...this.data,
          ...params,
          queId: this.queId,
          clobCasual: this.selectTextType ? value.casual : '',
          userGroupId: this.data.userGroupId,
          baseCode: this.baseCode,
          casual: this.selectTextType ? '' : value.casual,
          queAnalysis: value.queAnalysis,
          ...this.question,
          isBigText: this.selectTextType,
          ...upForm,
          answerLength: upForm.answerTime,
          queScore: upForm.score,
          endTime: upForm.endTime && moment(upForm.endTime),
          startTime: upForm.startTime && moment(upForm.startTime),
        }
        this.testQuestionService.questionPaperUpdate(params).subscribe(
          (data) => {
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
            clobCasual: this.selectTextType ? value.casual : '',
            userGroupId: this.data.userGroupId,
            baseCode: this.baseCode,
            casual: this.selectTextType ? '' : value.casual,
            queAnalysis: value.queAnalysis,
            ...this.question,
            isBigText: this.selectTextType,
            ...upForm,
            endTime: upForm.endTime && moment(upForm.endTime),
            startTime: upForm.startTime && moment(upForm.startTime),
          }
        };
        this.testQuestionService.questionUpdate(params).subscribe(
          (data) => {
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
      this.nzMessageService.error('表单还有未通过的项!');
      this.saveLoading = false;
    }
  };
  validatorCheckBox(value) {
    if (this.baseCode == 'DUOX') {
      let checkboxboolLength = 0;
      this.checkBoxList.forEach(item => {
        // tslint:disable-next-line:no-unused-expression
        item && checkboxboolLength++;
      });
      if (checkboxboolLength < 2) {
        this.checkboxbool = true;
        return true;
      } else {
        this.checkboxbool = false;
      }
    }
    return false;
  }
  resetCheckboxBool = () => {
    this.checkboxbool = false;
  }
  setOptionInit(id?) {
    if (this.validateForm) {
      // tslint:disable-next-line:forin
      let oldData = [];
      this.answerList.forEach((answer, index) => {
        oldData.push({
          ...answer,
          validate: [this.validateForm.get(`answer${index}`).value, [Validators.required], this.checkMaxLength.bind(null, index)]
        });
      });
      if (id || id === 0) {
        oldData.splice(id, 1);
        // this.bigTextStuts.splice(id, 1);
        if (this.baseCode == "DUOX") {
          this.checkBoxList.splice(id, 1);
        }
      }
      console.log('删除:', id, oldData);
      this.answerList = oldData;
    }
  }
  radioChange($event) {
    // tslint:disable-next-line:no-unused-expression
    this.validateForm && this.validateForm.get('radio_index') && this.validateForm.get('radio_index').setValue($event);
  }
  checkChange($event, i) {
    this.checkBoxList[i] = $event.target.checked;
  }
  // 切换选项富文本模式
  changeBigText(key) {
    console.log('选项切换富文本')
    this.bigTextStuts[key] = !this.bigTextStuts[key];
    // tslint:disable-next-line:no-unused-expression
    this.isBigClick && this.validateForm && this.validateForm.get(`answer${key}`) && this.validateForm.get(`answer${key}`).setValue('');
  }
  // 题干切换富文本
  changeCausBigText() {
    console.log('切换题干富文本:', this.isBigClick);
    if (this.isBigClick && this.validateForm && this.validateForm.get('casual')) {
      this.validateForm.get('casual').setValue('');
    }
  }
  changeCausBigTextAnalysis() {
    console.log('切换解析富文本:', this.isBigClick);
    if (this.isBigClick && this.validateForm && this.validateForm.get('queAnalysis')) {
      this.validateForm.get('queAnalysis').setValue('');
    }
  }
  adOption() {
    this.setOptionInit();
    this.answerList.push({
      validate: ['', [Validators.required], this.checkMaxLength.bind(null, this.answerList.length)]
    });
    this.setFormInit(true);
    // tslint:disable-next-line:no-unused-expression
    // this.validateForm && this.validateForm.get('radio_index') && this.validateForm.get('radio_index').setValue('');
  }
  deleteOption(id) {
    if (this.baseCode == 'DANX') {
      let index = this.validateForm.controls.radio_index && this.validateForm.controls.radio_index.value;
      if (id < index) {
        index--;
      } else if (id == index) {
        index = null;
      }
      // tslint:disable-next-line:no-unused-expression
      this.validateForm.get('radio_index') && this.validateForm.get('radio_index').setValue(index);
    }
    this.setOptionInit(id);
    this.setFormInit(true);
    // tslint:disable-next-line:no-unused-expression
    // this.validateForm && this.validateForm.get('radio_index') && this.validateForm.get('radio_index').setValue('');
  }
}
