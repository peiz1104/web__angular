import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ResearchService } from '../service/research.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-stage-edit',
    templateUrl: './stage-edit.component.html',
    styleUrls: ['./stage-edit.component.scss']
})
export class StageEditComponent implements OnInit {
    _form: FormGroup;
    btnstate: boolean = false;
    devId: any;
    phaseId: any;
    spinning: boolean = true;
    inputValueBudget: any; // 预算费用
    researchCostValue: any = 0; // 研发费用
    transportCostsValue: any = 0; // 交通费用
    meetingCostsValue: any = 0; // 会议费
    stageData: any;
    restMoney: any = 0; // 剩余费用
    allday: any = 0;
    _startDate = null;
    _endDate = null;
    initFormData: any = {
        name: ['', [Validators.required]], // 阶段名称
        phaseNumber: ['', [Validators.required]], // 阶段编号
        user: ['', [Validators.required]], // 负责人
        mileageProgress: ['', [Validators.required]], // 里程进度
        phaseNo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]], // 阶段序号
        standardCost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]], // 人天标准
        peopleNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]], // 培训人数
        trainingBudget: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]], // 预算
        researchCost: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]], // 研发费
        transportCosts: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]], // 交通费
        meetingCosts: ['', [Validators.pattern(/^^\d+(\.\d+)?$/)]], // 会议费
        endDate: [null, [Validators.required]],
        startDate: [null, [Validators.required]],
        userGroupNames: [''], // 参验单位
        target: [''], // 阶段性目标
        plan: [''], // 阶段性计划
        remark: [''], // 研发摘要
        devStartDate: [''],
        devEndDate: [''],
    };
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private confirmv: NzModalService,
        private service: ResearchService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {

        this.routeInfo.paramMap.subscribe(
            params => {
                this.devId = params.get('id');
                this.phaseId = params.get('editId')
            }
        )
        this.routeInfo.data.subscribe(
            (res: { stageData: any }) => {
                this.stageData = res.stageData;
            }
        )
        // console.log(this.stageData, this.devId, this.phaseId, '编辑shuju');
        this.service.getrestMoney(this.devId).subscribe(
            res => {
                this.spinning = false;
                if (Object.prototype.toString.call(res) == '[object Object]') {
                    this.restMoney = 0;
                } else {
                    this.restMoney = res;
                }
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )
        this._form = this.fb.group(
            {
                name: [this.stageData.name, [Validators.required]], // 阶段名称
                // tslint:disable-next-line:max-line-length
                phaseNumber: [this.stageData.greenDreamProject.researchPlan ? this.stageData.greenDreamProject.researchPlan.projectNumber : '', [Validators.required]], // 阶段编号
                user: [this.stageData.user ? [this.stageData.user] : '', [Validators.required]], // 负责人
                mileageProgress: [this.stageData.mileageProgress, [Validators.required]], // 里程进度
                phaseNo: [this.stageData.phaseNo, [Validators.required, Validators.pattern(/^[0-9]*$/)]], // 阶段序号
                standardCost: [this.stageData.standardCost, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]], // 人天标准
                peopleNumber: [this.stageData.peopleNumber, [Validators.required, Validators.pattern(/^[0-9]*$/)]], // 培训人数
                trainingBudget: [this.stageData.trainingBudget, [Validators.pattern(/^\d+(\.\d+)?$/)]], // 预算
                researchCost: [this.stageData.researchCost, [Validators.pattern(/^\d+(\.\d+)?$/)]], // 研发费
                transportCosts: [this.stageData.transportCosts, [Validators.pattern(/^\d+(\.\d+)?$/)]], // 交通费
                meetingCosts: [this.stageData.meetingCosts, [Validators.pattern(/^^\d+(\.\d+)?$/)]], // 会议费
                endDate: [moment(this.stageData.endDate), [Validators.required]],
                startDate: [new Date(this.stageData.startDate), [Validators.required]],
                userGroupNames: [this.stageData.userGroupNames], // 参验单位
                target: [this.stageData.target], // 阶段性目标
                plan: [this.stageData.plan], // 阶段性计划
                remark: [this.stageData.remark], // 研发摘要
                devStartDate: [this.stageData.greenDreamProject ? this.stageData.greenDreamProject.startDate : ''],
                devEndDate: [this.stageData.greenDreamProject ? this.stageData.greenDreamProject.endDate : ''],
            }
        );
        this._startDate = moment(this.stageData.startDate);
        this._endDate = moment(this.stageData.endDate);
        this.researchCostValue = this.stageData.researchCost; // 研发费用
        this.transportCostsValue = this.stageData.transportCosts; // 交通费
        this.meetingCostsValue = this.stageData.meetingCosts; // 会议费
        // tslint:disable-next-line:max-line-length
        this.inputValueBudget = this.stageData.trainingBudget ? this.stageData.trainingBudget : this.researchCostValue + this.meetingCostsValue + this.transportCostsValue;
    }
    // 返回
    goBack() {
        window.history.back();
    }
    // 交通费用
    changetransport(value) {
        this.judgeMethod(value, 'T');
    }
    // 会议费用
    changemetting(value) {
        this.judgeMethod(value, 'M');
    }
    // 研发费用
    research(value) {
        this.judgeMethod(value, 'R');
    }
    // 添加费用的判断
    judgeMethod(value, type) {
        if (value) {
            if (/^\d+(\.\d+)?$/.test(value)) {
                let inputValue = value.replace(/^\s*|\s$/g, '');
                if (type == 'M') {
                    this.meetingCostsValue = inputValue;
                }
                if (type == 'R') {
                    this.researchCostValue = inputValue;
                }
                if (type == 'T') {
                    this.transportCostsValue = inputValue;
                }
                // tslint:disable-next-line:max-line-length
                if (Number(this.transportCostsValue) + Number(this.meetingCostsValue) + Number(this.researchCostValue) > this.restMoney) {
                    return tipMessage('不能超过剩余费用！');
                }
                // tslint:disable-next-line:max-line-length
                this.inputValueBudget = Number(this.transportCostsValue) + Number(this.meetingCostsValue) + Number(this.researchCostValue);
            } else {
                return tipMessage('输入有误！');
            }

        }
    }
    // 开始结束时间
    _startValueChange = () => {
        // console.log(this._startDate)
        if (this._endDate) {
            this.allday = ((this._endDate - this._startDate) / (1000 * 60 * 60 * 24)) / 100 * 100;
        }
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endValueChange = () => {
        // console.log(this._endDate)
        if (this._startDate) {
            this.allday = ((this._endDate - this._startDate) / (1000 * 60 * 60 * 24)) / 100 * 100;
        }
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
    // 保存
    _saveformmessage(event, value) {
        console.log(value)
        let objParams = {
            ...value,
            user: value.user[0],
            restMoney: this.restMoney
        }
        delete objParams.devEndDate;
        delete objParams.devStartDate;
        this.btnstate = true;
        this.service.editstage(this.devId, this.phaseId, objParams).subscribe(
            res => {
                tipMessage('编辑成功！', 'success');
                this.btnstate = false;
                window.history.back();
            },
            error => {
                this.btnstate = false;
                return tipMessage(error);
            }
        )
    }

}
