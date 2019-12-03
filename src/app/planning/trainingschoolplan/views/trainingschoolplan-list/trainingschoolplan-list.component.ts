import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from './../../../../core/entity/pagination';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingSchoolPlanService } from './../../service/trainingschoolplan.service';
import { TrainingSchoolPlan } from 'app/planning/trainingschoolplan/entity/trainingschoolplan';
import { UserGroup } from './../../../../system/entity/user-group';
import { AnnualSubPlan } from 'app/planning/annualplan/entity/annualsubplan'
import { AnnualSubPlanService } from 'app/planning/annualplan/service/annualsubplan.service';
import { ApprovalInfo } from 'app/planning/annualplan/entity/approvalinfo'
import { tipMessage } from 'app/account/entity/message-tip';



@Component({
    selector: 'spk-trainingschoolplan-list',
    templateUrl: './trainingschoolplan-list.component.html',
    styleUrls: ['./trainingschoolplan-list.component.scss']
})
export class TrainingschoolplanListComponent implements OnInit {

    searchBy: {
        approvalStatus?: string,
        name?: string,
        userGroup?: UserGroup,
        projectType?: string[],
        userName?: string,
        year?: number
    } = {};
    trainingSchoolPlan: Pagination<TrainingSchoolPlan>;
    approvalInfos: Pagination<ApprovalInfo>;
    isVisibleApproval = false;
    inputValue: string;
    validateForm: FormGroup;
    isVisible = false;
    message = "";
    selection;
    argus: any;
    year: number = new Date().getFullYear();
    isBlock: boolean = true
    thisId: string[] = [];
    loading: boolean = true;
    searchOptions;
    searchTypeOptions;
    selectedMultipleOption;
    selectedTypeOption;

    columns2 = [
        { title: '计划编号', tpl: 'colprojectnumber' },
        { title: '计划名称', tpl: 'colname' },
        { title: '计划类型', tpl: 'coltrainingfixblebudget', styleClass: 'text-center ' },
        { title: '预算 (元)', tpl: 'colresearchbudget', styleClass: 'text-center ' },
        { title: '所属机构', tpl: 'colusergroupname' },
        { title: '填报人', tpl: 'coluserName', styleClass: 'text-center ' },
        { title: '填报日期', tpl: 'colcreateddate', styleClass: 'text-center ' },
        { title: '审核状态', tpl: 'colapprovalstatus', styleClass: 'text-center ' },
        { title: '执行状态', tpl: 'colexecutingstate', styleClass: 'text-center ' },
        { title: '计划标识', tpl: 'colplanIdentifier', styleClass: 'text-center ' },
    ];

    approvalColumns = [
        { title: '审核人', tpl: 'colcreatedbydisplayname' },
        { title: '审核机构', tpl: 'colusergroupname' },
        { title: '审核时间', tpl: 'colcreateddate' },
        { title: '审核状态', tpl: 'colapprovalstatus' },
        { title: '审核意见', tpl: 'colcomments' }
    ];

    _submitForm = ($event, value) => {
        $event.preventDefault();
        this.searchBy = value;
        this.loadData();
    };

    constructor(
        private trainingSchoolPlanService: TrainingSchoolPlanService,
        private annualSubPlanService: AnnualSubPlanService,
        private layer: CuiLayer,
        private fb: FormBuilder) {

    }

    ngOnInit() {
        this.searchOptions = [
            { value: 'YA', label: '研修院待审核' },
            { value: 'YP', label: '研修院已通过' },
            { value: 'YR', label: '研修院已拒绝' },
            { value: 'A', label: '待审核' },
            { value: 'P', label: '已通过' }
        ];
        this.selectedMultipleOption = ['YA'];
        this.searchBy.approvalStatus = 'YA';
        // 研修院类型初始化
        this.searchTypeOptions = [
            { value: 'A', label: 'A' },
            { value: 'B', label: 'B' },
            { value: 'C', label: 'C' },
            { value: 'D', label: 'D' }
        ];
        this.searchBy.year = this.year;
        this.selectedTypeOption = ['C', 'D'];
        this.searchBy.projectType = ['C', 'D'];
        this.validateForm = this.fb.group({
            name: ['', []],
            userName: ['', []],
            userGroup: [null],
            approvalStatus: ['', []],
            projectType: ['', []],
            year: [this.year]
        });
        this.loadData();
    }

    // 点击隐藏 文字
    handleHiddenWord(data) {
        let id = data.id;
        let ids = this.thisId;
        if (ids.indexOf(id) == -1) {
            ids.push(id)
        } else {
            ids.splice(ids.indexOf(id), 1)
        }

    }
    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.trainingSchoolPlanService.getAllOfPage(this.getSearchParams(), page).subscribe(
            trainingSchoolPlan => {
                this.trainingSchoolPlan = trainingSchoolPlan;
                this.loading = false;
            }
        );
        this.selection = [];
    }
    getSearchParams() {
        if (this.searchBy) {
            let params = {};
            params['name'] = this.searchBy.name;
            if (this.searchBy.userGroup != null) {
                params['orgIds'] = this.searchBy.userGroup.id;
            }
            params['displayName'] = this.searchBy.userName;
            /* if (this.searchBy && this.searchBy.approvalStatus == 'YP') {
                params['aStatus'] = ['YP', 'P'];
            } else if (this.searchBy && this.searchBy.approvalStatus == 'YA') {
                params['aStatus'] = ['YA', 'A'];
            } else {
                params['aStatus'] = this.searchBy.approvalStatus;
            } */

            params['aStatus'] = this.searchBy.approvalStatus;
            params['planTypes'] = this.searchBy.projectType;
            if (this.searchBy.year) {
                params['year'] = this.searchBy.year;
            }

            return params;
        }
        return null;
    }

    // 审核
    approve = () => {
        let selected = this.selection;
        if (!selected || selected.length == 0) {
            tipMessage('请选择要审批的计划');
            return;
        }

        let aStauts = this.selection.map(it => it.approvalStatus);
        for (let i = 0; i < aStauts.length; i++) {
            let as = aStauts[i];
            if (as == 'YR' || as == 'YP') {
                tipMessage('请选择待审核计划');
                return;
            }
        }
        let proType = this.selection.map(it => it.planType);
        for (let i = 0; i < proType.length; i++) {
            let as = proType[i];
            if (as == 'A' || as == 'B') {
                tipMessage('请选择待审核的C、D类计划', '', 5000);
                return;
            }
        }

        this.isVisible = true;

    }

    private batchOperate(action: string, actionName: string, trainingSchoolPlan?: TrainingSchoolPlan,
        keepFilter?: boolean, message?: string, operate?: string) {
        let selected = trainingSchoolPlan ? [trainingSchoolPlan] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的计划`, '', 4000);
            return;
        }
        if (action == 'approve') {
            let argusTemp = { selected: null, message: '', operate: '' };
            argusTemp.selected = this.selection;
            argusTemp.message = message;
            argusTemp.operate = operate;
            this.argus = argusTemp;

        } else {
            this.argus = selected.map(it => it.id);
        }
        this.layer.confirm(`确定要${actionName}选择的计划吗？`, () => {
            this.trainingSchoolPlanService[action](this.argus).subscribe(
                ok => {
                    tipMessage(`${actionName}成功`, 'success');
                    this.loadData();
                },
                err => tipMessage(`${actionName}失败`)
            );
        });
    }

    showApprovalInfo(annualSubPlan?: AnnualSubPlan) {
        this.isVisibleApproval = true;
        this.annualSubPlanService.getApprovalInfo(annualSubPlan.id, annualSubPlan.planType, annualSubPlan.planIdentifier).subscribe(
            approvalInfos => this.approvalInfos = approvalInfos
        );
    }

    showModal = () => {
        this.isVisible = true;
    }

    handleOk = (e) => {
        this.isVisible = false;
        this.batchOperate("approve", "审核", null, false, this.message, 'YP');
    }

    handleNO = (e) => {
        this.isVisible = false;
        // 拒绝
        this.batchOperate("approve", "审核", null, false, this.message, 'YR');
    }

    handleCancel = (e) => {
        this.isVisible = false;
    }

    handleCancelApproval = (e) => {
        this.isVisibleApproval = false;
    }

    getPath(ug: UserGroup) {
        if (!ug) {
            return null;
        }
        if (ug.parents) {
            return ug.parents.map(it => it.name);
        } else {
            return [ug.name];
        }
    }

}
