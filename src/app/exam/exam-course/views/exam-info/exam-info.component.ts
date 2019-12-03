import { NzModalService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Examination } from '../../entity/examination';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { UserGroup } from '../../../exam-paper/entity/user-group';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { ExamPaperService } from '../../../service/exam-paper.service';
import { ExaminationManagementService } from '../../../service/examination.service';
import { ExaminationService } from '../../service/examination.service'
import * as _ from 'lodash';
import { error } from 'util';
import { Observable } from 'rxjs/Observable';
import { resolve4 } from 'dns';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { tipMessage } from 'app/account/entity/message-tip';
const { isArray } = _;
@Component({
    selector: 'spk-exam-info',
    templateUrl: './exam-info.component.html',
    styleUrls: ['./exam-info.component.scss']
})
export class ExamInfoComponent implements OnInit {
    examDetail: Examination = new Examination();
    _searchForm: FormGroup;
    validateForm: FormGroup;
    selection: any[];
    switchList: any = {};
    params: any;
    userGroup: UserGroup = new UserGroup();
    viewPaper: boolean = false;
    paperListLoading: boolean;
    selectPaper: boolean = false;
    pagination: CuiPagination;
    spinning: boolean = true;
    submitLoading: boolean = false;
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
        { title: '限制分值', data: 'sumScore', styleClass: 'text-center' },
        { title: '试卷实际分值', data: 'examScore', styleClass: 'text-center' },
        { title: '创建人名称', data: 'createdStrName', styleClass: 'text-center' },
        { title: '操作', tpl: 'epid', styleClass: 'text-center' }
    ];
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private location: Location,
        private examPaperService: ExamPaperService,
        private examinationManagementService: ExaminationManagementService,
        private examinationService: ExaminationService,
        private router: Router,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        // 考试表单的输入
        this.route.data.subscribe(
            (obj: { examination: any }) => {
                console.log(obj);
                // this.createOrEditor = obj.examination ? false : true;
                this.examDetail = obj.examination;
                // 试卷列表的搜索框
                let userGroup = { id: this.examDetail.userGroupId, name: this.examDetail.userGroupName }
                this._searchForm = this.fb.group({
                    epName: [],
                    userGroup: [userGroup || ''],
                });
                this.switchList.userGroupId = this.examDetail.userGroupId;
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
                    examWh: ['TRAININGCLASS'], // 两个值都要传
                    lowLine: [this.examDetail.lowLine || '', [Validators.required]],
                    examCount: [this.examDetail.examCount || 1, [Validators.required, this.number2Control]],
                    moreUser: [this.examDetail.moreUser || 'DISBLE'],
                    isPutout: [this.examDetail.isPublished || false],
                    examDesc: [this.examDetail.description || ''],
                    scoreDisplayTime: [this.examDetail.scoreDisplayTime || '', this._confirmEndTimeValidator],
                    answerDisplayTime: [this.examDetail.answerDisplayTime || '', this.confirmEndTimeValidator],
                    enrollStart: [this.examDetail.enrollStart || ''],
                    enrollEnd: [this.examDetail.enrollEnd || ''],
                    isUserInfo: [this.examDetail.isUserInfo || 'false'],
                    isDeleted: [false],
                    images: [this.examDetail.imageUrl || ''],
                    examName: [this.examDetail.name || '', [Validators.required]],
                    startTime: [this.examDetail.startDate, [Validators.required]],
                    enterExamTime: [this.examDetail.endDate, [Validators.required]],
                    offeringId: [this.examDetail.id],
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
        )
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
            userGroup: null,
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
        console.log(this.examDetail, this.validateForm.value.paperId)
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        };

        if (this.validateForm.valid) {
            console.log('onSubmit:', content);
        } else {
            tipMessage('请先完善考试信息！');
            this.submitLoading = false;
            return;
        };
        if (this.score < this.validateForm.value.lowLine) {
            this.validateForm.get(`lowLine`).setValue(null);
            tipMessage('及格分不能大于试卷总分', '', 3000);
            this.submitLoading = false;
            return;
        }
        console.log('更新考试 1111', this.examDetail.examId)
        if (this.examDetail.examId) {

            if (this.examDetail.paperId !== this.validateForm.value.paperId) {
                this.examinationService.isUserJoin({ examId: this.examDetail.examId }).subscribe(
                    res => {
                        if (res > 0) {
                            tipMessage('您修改的考试已有人参加，不允许修改考试', '', 4000);
                            return;
                        }
                    },
                    err => {
                        tipMessage(err);
                    }
                )
                let req = {
                    examId: this.examDetail.examId
                }
                console.log('clean');
                this.examinationService.clearnMark(req)
            }
            this.examinationService.updateExam(this.examDetail.examId, content).subscribe(
                data => {
                    console.log('更新考试 1111')
                    tipMessage('更新考试成功', 'success');
                    this.examDetail.paperId = this.validateForm.value.paperId;
                    this.submitLoading = false;
                },
                error => {
                    console.log('更新考试 2222')
                    tipMessage(error);
                    this.submitLoading = false;
                }
            )
        } else {
            this.examinationService.createNewExam(content).subscribe(
                data => {
                    tipMessage('创建考试信息成功', 'success');
                    console.log(data);
                    this.examDetail.examId = data;
                    this.examDetail.paperId = this.validateForm.value.paperId;
                    // this.spinning = true;
                    this.submitLoading = false;
                },
                error => {
                    tipMessage(error);
                    this.submitLoading = false;
                }
            )
        }
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
    // 时间验证方法
    confirmEndTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const startTime = moment(controls[`startTime`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this.validateForm.get(`answerDisplayTime`).setValue(null);
                    tipMessage('回顾考试时间不能小于考试开始时间', '', 5000);
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
        let result = (num.toString()).indexOf(".");
        if (result != -1) {
            return true;
        } else {
            return false;
        }
    }
}
