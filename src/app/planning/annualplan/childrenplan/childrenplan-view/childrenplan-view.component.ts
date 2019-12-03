import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'app/core/entity/pagination';
import { CuiLayer, Column } from 'console-ui-ng';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { AnnualSubPlan } from './../../entity/annualsubplan';
import { CourseService } from './../../../../learning/course/service/course.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-childrenplan-view',
    templateUrl: './childrenplan-view.component.html',
    styleUrls: ['./childrenplan-view.component.scss']
})
export class ChildrenplanViewComponent implements OnInit {
    type: string; // 进入单个表单页面
    annualSubPlan: AnnualSubPlan;

    InternalTrainingInData: any = {};
    InExternalTrainingData: any = {};
    OverseasTrainingData: any = {};
    ResearchDevelopmentCoursewareData: any = {};
    OtherData: any = {};
    historyBackType: number;
    isHidden: boolean = false;
    queryParamsType: any;
    autosize = {
        minRows: 7,
        maxRows: 7
    };
    layoutData = {
        layout1: '8',
        layout2: '12',
        layout3: '4',
    }
    isVisibleAddPlan: boolean = false;
    dat: any;
    searchForm: FormGroup;
    loadin: boolean;
    selectio: any;
    column: Column[] = [
        { title: '缩略图', tpl: 'thumbnail' },
        { title: '名称/编码', tpl: 'nameAndCode' },
        { title: '类型/学时', tpl: 'typeAndDuration' },
        { title: '组织/分类', tpl: 'orgAndCate' },
    ];
    seeId: number;
    isTypeOfZ: boolean = false;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private courseService: CourseService,
        private activatedRoute: ActivatedRoute) {
    }
    ngOnInit() {
        // 默认返回子计划列表页面
        this.historyBackType = 0;
        this.activatedRoute.queryParams.subscribe(
            res => {
                this.queryParamsType = res.type
            }
        )
        this.activatedRoute.data.subscribe((data: { annualSubPlan: AnnualSubPlan }) => {
            this.annualSubPlan = data.annualSubPlan;
            if (this.annualSubPlan.planIdentifier == "Z") {
                this.isTypeOfZ = true;
            }
        });
        let id = this.activatedRoute.snapshot.params.id;
        let planType = this.activatedRoute.snapshot.params.planType;
        if (planType.indexOf("H") != -1) {
            // 不显示返回按钮
            this.historyBackType = 1;
            planType = planType.toString().substring(0, planType.length - 1);
        } else if (planType.indexOf("Y") != -1) {
            // 返回去年子计划列表页面
            this.historyBackType = 2;
            planType = planType.toString().substring(0, planType.length - 1);
        }
        this.type = planType;
        this.setDefaultFormData();
    }
    /* 查看  start */

    // modal 里面的列表数据

    // 判断类型
    _getCourseTypeText(key) {
        let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
        return texts[key] || '';
    }

    // 接口 通过id 拿对应的id
    getDesigntedPlanId = (id) => {
        this.courseService.getDesigntedPlanId(id).subscribe(
            data => {
                this.seeId = data.planId;
                this.loadDat();
            },
            err => {
            }
        );
    }

    // 列表 接口
    loadDat(page?: Pagination<any>) {
        console.log(page)
        this.loadin = true;
        // 查看的课程接口
        let params = {
            planId: this.seeId,
            page: page ? page.number : '' || 0,
            size: 10
        }
        this.courseService.getaddcourse(params).subscribe(
            data => {
                this.dat = data
                this.loadin = false;
            },
            err => {
                this.loadin = false;
            }
        );
    }

    // 点击 查看按钮
    handelSee = () => {
        this.isVisibleAddPlan = true;
        let id = this.activatedRoute.snapshot.params.id
        this.getDesigntedPlanId(id)
    }

    // 取消 modal
    handleCancelAdd = (e) => {
        this.isVisibleAddPlan = false;
    }

    // 确认
    handleOkAdd = (e) => {
        this.isVisibleAddPlan = false
    }

    /* 查看  end */

    handelHidden = () => {
        this.isHidden = !this.isHidden;
        // console.log(this.isHidden);
    }
    setDefaultFormData() {// 设置表单数据初始化
        this.InternalTrainingInData = {
            projectNumber: this.annualSubPlan.projectNumber,
            name: this.annualSubPlan.name,
            trainingDate: this.annualSubPlan.trainingDate,
            trainingPlace: this.annualSubPlan.trainingPlace,
            trainingDays: this.annualSubPlan.trainingDays,
            trainingNumber: this.annualSubPlan.trainingNumber,
            correspondingNumber: this.annualSubPlan.correspondingNumber,
            trainingObject: this.annualSubPlan.trainingObject,
            personnelClassification: this.annualSubPlan.personnelClassification,
            trainingClassification: this.annualSubPlan.trainingClassification,
            trainingLevel: this.annualSubPlan.trainingLevel,
            trainingCostPer: this.annualSubPlan.trainingCostPer,
            lectuerTransportationFee: this.annualSubPlan.lectuerTransportationFee,
            lectuerBoard: this.annualSubPlan.lectuerBoard,
            outsideLectuerPretaxFee: this.annualSubPlan.outsideLectuerPretaxFee,
            commission: this.annualSubPlan.commission,
            wages: this.annualSubPlan.wages,
            otherCosts: this.annualSubPlan.otherCosts,
            trafficFee: this.annualSubPlan.trafficFee,
            trafficFeeLower: this.annualSubPlan.trafficFeeLower ? this.annualSubPlan.trafficFeeLower : 0,
            trainingBudget: this.annualSubPlan.trainingBudget,
            expenseLevel: this.annualSubPlan.expenseLevel,
            expenseLower: this.annualSubPlan.expenseLower,
            trainingContent: this.annualSubPlan.trainingContent,
            quotaAllocation: this.annualSubPlan.quotaAllocation ? this.annualSubPlan.quotaAllocation : [],
            remark: this.annualSubPlan.remark
        };
        this.InExternalTrainingData = {
            projectNumber: this.annualSubPlan.projectNumber,
            name: this.annualSubPlan.name,
            trainingDate: this.annualSubPlan.trainingDate,
            trainingPlace: this.annualSubPlan.trainingPlace,
            trainingDays: this.annualSubPlan.trainingDays,
            trainingNumber: this.annualSubPlan.trainingNumber,
            trainingObject: this.annualSubPlan.trainingObject,
            trafficFee: this.annualSubPlan.trafficFee,
            trainingCostPer: this.annualSubPlan.trainingCostPer,
            trainingBudget: this.annualSubPlan.trainingBudget,
            trainingContent: this.annualSubPlan.trainingContent,
            remark: this.annualSubPlan.remark
        };
        this.OverseasTrainingData = {
            projectNumber: this.annualSubPlan.projectNumber,
            name: this.annualSubPlan.name,
            trainingDate: this.annualSubPlan.trainingDate,
            trainingPlace: this.annualSubPlan.trainingPlace,
            trainingDays: this.annualSubPlan.trainingDays,
            trainingNumber: this.annualSubPlan.trainingNumber,
            trainingObject: this.annualSubPlan.trainingObject,
            planType: this.annualSubPlan.planType,
            trainingCostPer: this.annualSubPlan.trainingCostPer,
            trafficFee: this.annualSubPlan.trafficFee,
            trainingBudget: this.annualSubPlan.trainingBudget,
            trainingContent: this.annualSubPlan.trainingContent,
            remark: this.annualSubPlan.remark
        };
        this.ResearchDevelopmentCoursewareData = {
            projectNumber: this.annualSubPlan.projectNumber,
            name: this.annualSubPlan.name,
            trainingDate: this.annualSubPlan.trainingDate,
            trainingPlace: this.annualSubPlan.trainingPlace,
            trainingDays: this.annualSubPlan.trainingDays,
            trainingNumber: this.annualSubPlan.trainingNumber,
            meetingCosts: this.annualSubPlan.meetingCosts,
            researchCost: this.annualSubPlan.researchCost,
            transportCosts: this.annualSubPlan.transportCosts,
            trainingBudget: this.annualSubPlan.trainingBudget,
            researchContent: this.annualSubPlan.researchContent,
            remark: this.annualSubPlan.remark
        };
        this.OtherData = {
            projectNumber: this.annualSubPlan.projectNumber,
            name: this.annualSubPlan.name,
            category: this.annualSubPlan.category,
            trainingBudget: this.annualSubPlan.trainingBudget,
            isTrainingBudget: this.annualSubPlan.isTrainingBudget,
            trainingContent: this.annualSubPlan.trainingContent,
            remark: this.annualSubPlan.remark
        };
    }

    // 返回
    goback($event) {
        this.router.navigate([`/training/planing`])
    }

}
