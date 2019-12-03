import { Location } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Examination } from '../../entity/examination';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CuiPagination } from 'console-ui-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { ExaminationManagementService } from 'app/exam/service/examination.service';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { ExaminationService } from 'app/exam/exam-course/service/examination.service';

import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-exam-form',
    templateUrl: './exam-form.component.html',
    styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {

    @Input() exam: Examination;
    @Input() isCreate: boolean;
    @Input() submitLoading: boolean;
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    examDetail: Examination = new Examination();
    _searchForm: FormGroup;
    validateForm: FormGroup;
    selection: any[];
    switchList: any = {};
    params: any;
    // userGroup: UserGroup = new UserGroup();
    viewPaper: boolean = false;
    paperListLoading: boolean;
    selectPaper: boolean = false;
    pagination: CuiPagination;
    spinning: boolean = true;
    columnsData: any;
    isSave: boolean = false;
    paperDisabled: boolean;
    score: number = 0;  //  试卷总分
    columns: any = [
        {
            title: '试卷名称', tpl: 'epName', styleClass: 'text-center',
            style: { 'max-width': '200px', width: '200px', 'over-flow': 'hiden' }
        },
        { title: '组卷方式', tpl: 'titleCode', styleClass: 'text-center' },
        { title: '限制分值', tpl: 'sumScore', styleClass: 'text-center' },
        { title: '试卷实际分值', data: 'examScore', styleClass: 'text-center' },
        { title: '试卷类型', tpl: 'epType', styleClass: 'text-center' },
        { title: '创建人名称', data: 'createdStrName', styleClass: 'text-center' },
        { title: '操作', tpl: 'epid', styleClass: 'text-center' }
    ];
    moreUserData: any;
    countmCodeData: any;
    etmCodeData: any;
    managerGroup: any = {};
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private location: Location,
        private examPaperService: ExamPaperService,
        private examinationManagementService: ExaminationManagementService,
        private examinationService: ExaminationService,
        private router: Router,
        private confirmServ: NzModalService
    ) {
        this.route.data.subscribe((data: { targetInfo }) => {
            console.log(data.targetInfo);
            this.managerGroup.name = data.targetInfo.target.userGroupName;
            this.managerGroup.id = data.targetInfo.target.userGroupId
        });
    }

    ngOnInit() {
        // 异步加载下拉列表数据
        // 学员继续考试生成码-MORE_USER
        this.examinationService.getDictionaries({ dicType: 'MORE_USER' }).subscribe(
            data => {
                this.moreUserData = data.map(it => {
                    return { value: it.dicCode, label: it.dicName }
                })
                if (this.validateForm.value.moreUser == '') {
                    this.validateForm.get('moreUser').setValue(this.moreUserData[0].value);
                }
            },
            err => {
                tipMessage(err);
            }
        )
        // 学员计分方式
        this.examinationService.getDictionaries({ dicType: 'COUNT_METHOD' }).subscribe(
            data => {
                this.countmCodeData = data.map(it => {
                    return { value: it.dicCode, label: it.dicName }
                })
                if (this.validateForm.value.countmCode == '') {
                    this.validateForm.get('countmCode').setValue(this.countmCodeData[0].value);
                }
            }, err => {
                tipMessage(err);
            }
        )
        // 考试计时方式
        this.examinationService.getDictionaries({ dicType: 'TIME_MEANS' }).subscribe(
            data => {
                this.etmCodeData = data.map(it => {
                    return { value: it.dicCode, label: it.dicName }
                })
                if (this.validateForm.value.etmCode == '') {
                    this.validateForm.get('etmCode').setValue(this.etmCodeData[0].value);
                }
            }, err => {
                tipMessage(err);
            }
        )
        this._searchForm = this.fb.group({
            epName: [],
            userGroup: [this.managerGroup || ''],
        });
        this.switchList.userGroupId = this.managerGroup.id;

        this.initForm();

        this.spinning = false;
    }

    initForm() {
        this.examDetail = this.exam || new Examination();
        this.validateForm = this.fb.group({
            paperName: [this.examDetail.paperName || '', [Validators.required]],
            paperId: [this.examDetail.paperId || '', [Validators.required]],
            userGroupId: [this.examDetail.userGroupId || ''],
            etmCode: [this.examDetail.etmCode || 'KSSC'],
            examTime: [this.examDetail.examTime || 90, [Validators.required, this.number1Control]],
            endTime: [this.examDetail.endTime || new Date(), [Validators.required]],
            onfocusCount: [this.examDetail.onfocusCount || -1, [Validators.required, this.number3Control]],
            countmCode: [this.examDetail.countmCode || 'HG'],
            examType: ['EXAM'], // 两个值都要传
            examWh: ['COURSE'], // 两个值都要传
            lowLine: [this.examDetail.lowLine || '', [Validators.required]],
            examCount: [this.examDetail.examCount || 1, [Validators.required, this.number2Control]],
            moreUser: [this.examDetail.moreUser || 'DISBLE'],
            isPutout: [this.examDetail.isPublished || false],
            examDesc: [this.examDetail.description || '', [Validators.maxLength(500), this.trimCheck]],
            scoreDisplayTime: [this.examDetail.scoreDisplayTime || '', this._confirmEndTimeValidator],
            answerDisplayTime: [this.examDetail.answerDisplayTime || '', this.confirmEndTimeValidator],
            enrollStart: [this.examDetail.enrollStart || ''],
            enrollEnd: [this.examDetail.enrollEnd || ''],
            isUserInfo: [this.examDetail.isUserInfo || 'false'],
            isDeleted: [false],
            images: [this.examDetail.imageUrl || ''],
            examName: [this.examDetail.name || '', [Validators.required, Validators.maxLength(50)], this.userNameAsyncValidator],
            startTime: [this.examDetail.startDate, [Validators.required, this.startTimeValidator]],
            enterExamTime: [this.examDetail.endDate, [Validators.required, this.enterExamTimeValidator]],
            offeringId: '',
            examWhId: [this.examDetail.id],
            isDistributed: [false],
            isPreGenerated: [false],
        });
        if (this.examDetail.examId) {
            this.examinationService.getExamDetail(this.examDetail.examId).subscribe(
                data => {
                    this.validateForm.patchValue(data);
                    this.examDetail.paperId = data.paperId;
                    this.spinning = false;
                    let params = {
                        epId: this.examDetail.paperId
                    }
                    if (this.examDetail.paperId) {
                        this.examinationService.getScore(params).subscribe(
                            score => {
                                this.score = score;
                            },
                            err => {
                                tipMessage(err);
                            }
                        )
                    } else {
                        this.validateForm.value.lowLine = this.examDetail.lowLine;
                    }
                },
                err => tipMessage(err)
            )
            this.examinationService.isUserJoin({ examId: this.examDetail.examId }).subscribe(
                res => {
                    console.log(res, 'user');
                    if (res > 0) {
                        this.paperDisabled = true;
                    } else {
                        this.paperDisabled = false;
                    }
                },
                err => {
                    tipMessage(err);
                }
            )
        }
    }

    canDeactivate(): Promise<boolean> {
        return new Promise((resolve) => {
            this.confirmServ.confirm({
                content: '是否确认离开此页面',
                zIndex: 1003,
                onOk: () => {
                    console.log('确认离开');
                    resolve(true)
                },
                onCancel: () => {
                    resolve(false);
                }
            })
        });
    }

    // 试卷列表获取数据
    loadData(page?: CuiPagination) {
        this.paperListLoading = true;
        this.pagination = page;
        let params = {
            ...this.switchList,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            isPutout: true
            // sort: page && page.sort ? page.sort : null
        };
        this.examPaperService.getPaperList(params).subscribe(
            data => {
                this.pagination = data;
                this.columnsData = data['content'];
                this.paperListLoading = false;
            },
            err => tipMessage(err)
        );
    }

    onSubmit(event: Event, content) {
        this.submitLoading = true;
        event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        };

        if (!this.validateForm.valid) {
            tipMessage('请先完善考试信息！');
            this.submitLoading = false;
            return;
        }
        if (this.score < this.validateForm.value.lowLine) {
            this.validateForm.get(`lowLine`).setValue(null);
            tipMessage('及格分不能大于试卷总分');
            this.submitLoading = false;
            return;
        }

        if (this.validateForm.controls.enrollEnd.value > this.validateForm.controls.enterExamTime.value) {
            tipMessage('考试报名截止时间不能大于考试截止时间', '', 4000);
            this.validateForm.get('enrollEnd').setValue(null);
            this.submitLoading = false;
            return;
        }
        if (this.validateForm.controls.enrollStart.value > this.validateForm.controls.enterExamTime.value) {
            tipMessage('考试报名开始时间不能大于考试截止时间', '', 4000);
            this.validateForm.get('enrollStart').setValue(null);
            this.submitLoading = false;
            return;
        }

        if (this.examDetail.paperId && this.examDetail.paperId !== this.validateForm.value.paperId) {
            let req = {
                examId: this.examDetail.examId
            }
            this.examinationService.check_pattern().subscribe(
                data => {
                    if (data.examPattern == 'chinalife') {
                        this.examinationService.clearnMark({ examId: this.examDetail.examId }).subscribe()
                    } else {
                        this.examinationService.deletePJinfo({ examId: this.examDetail.examId }).subscribe()
                    }
                }
            )
        }
        this.save.emit({ originalEvent: event, value: this.validateForm.value });
    }

    // 显示预览试卷
    showViewPaper() {
        if (this.validateForm.value.paperId) {
            this.params = {
                examPaperId: this.validateForm.value.paperId
            }
            this.viewPaper = true;
        } else {
            tipMessage('请先选择试卷')
        }
    }

    _submitForm($event, value) {
        $event.preventDefault();
        console.log(value);
        this.switchList = value;
        this.switchList.userGroupId = value.userGroup && value.userGroup.id;
        // this.switchList.userGroup = null;
        this.loadData();
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

    // 选择试卷选定组织
    selectGroup(e) {
        console.log(e);
        this.switchList = {};
        this._searchForm.get(`epName`).setValue(null);
        // tslint:disable-next-line:no-unused-expression
        if (e.length > 0) { this.switchList.userGroupId = e[0].id; }
        this.loadData();
    }

    // 选择打开试卷列表
    openSelectPaper() {
        this.loadData();
        this.selectPaper = true;
    }

    // 关闭模态框传入获取值
    handleCancel(event) {
        this.selectPaper = false;
    }

    // 选择提交考试试卷
    selectExam(obj) {
        // tslint:disable-next-line:no-unused-expression
        this.validateForm && this.validateForm.get(`paperId`).setValue(obj.epId);
        let params = {
            epId: obj.epId
        }
        this.examinationService.getScore(params).subscribe(
            data => {
                this.score = data;
            },
            err => tipMessage(err)
        )
        // tslint:disable-next-line:no-unused-expression
        this.validateForm && this.validateForm.get(`paperName`).setValue(obj.epName);
        this.selectPaper = false;
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
    trimCheck = (control: FormControl): { [s: string]: boolean } => {
        if (control.value && !control.value.trim()) {
            return { confirm: true, error: true };
        }
    }
    // 时间验证方法
    confirmEndTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const startTime = moment(controls[`startTime`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this.validateForm.get(`answerDisplayTime`).setValue(null);
                    tipMessage('回顾考试时间不能小于考试开始时间', '', 4000);
                    return;
                }
            }
        }
    }

    _confirmEndTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const startTime = moment(controls[`startTime`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this.validateForm.get(`scoreDisplayTime`).setValue(null);
                    tipMessage('成绩发布时间不能小于考试开始时间', '', 4000);
                    return;
                }
            }
        }
    }

    number1Control = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;

        if (controls) {
            if (control.value) {
                if (this.isDot(control.value)) {
                    tipMessage('不能输入小数');
                    this.validateForm.get(`examTime`).setValue(null);
                    return { confirm: true, error: true };
                }
                if (control.value <= 0) {
                    tipMessage('考试时间不能小于等于0');
                    this.validateForm.get(`examTime`).setValue(null);
                    return { confirm: true, error: true };
                }
                if (control.value.toString().length > 3) {
                    tipMessage('不能超过三位数');
                    this.validateForm.get(`examTime`).setValue('');
                    return { confirm: true, error: true };
                }
            }
        }
    }

    number2Control = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;

        if (controls) {
            if (control.value) {
                if (this.isDot(control.value)) {
                    tipMessage('不能输入小数');
                    this.validateForm.get(`examCount`).setValue(null);
                    return { confirm: true, error: true };
                }
                if (control.value < 0) {
                    tipMessage('考试次数不能小于0');
                    this.validateForm.get(`examCount`).setValue(null);
                    return { confirm: true, error: true };
                }
                // tslint:disable-next-line:max-line-length
                if ((control.value < 0 && control.value.toString().length > 4) || (control.value > 0 && control.value.toString().length > 3)) {
                    tipMessage('不能超过三位数');
                    this.validateForm.get(`examCount`).setValue(null);
                    return { confirm: true, error: true };
                }
            }

        }
    }

    number3Control = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;

        if (controls) {
            if (control.value) {
                if (this.isDot(control.value)) {
                    tipMessage('不能输入小数');
                    this.validateForm.get(`onfocusCount`).setValue(null);
                    return { confirm: true, error: true };
                }
                if (control.value < -1) {
                    tipMessage('切屏次数不能小于-1');
                    this.validateForm.get(`onfocusCount`).setValue(null);
                    return { confirm: true, error: true };
                }
                // tslint:disable-next-line:max-line-length
                if ((control.value < 0 && control.value.toString().length > 4) || (control.value > 0 && control.value.toString().length > 3)) {
                    tipMessage('不能超过三位数');
                    this.validateForm.get(`onfocusCount`).setValue(null);
                    return { confirm: true, error: true };
                }
            }

        }
    }

    isDot(num) {
        // console.log(num + '');
        let result = (num.toString()).indexOf(".");
        if (result != -1) {
            return true;
        } else {
            return false;
        }
    }

    // 时间验证方法
    startTimeValidator = (control: FormControl): { [s: string]: boolean } => {
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
    enterExamTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const startTime = moment(controls[`startTime`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this.validateForm.get(`startTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 3000);
                    return;
                }
            }
        }
    }
    onUploadComplete(e) {
        // console.log(e);
        // tslint:disable-next-line:no-unused-expression
        this.validateForm && this.validateForm.get(`images`).setValue(e.relativePath);
    }
}
