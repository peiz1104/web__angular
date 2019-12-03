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
    selector: 'spk-test-judgment-questions-edit',
    templateUrl: './test-judgment-questions-edit.component.html',
    styleUrls: ['./test-judgment-questions-edit.component.scss']
})
export class TestJudgmentQuestionsEditComponent implements OnInit {
    @Input() data: any = {};
    @Input() validateUPForm: FormGroup;
    @Input() formupbtn: any;
    @Output() returnFun: any = new EventEmitter<string>();
    validateForm: FormGroup;
    baseCode: string = '';
    userGroupId: string = '';
    typeName: string = '';
    difficult: any;
    questionType: any;
    queId: any = '';
    parentId: number;
    synVisible: boolean = false;
    isPaper: any;
    isBigClick: boolean = false;
    saveLoading: boolean = false; // 保存loading
    selectTextType: boolean = false; // 是否使用富文本
    selectTextAnalysisType: boolean = true; // 是否使用富文本
    bool: boolean = false;
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
        this.userGroupId = this.activatedRoute.snapshot.params['userGroupId'];
        this.isPaper = this.activatedRoute.snapshot.params['isPaper'] == 'true';
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
    checkMaxLength = (control: FormControl): any => {
        let isBigText = this.selectTextType;
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
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        });
    };
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
    setFormInit() {
        let params = {
            casual: [this.getCasual(), [Validators.required], this.checkMaxLength],
            isBigText: [this.selectTextType, [Validators.required]],
            queAnalysis: [this.getCasual2(), [Validators.maxLength(300)]],
            isBigTextAnalysis: [this.selectTextAnalysisType,
            [Validators.required]],
            radio_index: [this.data.answerList[0] && this.data.answerList[0].answerText == 'yes', [Validators.required]],
        };
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
        if (this.validateUPForm.valid && this.validateForm.valid) {
            let upForm = this.validateUPForm.value;
            let answerObj: any = {
                queId: this.data.answerList[0] && this.data.answerList[0].queId,
                queVersion: this.data.answerList[0] && this.data.answerList[0].queVersion,
                answer: 0,
                answerText: value.radio_index ? 'yes' : 'no',
                isCorrect: 'Y'
            };
            if (this.isPaper) {
                answerObj = {
                    ...answerObj,
                    answerId: this.data.answerList[0] && this.data.answerList[0].answerId,
                    examQueId: this.data.answerList[0] && this.data.answerList[0].examQueId || this.data.examQueId
                };
            }
            let answerList = [answerObj];

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
                        clobCasual: this.selectTextType ? value.casual : '', //  this.data.clobCasual,
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
