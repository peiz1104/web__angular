import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResearchService } from '../service/research.service';
import { NzModalService } from 'ng-zorro-antd';
import * as moment from 'moment';

import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-setpedit',
    templateUrl: './setpedit.component.html',
    styleUrls: ['./setpedit.component.scss']
})
export class SetpeditComponent implements OnInit {
    stepData: any;
    _form: FormGroup;
    inputValueBudget: any; // 预算费用
    researchCostValue: any; // 研发费用
    transportCostsValue: any; // 交通费用
    meetingCostsValue: any; // 会议费
    researchId: any;
    btnstate: boolean = false;
    initFormData: any = {
        name: ['', [Validators.required]], // 培训名称
        projectNumber: [{ value: '', disabled: true }, [Validators.required]], // 计划编号
        userType: ['', [Validators.required]], // 用户类型
        devType: ['', [Validators.required]], // 研发类型
        trainingDays: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]], // 研发天数
        trainingPlace: [''], // 研发地点
        trainingNumber: ['', [Validators.pattern(/^[0-9]*$/)]], // 培训人数
        trainingBudget: [{ value: '', disabled: true }, [Validators.pattern(/^\d+(\.\d+)?$/)]], // 预算
        researchCost: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]], // 研发费
        transportCosts: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]], // 交通费
        meetingCosts: ['', [Validators.pattern(/^^\d+(\.\d+)?$/)]], // 会议费
        standardCost: [{ value: '', disabled: true }, [Validators.pattern(/^\d+(\.\d+)?$/)]], // 人天标准
        endDate: [null, [Validators.required]],
        startDate: [null, [Validators.required]],
        researchContent: [''], // 研发N诶荣
        remark: [''], // 研发摘要
    };
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private service: ResearchService,
        private confirmSv: NzModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.routeInfo.data.subscribe(
            (obj: { stepData: any }) => {
                this.stepData = obj.stepData;
                // console.log(this.stepData, 444)
            }
        )
        this.routeInfo.params.subscribe(
            res => {
                this.researchId = res.id;
            }
        )
        this._form = this.fb.group({
            name: [this.stepData.name, [Validators.required]], // 培训名称
            // tslint:disable-next-line:max-line-length
            projectNumber: [this.stepData.researchPlan ? this.stepData.researchPlan.projectNumber : '', [Validators.required]], // 计划编号
            userType: [this.stepData.userType, [Validators.required]], // 用户类型
            devType: [this.stepData.devType, [Validators.required]], // 研发类型
            trainingDays: [this.stepData.trainingDays, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]], // 研发天数
            trainingPlace: [this.stepData.trainingPlace], // 研发地点
            trainingNumber: [this.stepData.trainingNumber, [Validators.pattern(/^[0-9]*$/)]], // 培训人数
            trainingBudget: [this.stepData.trainingBudget, [Validators.pattern(/^\d+(\.\d+)?$/)]], // 预算
            researchCost: [this.stepData.researchCost, [Validators.pattern(/^\d+(\.\d+)?$/)]], // 研发费
            transportCosts: [this.stepData.transportCosts, [Validators.pattern(/^\d+(\.\d+)?$/)]], // 交通费
            meetingCosts: [this.stepData.meetingCosts, [Validators.pattern(/^^\d+(\.\d+)?$/)]], // 会议费
            standardCost: [this.stepData.standardCost, [Validators.pattern(/^\d+(\.\d+)?$/)]], // 人天标准
            endDate: [this.stepData.endDate ? moment(this.stepData.endDate) : this.stepData.endDate, [Validators.required]],
            startDate: [this.stepData.startDate ? moment(this.stepData.startDate) : this.stepData.startDate, [Validators.required]],
            researchContent: [this.stepData.researchContent], // 研发N诶荣
            remark: [this.stepData.remark], // 研发摘要
        })
        this.inputValueBudget = this.stepData.trainingBudget; // 预算费用
        this.researchCostValue = this.stepData.researchCost; // 研发费用
        this.transportCostsValue = this.stepData.transportCosts; // 交通费用
        this.meetingCostsValue = this.stepData.meetingCosts; // 会议费用
    }
    // baocun
    _saveformmessage(event, value) {
        console.log(value, 243)
        this.btnstate = true;
        this.service.saveEdit(this.researchId, value).subscribe(
            res => {
                tipMessage('编辑成功！', 'success');
                this.router.navigate([`/development/research/list`]);
                this.btnstate = false;
            },
            err => {
                this.btnstate = false;
                return tipMessage(err);
            }
        )
    }
    // 返回
    goBack() {
        window.history.back();
    }
    // 会议费
    changemeeting(value) {
        // console.log(value, 22)
        this.judgeInputMethod(value, 'M');
    }
    // 研发费用
    changeresearchg(value) {
        this.judgeInputMethod(value, 'R');
    }
    // 交通费用
    changetransport(value) {
        this.judgeInputMethod(value, 'T');
    }
    // 公用的方法输入判断
    judgeInputMethod(value: any, type) {
        if (value) {

            let meetingvalue = ('' + value).replace(/^\s*|\s*$/g, '');
            if (/^\d+(\.\d+)?$/.test(meetingvalue)) {
                if (type == 'M') {
                    this.meetingCostsValue = meetingvalue;
                }
                if (type == 'R') {
                    this.researchCostValue = meetingvalue;
                }
                if (type == 'T') {
                    this.transportCostsValue = meetingvalue;
                }
                this.inputValueBudget = Number(this.meetingCostsValue) + Number(this.transportCostsValue) + Number(this.researchCostValue)
            } else {
                return tipMessage('输入有误！');
            }
        }
    }

}
