/*
 * @Author: peimingjun
 * @Date: 2017-11-17 15:22:18
 * @Last Modified by:   peimingjun
 * @Last Modified time: 2017-11-17 15:22:18
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
    selector: 'spk-paper-update',
    templateUrl: './paper-update.component.html',
    styleUrls: ['./paper-update.component.scss']
})
export class PaperUpdateComponent implements OnInit {
    _validateForm: FormGroup;
    paperId: any;
    fromData: any;
    _startDate = null;
    _endDate = null; // 开始时间与结束时间
    initFormData: any = {};
    custom: any;
    updateLoading: boolean = false;
    selectedOptionMethod: any;
    spinning: boolean = true;
    listData: any = {
        epName: [null, [Validators.required]],
        epType: [null, [Validators.required]],
        orderCode: [null],
        pagmethod: [null],
        showCode: [null],
        startTime: [null, [Validators.required]],
        endTime: [null],
        isPutout: [false],
        epDesc: [null],
        titleCode: [null],
        quesPage: [0],
        sumScore: [0]
    }
    link: any = {};
    queryParams: any = {};
    demoValue: number;
    epType: any = [];
    titleCode: any = [];
    orderCode: any = [];
    showCode: any = [];
    // fenye方式select
    pagmethodOptions = [
        { value: 'A', label: '整张试卷' },
        { value: 'C', label: '自定义' }
    ]
    // 答题方式select
    answermethodOptions = []

    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private confirmServ: NzModalService,
        private fb: FormBuilder,
        private exampaperservice: ExamPaperService
    ) { }
    // 初始化表单
    initForm = () => {
        this._validateForm = this.fb.group(this.listData);
        // tslint:disable-next-line:forin
        for (const key in this._validateForm.controls) {
            this._validateForm.controls[key].markAsDirty();
        }
    }
    ngOnInit() {
        this.initForm();
        this.routeInfo.parent.params.subscribe((paramid) => {
            this.paperId = paramid['id'];
            this.queryParams = paramid;
            if (!this.queryParams['userGroupId'] && !this.queryParams['name']) {
                let qs = (window.location.search.length > 0 ? window.location.search.substring(1) : '');
                let items = qs.split('&');
                let args = {}
                let item = null,
                    name = null,
                    value = null;
                for (var i = 0; i < items.length; i++) {
                    item = items[i].split('=');
                    name = decodeURIComponent(item[0]);
                    value = decodeURIComponent(item[1]);
                    args[name] = value;
                }
                this.link = {
                    userGroupId: args['userGroupId'],
                    name: args['name']
                }
                this.queryParams = this.link;
            } else {
                this.link = {
                    userGroupId: this.queryParams['userGroupId'],
                    name: this.queryParams['name']
                }
            }
            if (!this.link.userGroupId || this.link.userGroupId == 'undefined') {
                this.link = {};
            }
            // 请求试卷数据
            this.exampaperservice.getPaperMessage(this.paperId).subscribe((res) => {
                this.initFormData = res;
                this.spinning = false;
                // tslint:disable-next-line:forin
                for (let key in this.listData) {
                    // let bool = key == 'epName' || key == 'startTime';
                    // this.listData[key] = [this.initFormData[key], bool ? [Validators.required, this.trimCheck] : []];
                    if (key == 'epName') {
                        this.listData[key] = [this.initFormData[key], [Validators.required, this.trimCheck]];
                    } else if (key == 'startTime') {
                        this.listData[key] = [this.initFormData[key], [Validators.required, this.confirmStartDateValidator]];
                    } else if (key == 'epDesc') {
                        this.listData[key] = [this.initFormData[key], [this.trimCheck]];
                    } else if (key == 'isPutout') {
                        this.listData[key] = [this.initFormData[key], [this.isPutoutValidator]];
                    } else if (key == 'endTime') {
                        this.listData[key] = [this.initFormData[key], [this.confirmEndDateValidator]];
                    } else if (key == 'sumScore') {
                        this.listData[key] = [this.initFormData[key], [this.numberCtrol]];
                    } else {
                        this.listData[key] = [this.initFormData[key]];
                    }
                }
                this.selectedOptionMethod = this.listData.showCode[0];
                this.demoValue = this.listData.quesPage[0];
                this.initForm()
            }, err => {
                this.spinning = false;
                tipMessage(err);
            });
            this.exampaperservice.getDownDrag({ dicType: 'PAPER_TYPE' }).subscribe(
                (epType) => {
                    this.epType = epType;
                }, err => {
                    tipMessage(err);
                }
            );
            this.exampaperservice.getDownDrag({ dicType: 'PAPER_TITLE_CODE' }).subscribe(
                (titleCode) => {
                    this.titleCode = titleCode;
                }, err => {
                    tipMessage(err);
                }
            );
            this.exampaperservice.getDownDrag({ dicType: 'DISPLAY_ORDER' }).subscribe(
                (orderCode) => {
                    this.orderCode = orderCode;
                }, err => {
                    tipMessage(err);
                }
            );
            this.exampaperservice.getDownDrag({ dicType: 'SHOW_TYPE' }).subscribe(
                (answermethodOptions) => {
                    this.answermethodOptions = answermethodOptions;
                }, err => {
                    tipMessage(err);
                }
            );
        })
    }

    isPutoutValidator = (control: FormControl): { [s: string]: boolean } => {
        if (control.value) {
            return { required: true }
        }
    };

    _changeAnswerMethod = (e) => {
        if (e == 'unidirectional') {
            this.demoValue = 1;
        } else {
            this.demoValue = 0;
        }
        this.selectedOptionMethod = e;
    }

    // 关闭弹窗
    showConfirm = () => {
        let self = this;
        this.confirmServ.confirm({
            title: '关闭提示',
            content: '确定不进行操作关闭本页面！',
            okText: '确定',
            cancelText: '取消',
            // 弹窗操作
            onOk(e) {
                self.route.navigate(['/exam/exam-paper'])
            },

            onCancel(e) {
            }
        });
    }

    // 时间验证方法
    confirmEndDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._validateForm && this._validateForm.controls;
        if (controls) {
            const startTime = controls[`startTime`].value && moment(controls[`startTime`].value).unix();
            // console.log(controls[`startTime`].value);
            if (control.value) {
                if (controls[`startTime`].value && (startTime > moment(control.value).unix())) {
                    this._validateForm.get(`startTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 3000);
                    return;
                }
            }
        }
    }

    // 时间验证方法
    confirmStartDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._validateForm && this._validateForm.controls;
        if (controls) {
            const endTime = controls[`endTime`].value && moment(controls[`endTime`].value).unix();
            if (control.value) {
                if (controls[`endTime`].value && (endTime < moment(control.value).unix())) {
                    this._validateForm.get(`endTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 4000);
                    return;
                }
            }
        }
    }

    // 小数验证
    numberCtrol = (control: FormControl): { [s: string]: boolean } => {
        if (control.value) {
            if (!(/^(\d+\.\d{1,1}|\d+)$/.test(control.value))) {
                return { numberCtrol: true, error: true }
            }
        }
    }

    trimCheck = (control: FormControl): { [s: string]: boolean } => {
        if (control.value && !control.value.trim()) {
            return { confirm: true, error: true };
        }
    }

    // 进行判断开始时间结束时间
    _startValueChange = () => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    // 重新reset表单
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._validateForm = this.fb.group({
            epName: [null, [Validators.required]],
            epType: [null],
            orderCode: [null],
            pagmethod: [null],
            showCode: [null],
            startTime: [null, [Validators.required]],
            endTime: [null],
            epDesc: [null],
            quesPage: [0],
            sumScore: [0],
            isPutout: [false]
        });
        // this._validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._validateForm.controls) {
            this._validateForm.controls[key].markAsPristine();
        }
    }
    // 提交表单
    submitForm = ($event, value) => {
        this.updateLoading = true;
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this._validateForm.controls) {
            this._validateForm.controls[key].markAsDirty();
        }
        let params = {
            startTime: moment(value.startTime),
            epDesc: value.epDesc,
            epName: value.epName,
            epType: value.epType,
            isPutout: value.isPutout,
            orderCode: value.orderCode,
            quesPage: this.selectedOptionMethod != 'twoway' ? 1 : value.quesPage,
            showCode: value.showCode,
            titleCode: value.titleCode,
            sumScore: value.sumScore,
            epId: this.paperId,
        }
        if (value.endTime) {
            params['endTime'] = moment(value.endTime)
        }
        this.exampaperservice.updatePaper(params).subscribe((res) => {
            tipMessage('试卷更新成功！', 'success');
            this.updateLoading = false;
            this.route.navigate([`/exam/exam-paper/editpaper/${this.paperId}/addtest`, {
                epId: this.paperId,
                userGroupId: this.queryParams['userGroupId'] || '',
                name: this.queryParams['name'] || ''
            }])
        }, err => {
            tipMessage(err)
            this.updateLoading = false;
        })
    }
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
