import { Location } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Examination } from '../../entity/examination';
import * as moment from 'moment';
import { UserGroup } from '../../../exam-paper/entity/user-group';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Observable } from 'rxjs/Observable';
import { ExamPaperService } from '../../../service/exam-paper.service';
import { ExaminationManagementService } from '../../../service/examination.service';
import { ExaminationService } from '../../service/examination.service';
import * as _ from 'lodash';
import { tipMessage } from 'app/account/entity/message-tip';
const { isArray } = _;

@Component({
    selector: 'spk-exam-message',
    templateUrl: './exam-message.component.html',
    styleUrls: ['./exam-message.component.scss']
})
export class ExamMessageComponent implements OnInit {
    @Input() examDetail: Examination;
    @Input() createOrEditor: boolean;
    @Input() submitLoading: boolean;
    @Output() doSubmit: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    selectPaper: boolean = false; // 弹出试卷列表页面
    platform = 'NORMAL';
    _searchForm: FormGroup;
    validateForm: FormGroup;
    selection: any[];
    switchList: any = {};
    _startDate;
    loading: boolean;
    _endDate;
    _startDate2;
    _endDate2;
    userGroup: UserGroup = new UserGroup();
    viewPaper: boolean = false;
    constructor(
        private fb: FormBuilder,
        private location: Location,
        private examPaperService: ExamPaperService,
        private examinationManagementService: ExaminationManagementService,
        private examinationService: ExaminationService
    ) { }

    ngOnInit() {
        this.loading = true;
        this.userGroup.id = this.examDetail.userGroupId;
        this.userGroup.name = this.examDetail.siteName || '请选择组织机构';
        this.validateForm = this.fb.group({
            paperName: [this.examDetail.paperName || ''],
            paperId: [this.examDetail.paperId || ''],
            userGroup: [this.userGroup || ''],
            userGroupId: [this.userGroup.id],
            etmCode: [this.examDetail.etmCode || 'KSSC'],
            examTime: [this.examDetail.examTime || 90],
            endTime: [this.examDetail.endTime || new Date(), [Validators.required]],
            onfocusCount: [this.examDetail.onfocusCount || -1],
            countmCode: [this.examDetail.countmCode || 'HG'],
            examType: ['EXAM'], // 两个值都要传
            examWh: ['TRAININGCLASS'], // 两个值都要传
            lowLine: [this.examDetail.lowLine || ''],
            examCount: [this.examDetail.examCount || 1],
            moreUser: [this.examDetail.moreUser || 'DISBLE'],
            isPutout: [this.examDetail.isPutout || false],
            examDesc: [this.examDetail.examDesc || '', [Validators.maxLength(500), this.trimCheck]],
            scoreDisplayTime: [this.examDetail.scoreDisplayTime || ''],
            answerDisplayTime: [this.examDetail.answerDisplayTime || ''],
            enrollStart: [this.examDetail.enrollStart || '', this.confirmStartTimeValidator],
            enrollEnd: [this.examDetail.enrollEnd || '', this.confirmEndTimeValidator],
            isUserInfo: [this.examDetail.isUserInfo || 'false'],
            isDeleted: [false],
            images: [this.examDetail.imageUrl || ''],
            examName: [this.examDetail.examName || '', [Validators.required, Validators.maxLength(50)], this.userNameAsyncValidator],
            startTime: [this.examDetail.startTime, [Validators.required, this.confirmStartDateValidator]],
            enterExamTime: [this.examDetail.enterExamTime, [Validators.required, this.confirmEndDateValidator]],
            offeringId: [this.examDetail.id],
            examWhId: [this.examDetail.id],
            isDistributed: [false],
            isPreGenerated: [false],
            isBM: []
        });
        // 考试表单的输入
        if (this.examDetail.id) {
            this.examinationService.getOffering(this.examDetail.id).subscribe(
                res => {
                    this.examDetail = res;
                    this.validateForm.patchValue(res);
                    if (this.validateForm.value.enrollStart) {
                        this.validateForm.get('isBM').setValue(true);
                    }
                    this.loading = false;
                },
                err => tipMessage(err)
            )
        } else {
            this.loading = false;
        }
        // 试卷列表的搜索框
        this._searchForm = this.fb.group({
            epName: [],
            createdBy: [],
            creatTimeStart: [],
            creatTimeEnd: [],
            epType: ['H'],
        });
    }
    onSubmit(event: Event, content) {
        event.preventDefault();
        content.userGroupId = this.validateForm.value.userGroup.id;
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        };
        if (this.validateForm.value.isBM) {
            console.log(this.validateForm.value.enrollStar, this.validateForm.value.enrollEnd);
            if (this.validateForm.value.enrollStart == null || this.validateForm.value.enrollEnd == null) {
                tipMessage('请完善考试信息！');
                this.submitLoading = false;
                return;
            }
            if (this.validateForm.controls.enrollEnd.value > this.validateForm.controls.endDate.value) {
                tipMessage('考试报名时间不能大于考试截止时间', '', 3000);
                this.validateForm.get('enrollEnd').setValue(null);
                this.submitLoading = false;
                return;
            }
            if (this.validateForm.controls.enrollStart.value > this.validateForm.controls.endDate.value) {
                tipMessage('考试报名时间不能大于考试截止时间', '', 4000);
                this.validateForm.get('enrollStart').setValue(null);
                this.submitLoading = false;
                return;
            }
        } else {
            this.validateForm.get('enrollStart').setValue('');
            this.validateForm.get('enrollEnd').setValue('');
        }
        console.log(this.validateForm);
        if (this.validateForm.valid) {
            this.doSubmit.emit({ originalEvent: event, value: content });
            console.log('messages content', content)
            this.submitLoading = false;
        } else {
            tipMessage('请完善考试信息！');
            this.submitLoading = false;
        };
    }
    // 显示预览试卷
    showViewPaper() {
        this.viewPaper = true;
    }
    doCancel(event) {
        this.cancel.emit({ originalEvent: event });
    }
    _submitForm($event, value) {
        $event.preventDefault();
        console.log(value);
        // this.switchList = value;
        // this.loadData();
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }
    // 返回到上个页面
    goBack() {
        this.location.back();
    }
    onUploadComplete(e) {
        // console.log(e);
        // tslint:disable-next-line:no-unused-expression
        this.validateForm && this.validateForm.get(`imageUrl`).setValue(e.relativePath);
        console.log(e.relativePath)
    }

    // 关闭模态框传入获取值
    handleCancel(event) {
        this.selectPaper = false;
    }

    // 选择提交考试试卷
    selectExam(obj) {
        // tslint:disable-next-line:no-unused-expression
        this.validateForm && this.validateForm.get(`paperId`).setValue(obj.epId);
        // tslint:disable-next-line:no-unused-expression
        this.validateForm && this.validateForm.get(`paperName`).setValue(obj.epName);
        this.selectPaper = false;
    }
    // 获取组织数据
    onUgSelectionChange(ugs) {
        ugs = ugs && isArray(ugs) ? ugs : (ugs ? [ugs] : []);
        let ug = ugs[0];
        this.userGroup = ug;
    }
    // 时间验证方法
    confirmStartDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const endTime = moment(controls[`enterExamTime`].value).unix();
            if (control.value) {
                if (endTime < moment(control.value).unix()) {
                    this.validateForm.get(`enterExamTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 3000);
                    return;
                }
            }
        }
    }
    // 时间验证方法
    confirmStartTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const endTime = moment(controls[`enrollEnd`].value).unix();
            const endDate = moment(controls[`enterExamTime`].value).unix();
            if (control.value) {
                if (endTime < moment(control.value).unix()) {
                    this.validateForm.get(`enrollEnd`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 5000);
                    return;
                }
                console.log(1, moment(control.value).unix(), 2, endDate);
                if (moment(control.value).unix() > endDate) {
                    console.log('true')
                }
            }
        }
    }
    // 时间验证方法
    confirmEndTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const startTime = moment(controls[`enrollStart`].value).unix();
            const endDate = moment(controls[`enterExamTime`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this.validateForm.get(`enrollStart`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 4000);
                    return;
                }
                if (moment(control.value).unix() > endDate) {
                    tipMessage('报名时间不能超过考试截止时间', '', 4000);
                    return;
                }
            }
        }
    }

    // 时间验证方法
    confirmEndDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const startTime = moment(controls[`startTime`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this.validateForm.get(`startTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 4000);
                    return;
                }
                if (controls.enrollEnd) {
                    if (moment(controls.enrollEnd.value).unix() > moment(control.value).unix()) {
                        this.validateForm.get(`enrollEnd`).setValue(null);
                        tipMessage('报名结束时间不能大于考试截止时间', '', 4000);
                        return
                    }
                }
                if (controls.enrollStart) {
                    if (moment(controls.enrollStart.value).unix() > moment(control.value).unix()) {
                        this.validateForm.get(`enrollStart`).setValue(null);
                        tipMessage('报名开始时间不能大于考试截止时间', '', 4000);
                        return
                    }
                }
            }
        }
    }
    userNameAsyncValidator = (control: FormControl): any => {
        return Observable.create(function (observer) {
            if (control.value.trim() == '') {
                observer.next({ error: true, required: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        });
    };
    enrollStartControl() {
        // tslint:disable-next-line:max-line-length
        if (this.validateForm.controls.enrollStart.value && this.validateForm.controls.enrollStart.value < this.validateForm.controls.endDate.value) {
            return 'success';
        } else {
            return 'error';
        }
    }
    enrollEndControl() {
        // tslint:disable-next-line:max-line-length
        if (this.validateForm.controls.enrollEnd.value && this.validateForm.controls.enrollEnd.value < this.validateForm.controls.endDate.value) {
            return 'success';
        } else {
            return 'error';
        }
    }
    trimCheck = (control: FormControl): { [s: string]: boolean } => {
        if (control.value && !control.value.trim()) {
            return { confirm: true, error: true };
        }
    }
}
