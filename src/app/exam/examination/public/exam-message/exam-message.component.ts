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
        this.userGroup.name = this.examDetail.userGroupName || '请选择组织机构';
        this.validateForm = this.fb.group({
            userGroup: [this.userGroup || ''],
            name: [this.examDetail.name || '', [Validators.required, Validators.maxLength(50)], this.userNameAsyncValidator],
            description: [this.examDetail.description || '', [Validators.maxLength(500), this.trimCheck]],
            imageUrl: [this.examDetail.imageUrl || ''],
            type: [this.examDetail.type || 'EXAM', [Validators.required]],
            isPublished: [this.examDetail.isPublished || false],
            startDate: [this.examDetail.startDate || new Date(), [Validators.required, this.confirmStartDateValidator]],
            endDate: [this.examDetail.endDate || '', [Validators.required, this.confirmEndDateValidator]],
            enrollStart: [this.examDetail.enrollStart || '', this.confirmStartTimeValidator],
            enrollEnd: [this.examDetail.enrollEnd || '', this.confirmEndTimeValidator],
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
                tipMessage('考试报名时间不能大于考试截止时间', '', 4000);
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
            content.enrollStart = '';
            content.enrollEnd = '';
        }
        console.log(this.validateForm);
        if (this.validateForm.valid) {
            this.doSubmit.emit({ originalEvent: event, value: content });
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
    changeUploadImage(e) {
        console.log('e', e)
        let fl1 = e.target.value;
        // tslint:disable-next-line:max-line-length
        if (!(fl1.substr(fl1.length - 4) == '.jpg' || fl1.substr(fl1.length - 5) == '.jpeg' || fl1.substr(fl1.length - 4) == '.gif' || fl1.substr(fl1.length - 4) == '.png')) {
            tipMessage('选择的不是图片文件！');
            console.log('e.preventDefault', e.preventDefaul)
            console.log('e.stopPropagation', e.stopPropagation)
            // tslint:disable-next-line:no-unused-expression
            e.preventDefault && e.preventDefault();
            // tslint:disable-next-line:no-unused-expression
            e.stopPropagation && e.stopPropagation();
        }
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
            const endTime = moment(controls[`endDate`].value).unix();
            if (control.value) {
                if (endTime < moment(control.value).unix()) {
                    this.validateForm.get(`endDate`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 4000);
                    return;
                }
            }
        }
    }
    // 时间验证方法
    confirmStartTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        console.log(control);
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const endTime = moment(controls[`enrollEnd`].value).unix();
            const endDate = moment(controls[`endDate`].value).unix();
            if (control.value) {
                if (endTime < moment(control.value).unix()) {
                    this.validateForm.get(`enrollEnd`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 4000);
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
            const endDate = moment(controls[`endDate`].value).unix();
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
            const startTime = moment(controls[`startDate`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this.validateForm.get(`startDate`).setValue(null);
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
