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
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-stageadd',
    templateUrl: './stageadd.component.html',
    styleUrls: ['./stageadd.component.scss']
})
export class StageaddComponent implements OnInit {
    _form: FormGroup;
    devId: any;
    btnstate: boolean = false;
    inputValueBudget: any = 0; // 预算费用
    researchCostValue: any = 0; // 研发费用
    transportCostsValue: any = 0; // 交通费用
    meetingCostsValue: any = 0; // 会议费
    restMoney: any = 0; // 剩余费用
    allday: any = 0;
    _startDate = null;
    _endDate = null;
    initFormData: any = {
        name: ['', [Validators.required]], // 阶段名称
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
    };
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private service: ResearchService,
        private confirmv: NzModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {

        this.routeInfo.params.subscribe(
            res => {
                this.devId = res.id;
            }
        )
        this.service.getrestMoney(this.devId).subscribe(
            res => {
                if (Object.prototype.toString.call(res) == '[object Object]') {
                    this.restMoney = 0;
                } else {
                    this.restMoney = res;
                }

            }
        )
        this._form = this.fb.group(this.initFormData);
    }
    // fanhui
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
                if (Number(this.transportCostsValue) + Number(this.meetingCostsValue) + Number(this.researchCostValue) > this.restMoney) {
                    return tipMessage('不能超过剩余费用！');
                }
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
            this.allday = ((this._endDate - this._startDate) / (1000 * 60 * 60 * 24)) / 1000 * 1000;
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
        let objParams = {
            ...value,
            user: value.user[0],
            restMoney: this.restMoney
        }
        console.log(objParams, '添加数据')
        if (Number(this.transportCostsValue) + Number(this.meetingCostsValue) + Number(this.researchCostValue) > this.restMoney) {
            return tipMessage('不能超过剩余费用！');
        }
        this.btnstate = true;
        this.service.addstage(this.devId, objParams).subscribe(
            res => {
                this.btnstate = false;
                tipMessage('添加成功', 'success');
                window.history.back();
            },
            error => {
                this.btnstate = false;
                return tipMessage(error);
            }
        )
    }

}
