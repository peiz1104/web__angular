
/*
 * @Author: mozhengqian
 * @Date: 2017-11-08 14:02:58
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-11-21 14:54:41
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';

import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'spk-test-shortanswer-questions-edit',
    templateUrl: './test-shortanswer-questions-edit.component.html',
    styleUrls: ['./test-shortanswer-questions-edit.component.scss']
})

export class TestShortanswerQuestionsEditComponent implements OnInit {
    @Input() data: any = {};
    @Input() validateUPForm: FormGroup;
    @Input() formupbtn: any;
    @Output() returnFun: any = new EventEmitter<string>();
    validateForm: FormGroup;
    saveLoading: boolean = false; // 保存loading
    baseCode: string = '';
    userGroupId: string = '';
    isBigClick: boolean = false;
    typeName: string = '';
    difficult: any;
    questionType: any;
    checkboxbool: boolean = false;
    queId: any = '';
    parentId: number;
    synVisible: boolean = false;
    isPaper: any;
    selectTextType: boolean = false; // 是否使用富文本
    selectTextAnalysisType: boolean = true; // 是否使用富文本
    bool: boolean = false;
    answerIsBig: boolean = false;
    question: any = {
        "isAvail": true,                // 类型：Boolean  必有字段  备注：是否发布 默认发布true
        "isDeleted": false,                // 类型：Boolean  必有字段  备注：是否删除 默认false
    }
    constructor(
        private testQuestionService: TestQuestionService,
        public activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private nzMessageService: NzMessageService,
        private nzModalService: NzModalService,
        private router: Router
    ) { }

    ngOnInit() {
        this.baseCode = this.data.baseCode;
        this.typeName = this.data.typeName;
        this.selectTextType = this.data.isBigText == 'true' || this.data.isBigText == true;
        this.queId = this.activatedRoute.snapshot.params['queId'];
        this.parentId = this.activatedRoute.snapshot.params['parentId'] || -1;
        this.isPaper = this.activatedRoute.snapshot.params['isPaper'] == 'true';
        this.userGroupId = this.activatedRoute.snapshot.params['userGroupId'];
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
    checkMaxLength = (type, control: FormControl): any => {
        let isBigText = this.selectTextType;
        if (type) {
            isBigText = this.answerIsBig;
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
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        });
    };
    setFormInit() {
        let params = {
            casual: [this.getCasual(), [Validators.required], this.checkMaxLength.bind(null, false)],
            isBigText: [this.selectTextType, [Validators.required]],
            queAnalysis: [this.getCasual2(), [Validators.maxLength(300)]],
            isBigTextAnalysis: [this.selectTextAnalysisType,
            [Validators.required]],
            // tslint:disable-next-line:max-line-length
            answer: [this.data.answerList[0] && this.data.answerList[0].answerText, [Validators.required], this.checkMaxLength.bind(null, true)],
        };
        this.answerIsBig = this.data.answerList[0] && this.data.answerList[0].isBigText;
        this.validateForm = this.fb.group(params);
        setTimeout(() => {
            this.isBigClick = true;
        }, 0);
    }
    changeAnswerIsBig() {
        this.answerIsBig = !this.answerIsBig;
        if (this.isBigClick && this.validateForm && this.validateForm.get('answer')) {
            this.validateForm.get('answer').setValue('');
        }
    }
    // 题干切换富文本
    changeCausBigText() {
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
    _submitForm = ($event, value, call?: Function) => {
        this.saveLoading = true;
        // tslint:disable-next-line:no-unused-expression
        $event && $event.preventDefault && $event.preventDefault();
        this.formupbtn.click();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        if (this.validateUPForm.valid && this.validateForm.valid) {
            let upForm = this.validateUPForm.value;
            let answervalue: any = {
                queId: this.data.answerList[0] && this.data.answerList[0].queId,
                queVersion: this.data.answerList[0] && this.data.answerList[0].queVersion,
                isBigText: this.answerIsBig,
                answer: 0,
                answerText: value[`answer`],
                isCorrect: 'Y',
            };
            if (this.isPaper) {
                answervalue = {
                    ...answervalue,
                    answerId: this.data.answerList[0] && this.data.answerList[0].answerId,
                    examQueId: this.data.answerList[0] && this.data.answerList[0].examQueId || this.data.queId
                };
            }
            let answerList = [
                answervalue
            ];
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
                    ...this.question,
                    isBigText: this.selectTextType,
                    queAnalysis: value.queAnalysis,
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
                        ...this.question,
                        isBigText: this.selectTextType,
                        queAnalysis: value.queAnalysis,
                        ...upForm,
                        endTime: upForm.endTime && moment(upForm.endTime),
                        startTime: upForm.startTime && moment(upForm.startTime),
                    }
                }
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
}
