/*
 * @Author: peimingjun
 * @Date: 2017-11-01 14:17:29
 * @Last Modified by: peimingjun
 * @Last Modified time: 2017-11-06 17:40:25
 */

import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-create',
    templateUrl: './paper-create.component.html',
    styleUrls: ['./paper-create.component.scss']
})
export class PaperCreateComponent implements OnInit {
    validateForm: FormGroup;
    _startDate = null;
    _endDate = null; // 开始时间与结束时间
    btnstate = 'B'; // 刚开始btn的状态
    //  private createoreditType: any; // 判断是编辑还是创建试卷
    answerMethod: any = 'twoway'; // 答题方式默认是双向
    selectedOptionMethod; // 分页方式
    selectedAnswer;
    demoValue;  // fenye方式为自定义时的值
    custom; // 分页方式自定义
    paperData: any = {}; // 创建试卷时请求的数据
    createLoading: boolean = false;
    queryParams: any = {};
    link: any = {};
    epType: any = [];
    titleCode: any = [];
    partitionorder: any = [];
    // fenye方式select
    pagmethodOptions = [
        { value: 'A', label: '整张试卷' },
        { value: 'C', label: '自定义' }
    ]
    // 答题方式select
    answermethodOptions = []
    constructor(
        private confirmServ: NzModalService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private exampaperservice: ExamPaperService,
    ) { }
    ngOnInit() {
        this.validateForm = this.fb.group({
            papername: [null, [Validators.required, this.trimCheck]],
            papertype: ['', [Validators.required]],
            partitionorder: [],
            pagmethod: [],
            answermethod: [],
            startdate: [new Date(), [Validators.required, this.confirmStartDateValidator]],
            enddate: ['', [this.confirmEndDateValidator]],
            remember: [false],
            comment: [null, [this.trimCheck]],
            titleCode: [],
            quesPage: [],
            sumScore: [0, [this.numberCtrol]]
        });
        this.exampaperservice.getDownDrag({ dicType: 'PAPER_TYPE' }).subscribe(
            (epType) => {
                this.epType = epType;
                this.validateForm.get('papertype').setValue(this.epType[0].dicCode);
            }, err => {
                tipMessage(err);
            }
        );
        this.exampaperservice.getDownDrag({ dicType: 'PAPER_TITLE_CODE' }).subscribe(
            (titleCode) => {
                this.titleCode = titleCode;
                this.validateForm.get('titleCode').setValue(this.titleCode[0].dicCode);
            }, err => {
                tipMessage(err);
            }
        );
        this.exampaperservice.getDownDrag({ dicType: 'DISPLAY_ORDER' }).subscribe(
            (partitionorder) => {
                this.partitionorder = partitionorder;
                this.validateForm.get('partitionorder').setValue(this.partitionorder[0].dicCode);
            }, err => {
                tipMessage(err);
            }
        );
        this.exampaperservice.getDownDrag({ dicType: 'SHOW_TYPE' }).subscribe(
            (answermethodOptions) => {
                this.answermethodOptions = answermethodOptions;
                this.validateForm.get('answermethod').setValue(this.answermethodOptions[0].dicCode);
            }, err => {
                tipMessage(err);
            }
        );
        this.routeInfo.queryParams.subscribe(queryParams => {
            this.queryParams = queryParams;
            this.link = {
                userGroupId: queryParams['userGroupId'],
                name: queryParams['name']
            }
        });
        this.selectedOptionMethod = this.pagmethodOptions[0];
        this.selectedAnswer = this.answermethodOptions[1];
        // 进行判断是编辑试卷还是创建试卷；如果是编辑试卷的还编辑按钮是可以点击的；并且显示相应试题（api）；如果是已发布（已考试）；不可以对试卷进行编辑
        // 创建试卷编辑按钮不可以点击只能进行一步步操作
        // this.routeInfo.queryParams.subscribe(queryParams => this.createoreditType = queryParams.type);
    }

    trimCheck = (control: FormControl): { [s: string]: boolean } => {
        if (control.value && !control.value.trim()) {
            return { confirm: true, error: true };
        }
    }

    numberCtrol = (control: FormControl): { [s: string]: boolean } => {
        if (control.value) {
            if (!(/^(\d+\.\d{1,1}|\d+)$/.test(control.value))) {
                return { numberCtrol: true, error: true }
            }
        }
    }

    // 时间验证方法
    confirmEndDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const startdate = moment(controls[`startdate`].value).unix();
            if (control.value) {
                if (startdate > moment(control.value).unix()) {
                    this.validateForm.get(`startdate`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！');
                    return;
                }
            }
        }
    }

    confirmStartDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const enddate = moment(controls[`enddate`].value).unix();
            if (control.value) {
                if (enddate < moment(control.value).unix()) {
                    this.validateForm.get(`enddate`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！');
                    return;
                }
            }
        }
    }

    // 按钮切换
    papermessage = (event, value) => {
        this.btnstate = value;
    }
    paperedit = (event, value) => {
        this.btnstate = value;
    }
    showConfirm = () => {
        let self = this;
        this.confirmServ.confirm({
            title: '关闭提示',
            content: '确定不进行操作关闭本页面！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                self.route.navigate(['/exam/exam-paper'])
            },
            onCancel(e) {
            }
        });
    }
    // 创建试卷改变答题方式
    _changeAnswerMethod = (value) => {
        if (value) {
            this.answerMethod = value;
            if (value == 'twoway') {
                this.demoValue = 0;
            } else {
                this.demoValue = 1;
            }
        }
    }
    // 只有自定义分页与答题方式为单向时显示数量
    _changePageMethod = (value) => {
        this.custom = value.value
    }
    // 新建试卷表单提交（下一步）
    submitForm = ($event, value) => {
        $event.preventDefault();
        this.createLoading = true;
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        if (!value.papername || !value.startdate) {
            // return this._message.error('请按要求填写后进行下一步！');
        } else {
            let params = {
                endTime: moment(value.enddate),
                startTime: moment(value.startdate),
                epDesc: value.comment,
                epName: value.papername,
                epType: value.papertype,
                isPutout: value.remember,
                orderCode: value.partitionorder,
                quesPage: this.selectedAnswer == "unidriectional" ? 1 : value.quesPage,
                showCode: value.answermethod,
                titleCode: value.titleCode,
                sumScore: value.sumScore,
                userGroupId: this.queryParams.userGroupId
            };
            // 请求创建试卷的api
            this.exampaperservice.addPaper(params).subscribe((res) => {
                this.createLoading = false;
                this.paperData = res;
                if (this.paperData.epId) {
                    this.btnstate = "E";
                    this.exampaperservice.paperData = this.paperData;
                    this.route.navigate([`/exam/exam-paper/editpaper/${this.paperData.epId}/addtest`, {
                        epId: this.paperData.epId,
                        userGroupId: this.queryParams['userGroupId'],
                        name: this.queryParams['name']
                    }])
                }
            }, err => {
                this.createLoading = false;
                tipMessage(err)
            })
        }
    };
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    // 进行判断开始时间结束时间
    _startValueChange = () => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endValueChange = () => {
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
    };
    _disabledStartDate = (startValue) => {
        if (!startValue || !this._endDate) {
            return false;
        }
        return startValue.getTime() >= this._endDate.getTime();
    };
    _disabledEndDate = (endValue) => {
        if (!endValue || !this._startDate) {
            return false;
        }
        return endValue.getTime() <= this._startDate.getTime();
    };
}
