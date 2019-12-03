import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnualSubPlan } from './../../entity/annualsubplan'
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from './../../../../core/entity/pagination';
import { AnnualSubPlanService } from './../../service/annualsubplan.service';
import { ApprovalInfo } from './../../entity/approvalinfo'
import { UserGroup } from './../../../../system/entity/user-group';
import { NzModalService } from 'ng-zorro-antd';


import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-childrenplan-list',
    templateUrl: './childrenplan-list.component.html',
    styleUrls: ['./childrenplan-list.component.scss']
})
export class ChildrenplanListComponent implements OnInit {
    searchBy: {
        annualPlanId?: number, // 年度计划id
        approvalStatus?: string, // 审批状态
        name?: string, // 计划名称
        projectNumber?: string, //计划编号
        displayName?: string, // 填报人
        trainingPlace?: string, // 培训地点
        planIdentifier?: string, // 计划标识
        executingState?: string, // 执行状态
        // trainingDate?: string, // 培训时间
        trainingDates?: string[], // 培训时间
        planTypes?: string[], // 计划类型
        userGroup?: UserGroup;
        annualApprovalStatus?: string; // 年度计划审核状态
    } = {};
    annualSubPlans: Pagination<AnnualSubPlan>;
    annualSubPlanHistorys: Pagination<AnnualSubPlan>;
    approvalInfos: Pagination<ApprovalInfo>;
    selection: AnnualSubPlan[] = [];
    historySelection: AnnualSubPlan[];
    approvalInfoSelection: ApprovalInfo[];
    id: number;
    isBlock: boolean = true;
    thisId: string[] = [];
    columns2 = [
        { title: '子计划编号', tpl: 'colprojectnumber', styleClass: 'text-left ' },
        { title: '子计划名称', tpl: 'colname', styleClass: 'text-left ' },
        { title: '计划类型', tpl: 'colplantype', styleClass: 'text-left ' },
        { title: '预算 (元)', tpl: 'coltrainingbudget', styleClass: 'text-left ' },
        { title: '填报机构', tpl: 'colgroupname', styleClass: 'text-left text-over' },
        { title: '地点', tpl: 'coltrainingplace', styleClass: 'text-left text-over' },
        { title: '填报人', tpl: 'coldisplayname', styleClass: 'text-left ' },
        { title: '填报日期', tpl: 'colcreateddate', styleClass: 'text-left ' },
        { title: '审核状态', tpl: 'colapprovalstatus', styleClass: 'text-left ' },
        { title: '提前开班申请', tpl: 'colaheadopening', styleClass: 'text-left ' },
        { title: '执行状态', tpl: 'colexecutingstate', styleClass: 'text-left ' },
        { title: '计划标识', tpl: 'colplanidentifier', styleClass: 'text-left ' },
        { title: '历史记录', styleClass: 'text-center ', tpl: 'rowAction2' },
        { title: '操作', styleClass: 'text-center action-opeartion', tpl: 'rowAction' }
    ];
    historyColumns = [
        { title: '子计划编号', tpl: 'colprojectnumber' },
        { title: '子计划名称', tpl: 'colname' },
        { title: '计划类型', tpl: 'colplantype' },
        { title: '预算 (元)', tpl: 'coltrainingbudget' },
        { title: '培训时间', tpl: 'coltrainingdate' },
        { title: '修改人', tpl: 'coldisplayname' },
        { title: '修改时间', tpl: 'collastmodifieddate' },
        { title: '详细', styleClass: 'text-center', tpl: 'rowAction' }
    ];
    approvalColumns = [
        { title: '审核人', tpl: 'colcreatedbydisplayname', },
        { title: '审核机构', tpl: 'colusergroupname', },
        { title: '审核时间', tpl: 'colcreateddate', },
        { title: '审核状态', tpl: 'colapprovalstatus', },
        { title: '审核意见', tpl: 'colcomments' }
    ];
    argus: any;
    inputValue: string;
    validateForm: FormGroup;
    isVisible = false;
    isVisibleForCopy = false;
    isVisibleHistory = false;
    isVisibleApproval = false;
    isVisibleOpenClass = false; // 提前开班审核modal框状态
    message = "";
    copyCounts = 1;
    copyEntity: AnnualSubPlan;
    userGroup;
    loading: boolean = true;
    regionType: any;
    annualApprovalStatus: string; // 年度计划审核状态
    pageNumber: any;
    _submitForm = ($event, value) => {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        this.searchBy = value;
        this.searchBy.annualPlanId = this.id;
        this.loadData();
    };


    constructor(private annualSubPlanService: AnnualSubPlanService,
        private layer: CuiLayer,
        private fb: FormBuilder,
        private confirmServ: NzModalService,
        private routerIonfo: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.routerIonfo.queryParams.subscribe((params) => {
            this.pageNumber = params.pageNumber;
        })
        // console.log(this.pageNumber, 444)
        this.id = this.routerIonfo.snapshot.params.id;
        this.annualApprovalStatus = this.routerIonfo.snapshot.queryParams.approvalStatus;
        this.searchBy.annualPlanId = this.id;
        this.searchBy.annualApprovalStatus = this.annualApprovalStatus;
        this.validateForm = this.fb.group({
            name: ['', []],
            projectNumber: ['', []],
            displayName: ['', []],
            trainingPlace: ['', []],
            planIdentifier: ['', []],
            approvalStatus: ['', []],
            trainingDates: [[], []],
            executingState: ['', []],
            planTypes: [[], []],
            userGroup: [[], []]
        });
        // this.loadData();
        let page = {
            size: 10,
            number: this.pageNumber != undefined ? this.pageNumber : 0
        }
        this.annualSubPlanService.getAllOfPage(this.getSearchParams(), page).subscribe(
            annualSubPlans => {
                this.annualSubPlans = annualSubPlans;
                this.loading = false;
            }
        );
        this.annualSubPlanService.getUserGroup(this.id).subscribe(
            map => {
                this.regionType = map.regionType;
            }
        )
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
        this.annualSubPlanService.getAllOfPage(this.getSearchParams(), page).subscribe(
            annualSubPlans => {
                this.annualSubPlans = annualSubPlans;
                this.loading = false;
            }
        );
        this.selection = [];
    }
    getSearchParams() {
        if (this.searchBy) {
            let params = {};
            params['annualPlanId'] = this.searchBy.annualPlanId;
            params['name'] = this.searchBy.name;
            params['projectNumber'] = this.searchBy.projectNumber;
            params['approvalStatus'] = this.searchBy.approvalStatus;
            params['displayName'] = this.searchBy.displayName;
            params['trainingPlace'] = this.searchBy.trainingPlace;
            params['planIdentifier'] = this.searchBy.planIdentifier;
            params['trainingDates'] = this.searchBy.trainingDates;
            params['executingState'] = this.searchBy.executingState;
            params['planTypes'] = this.searchBy.planTypes;
            params['annualApprovalStatus'] = this.searchBy.annualApprovalStatus;
            if (this.searchBy.userGroup) {
                params['orgIds'] = this.searchBy.userGroup.id;
            }
            console.log(params)
            return params;
        }
        return null;
    }

    delete(annualSubPlan?: AnnualSubPlan) {
        this.batchOperate('deleteBatch', '删除', annualSubPlan, false);
    }

    cancel(annualSubPlan?: AnnualSubPlan) {
        this.batchOperate('cancel', '取消', annualSubPlan, false);
    }

    copy(annualSubPlan?: AnnualSubPlan) {
        this.isVisibleForCopy = true;
        this.copyEntity = annualSubPlan;
    }

    commitToApproval(annualSubPlan?: AnnualSubPlan) {
        this.batchOperate('commitToApproval', '提交', annualSubPlan, false);
    }

    // 提前开班申请--> 提交审核
    openClassCommit(annualSubPlan?: AnnualSubPlan) {
        this.batchOperate('openClassCommit', '提前开班申请', annualSubPlan, false);
    }

    // 提前开班申请--> 审核计划
    openClassApproval(annualSubPlan?: AnnualSubPlan) {
        let selected = annualSubPlan ? [annualSubPlan] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage('请选择要审核的计划');
            return;
        }
        let openClassStatus = selected.map(it => it.aheadOpening);
        if (openClassStatus.includes("N") || openClassStatus.includes("P")
            || openClassStatus.includes("R")) {
            tipMessage('只能审核待审核状态下的计划！', '', 5000);
            return;
        }
        let planType = selected.map(it => it.planType);
        if (planType.includes("RE") || planType.includes("EL")) {
            tipMessage('暂不支持对课件研发和其他类型的计划提供提前开班的功能！', '', 5000);
            return;
        }
        this.isVisibleOpenClass = true;
        /* this.argus = selected;
        this.layer.confirm(`确定要对选择的计划实施提前开班吗？`, () => {
            this.doService("openClassApproval", "提前开班");
        }) */
        // this.isVisible = true;
    }

    // 提前开班申请 --> 审核通过
    openClassHandleOk = (e) => {
        this.isVisibleOpenClass = false;
        this.openClassApprove(this.selection, this.message, 'P');

    }

    openClassHandleCancel = (e) => {
        this.isVisibleOpenClass = false;
    }

    // 提前开班申请 --> 审核拒绝
    openClassHandleNO = (e) => {
        this.isVisibleOpenClass = false;
        this.openClassApprove(this.selection, this.message, 'R');
    }

    openClassApprove(annualSubPlan?: any,
        message?: string, operate?: string) {
        let selected = annualSubPlan ? [annualSubPlan] : this.selection;
        let argusTemp = { selected: null, message: '', operate: '' };
        argusTemp.selected = this.selection;
        argusTemp.message = message;
        argusTemp.operate = operate;
        this.argus = argusTemp;
        this.doService('openClassApproval', '审核');
    }

    // 提前开班申请--> 撤销申请
    openClassCancel(annualSubPlan?: AnnualSubPlan) {
        this.batchOperate('openClassCancel', '撤销申请', annualSubPlan, false);
    }

    // 提前开班申请--> 取消提前开班
    aheadOpenClassCancel(annualSubPlan?: AnnualSubPlan) {
        this.batchOperate('aheadOpenClassCancel', '取消提前开班', annualSubPlan, false);
    }

    // 提前开班申请 --> 查看审核记录
    showOpenClassApprovalInfo(annualSubPlan?: AnnualSubPlan) {
        this.isVisibleApproval = true;
        this.annualSubPlanService.getOpenClassApprovalInfo(annualSubPlan.id).subscribe(
            approvalInfos => this.approvalInfos = approvalInfos
        );
    }

    revoke(annualSubPlan?: AnnualSubPlan) {
        let selected = annualSubPlan ? [annualSubPlan] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage('请选择要撤销的计划');
            return;
        }
        let selectedArr = selected.map(it => it.approvalStatus);
        if (selectedArr.includes("N") || selectedArr.includes("C")) {
            tipMessage('选项中包含未提交或已取消的计划，请去掉勾选后重新操作！', '', 5000);
            return;
        }
        let argusTemp = { selected: null, message: '', operate: '' };
        argusTemp.selected = this.selection;
        argusTemp.message = '审核被撤销为未提交';
        argusTemp.operate = 'N';
        this.argus = argusTemp;
        this.layer.confirm(`确定要撤销选择的计划吗？`, () => {
            this.doService('approve', '撤销');
        })
    }

    private batchOperate(action: string, actionName: string, annualSubPlan?: any, keepFilter?: boolean) {
        let selected = annualSubPlan ? [annualSubPlan] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的计划`, 'warning', 3000);
            return;
        }
        let selectedArr = selected.map(it => it.approvalStatus);
        if (action == "commitToApproval") {
            if (selectedArr.includes("A") || selectedArr.includes("P") || selectedArr.includes("C")
                || selectedArr.includes("YA") || selectedArr.includes("YP")) {
                tipMessage('选项中包含待审核或已审核通过或已取消的计划，请去掉勾选后重新提交！', 'warning', 5000);
                return;
            }
            let editArr = selected.map(it => it.isEdit);
            if (editArr.includes(false)) {
                tipMessage('选项中包含不可编辑的计划，请去掉勾选后重新提交！', 'warning', 5000);
                return;
            }
        }
        if (action == "deleteBatch") {
            let planIdentifier = selected.map(it => it.planIdentifier);
            if (selectedArr.includes("A") || selectedArr.includes("P")
                || selectedArr.includes("YA") || selectedArr.includes("YP")
            ) {
                tipMessage(`选项中包含待审核或已审核通过的计划，请去掉勾选后重新删除！`, 'warning', 5000);
                return;
            }
            if (planIdentifier.includes("F")) {
                tipMessage('选项中包含分配计划，请去掉勾选后重新删除！', 'warning', 5000);
                return;
            }
        }
        // 提前开班申请提交
        if (action == 'openClassCommit') {
            let approvalStatus = selected.map(it => it.approvalStatus)
            let openClassStatus = selected.map(it => it.aheadOpening);
            let executingState = selected.map(it => it.executingState);
            let planIdentifier = selected.map(it => it.planIdentifier);
            if (planIdentifier.includes("F")) {
                tipMessage('选项中包含分配计划，分配计划不支持开班操作，请去掉勾选后重新提交！', 'warning', 5000);
                return;
            }
            if (!approvalStatus.includes("P")) {
                tipMessage('只能提前开班已审核通过的计划！', 'warning', 5000);
                return;
            }
            if (openClassStatus.includes("A") || openClassStatus.includes("P")
                || openClassStatus.includes("R")) {
                tipMessage('选项中包含待审核或已通过或被拒绝的计划，请去掉勾选后重新提交！', 'warning', 5000);
                return;
            }
            if (executingState.includes("O") || executingState.includes("E")) {
                tipMessage('选项中包含已开班或已执行的计划，请去掉勾选后重新提交！', 'warning', 5000);
                return;
            }
        }
        // 提前开班 --> 撤销申请
        if (action == 'openClassCancel') {
            let openClassStatus = selected.map(it => it.aheadOpening);
            if (!openClassStatus.includes("A")) {
                tipMessage('只能撤销待审核的计划！', 'warning', 5000);
                return;
            }
        }
        // 提前开班 --> 取消提前开班计划
        if (action == 'aheadOpenClassCancel') {
            let openClassStatus = selected.map(it => it.aheadOpening);
            if (openClassStatus.includes("A") || openClassStatus.includes("N")) {
                tipMessage('只能取消已通过或已拒绝的计划！', 'warning', 5000);
                return;
            }
        }
        // 取消计划
        if (action == 'cancel') {
            let status = selected.map(it => it.approvalStatus);
            if (status.includes("C")) {
                tipMessage('选项中包含已取消的计划，请去掉勾选后重新提交！', 'warning', 5000);
                return;
            }
        }
        this.argus = selected;
        this.layer.confirm(`确定要${actionName}选择的计划吗？`, () => {
            this.doService(action, actionName);
        })
    }

    showModal = () => {
        let selected = this.selection;
        if (!selected || selected.length == 0) {
            tipMessage('请选择要审核的计划', 'warning', 5000);
            return;
        }
        let selectedArr = this.selection.map(it => it.approvalStatus);
        if (selectedArr.includes("N") || selectedArr.includes("P") || selectedArr.includes("R")
            || selectedArr.includes("C") || selectedArr.includes("YA") || selectedArr.includes("YP")
            || selectedArr.includes("YR")) {
            tipMessage('只能选择审核状态为待审核的计划！', 'warning', 5000);
            return;
        }
        this.isVisible = true;
    }

    handleOk = (e) => {
        this.isVisible = false;
        // 通过
        this.approve(this.selection, this.message, 'P');

    }

    handleCancel = (e) => {
        this.isVisible = false;
    }

    handleNO = (e) => {
        this.isVisible = false;
        // 拒绝
        this.approve(this.selection, this.message, 'R');
    }

    approve(annualSubPlan?: any,
        message?: string, operate?: string) {
        let selected = annualSubPlan ? [annualSubPlan] : this.selection;
        let argusTemp = { selected: null, message: '', operate: '' };
        argusTemp.selected = this.selection;
        argusTemp.message = message;
        argusTemp.operate = operate;
        this.argus = argusTemp;
        this.doService('approve', '审核');
    }

    handleOkForCopy = (e) => {
        this.isVisibleForCopy = false;
        if (this.copyCounts <= 0) {
            tipMessage('只能输入大于0的整数！', 'warning');
            return;
        }
        this.copyEntity.copyCount = this.copyCounts;
        this.annualSubPlanService.copy(this.copyEntity).subscribe(
            ok => {
                tipMessage('复制成功', 'success');
                this.loadData();
            },
            err => {
                tipMessage('复制失败')
            }
        );
    }

    handleCancelForCopy = (e) => {
        this.isVisibleForCopy = false;
    }

    handleCancelHsitory = (e) => {
        this.isVisibleHistory = false;
    }

    handleCancelApproval = (e) => {
        this.isVisibleApproval = false;
    }

    showHistory(annualSubPlan?: AnnualSubPlan) {
        this.isVisibleHistory = true;
        this.annualSubPlanService.getAllHistoryPlan(annualSubPlan.id, annualSubPlan.planType).subscribe(
            annualSubPlanHistorys => this.annualSubPlanHistorys = annualSubPlanHistorys
        );
    }

    showApprovalInfo(annualSubPlan?: AnnualSubPlan) {
        this.isVisibleApproval = true;
        this.annualSubPlanService.getApprovalInfo(annualSubPlan.id, annualSubPlan.planType, annualSubPlan.planIdentifier).subscribe(
            approvalInfos => this.approvalInfos = approvalInfos
        );
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

    doService(action: string, actionName: string) {
        this.annualSubPlanService[action](this.argus).subscribe(
            ok => {
                if ("cancel" == action || "commitToApproval" == action || "aheadOpenClassCancel") {
                    if (ok.isFinish == undefined) {
                        tipMessage(`${actionName}成功`, 'success');
                    } else {
                        if (ok.isFinish) {
                            tipMessage(ok.mes, 'success');
                        } else {
                            tipMessage(ok.mes);
                        }
                    }
                } else {
                    tipMessage(`${actionName}成功`, 'success');
                }
                this.loadData();
            },
            err => {
                tipMessage(`${actionName}失败`);
                this.selection = [];
            }
        );
    }
    // 导出
    /* exportplan(event) {
        let self = this;
        this.confirmServ.confirm({
            title: '导出',
            content: this.selection.length ? '确定要导出所选项？' : '确定要导出全部信息？',
            showConfirmLoading: true,
            onOk() {
                if (self.selection.length) {
                    let paramsselection = self.getplanids(self.selection);
                    let paramsobj = {
                        ...paramsselection,
                        annualPlanId: self.id
                    }
                    // console.log(paramsobj, 3345);
                    self.annualSubPlanService.export(paramsobj).subscribe(
                        result => {
                            // console.log(result, 222)
                            self.annualSubPlanService.download(result, '')
                        }
                    );
                } else {
                    let params = { annualPlanId: self.id }
                    self.annualSubPlanService.export(params).subscribe(
                        result => {
                            // console.log(result, 223)
                            self.annualSubPlanService.download(result, '')
                        }
                    );
                }
            },
            onCancel() { }
        })

    } */
    // 获取对应培训的ids
    // <span *ngIf="row.planType == 'CT'">境内内部</span>
    // <span *ngIf="row.planType == 'CD'">境内外部</span>
    // <span *ngIf="row.planType == 'OT'">境外内部</span>
    // <span *ngIf="row.planType == 'OD'">境外外部</span>
    // <span *ngIf="row.planType == 'RE'">课件研发</span>
    // <span *ngIf="row.planType == 'EL'">其它</span>
    getplanids(array: any[]) {
        let annualPlanParams = {};
        let trainingCTIds = []; // 境内内部子计划
        let trainingCDIds = []; // 境内外部子计划
        let trainingOTODIds = []; // 境外
        let researchIds = []; // 课件研发
        let otherIds = []; // 其他子计划
        array.map((item, index) => {
            if (item.planType == 'CT') {
                trainingCTIds.push(item.id)
            } else if (item.planType == 'CD') {
                trainingCDIds.push(item.id)
            } else if (item.planType == 'OT' || item.planType == 'OD') {
                trainingOTODIds.push(item.id);
            } else if (item.planType == 'RE') {
                researchIds.push(item.id);
            } else if (item.planType == 'EL') {
                otherIds.push(item.id);
            }
        })
        annualPlanParams = {
            trainingCTIds: trainingCTIds,
            trainingCDIds: trainingCDIds,
            trainingOTODIds: trainingOTODIds,
            researchIds: researchIds,
            otherIds: otherIds
        }
        return annualPlanParams;
    }

    // 导出
    exportplan(event) {
        let self = this;
        this.confirmServ.confirm({
            title: '导出',
            content: this.selection.length ? '确定要导出所选项？' : '确定要导出全部信息？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                if (self.selection.length) {
                    let paramsselection = self.getplanids(self.selection);
                    let paramsobj = {
                        ...paramsselection,
                        annualPlanId: self.id
                    }
                    // console.log(paramsobj, 3345);
                    self.annualSubPlanService.export(paramsobj).subscribe(
                        result => {
                            // console.log(result, 222)
                            self.annualSubPlanService.exportdownload()
                        }
                    );
                } else {
                    let params = { annualPlanId: self.id }
                    self.annualSubPlanService.export(params).subscribe(
                        result => {
                            // console.log(result, 223)
                            self.annualSubPlanService.exportdownload()
                        }
                    );
                }
            },
            onCancel() { }
        })

    }
    // 获取对应培训的ids
    /* getplanids(array: any[]) {
        let annualPlanParams = {};
        let trainingCTIds = []; // 境内内部子计划
        let trainingCDIds = []; // 境内外部子计划
        let trainingOTODIds = []; // 境外
        let researchIds = []; // 课件研发
        let otherIds = []; // 其他子计划
        array.map((item, index) => {
            if (item.planType == 'CT') {
                trainingCTIds.push(item.id)
            } else if (item.planType == 'CD') {
                trainingCDIds.push(item.id)
            } else if (item.planType == 'OT' || item.planType == 'OD') {
                trainingOTODIds.push(item.id);
            } else if (item.planType == 'RE') {
                researchIds.push(item.id);
            } else if (item.planType == 'EL') {
                otherIds.push(item.id);
            }
        })
        annualPlanParams = {
            trainingCTIds: trainingCTIds,
            trainingCDIds: trainingCDIds,
            trainingOTODIds: trainingOTODIds,
            researchIds: researchIds,
            otherIds: otherIds
        }
        return annualPlanParams;
    } */
    getMoneyType(value) {
        if (value) {
            // tslint:disable-next-line:no-construct
            return new Number(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        } else {
            return 0
        }
    }
    goToEdit(id, type, number) {
        this.router.navigate([`/planning/annualplan/${this.id}/childrenplan/${id}/${type}/${number}/edit`])
    }
}



