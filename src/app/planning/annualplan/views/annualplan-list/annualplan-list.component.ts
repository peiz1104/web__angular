import { Component, OnInit } from '@angular/core';
import { AnnualPlan } from './../../entity/annualplan'
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from './../../../../core/entity/pagination';
import { NzModalService } from 'ng-zorro-antd';
import { AnnualplanService } from './../../service/annualplan.service';
import { ApprovalInfo } from './../../entity/approvalinfo'
import { UserGroup } from './../../../../system/entity/user-group';
import { AccountService } from 'app/account/service/account.service';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-annualplan-list',
    templateUrl: './annualplan-list.component.html',
    styleUrls: ['./annualplan-list.component.scss']

})

export class AnnualplanListComponent implements OnInit {
    searchBy: {
        approvalStatus?: string,
        name?: string,
        userGroup?: UserGroup[]
    } = {};
    isVisible: boolean = false;
    approvalInfoSelection: ApprovalInfo[];
    nameOfTheYearValue: any = "";
    pageIndex: number = 1;
    options = [];
    selectedOption;
    userGroup: any = [];
    _checked: boolean = false;
    total: number = 50;
    selectType: any;
    indexPage: number;
    annualPlans: any;
    id: any = null;
    isVisibleApproval: boolean = false;
    approvalInfos: any;
    message: string;
    argus: any;
    annualPlan: any;
    nzPageSize: number = 6;
    _isSpinning: boolean = false;
    approvalColumns = [
        { title: '审核人', tpl: 'colcreatedbydisplayname' },
        { title: '审核机构', tpl: 'colusergroupname' },
        { title: '审核时间', tpl: 'colcreateddate' },
        { title: '审核状态', tpl: 'colapprovalstatus' },
        { title: '审核意见', tpl: 'colcomments' }
    ];
    constructor(
        private annualplanService: AnnualplanService,
        private layer: CuiLayer,
        private fb: FormBuilder,
        private nzModalService: NzModalService,
        private accountInfoService: AccountService,
    ) {

    }


    ngOnInit() {
        /* let data = {
            name: '',
            approvalStatus: '',
            orgId: this.userGroup.length ? this.userGroup.map(it => it.id) : this.userGroup.id
        }
        let page = {
            size: 6,
            number: 0
        }
        this.loadData(data, page);
 */
        this.options = [
            { value: '', label: '全部' },
            { value: 'N', label: '未提交' },
            { value: 'A', label: '待审核' },
            { value: 'P', label: '已通过' },
            { value: 'R', label: '已拒绝' }
        ];
        this.selectedOption = this.options[0];
        this.accountInfoService.findUser().subscribe(
            user => {
                console.log(11)
                console.log(user)
                let data = {}
                if (user.managerGroup) {
                    this.userGroup = user.managerGroup;
                    // console.log(this.userGroup.length)
                    data = {
                        name: this.nameOfTheYearValue,
                        approvalStatus: this.selectedOption.value,
                        orgId: this.userGroup.length ? this.userGroup.map(it => it.id) : this.userGroup.id
                    }
                } else {
                    data = {
                        name: this.nameOfTheYearValue,
                        approvalStatus: this.selectedOption.value,
                    }
                }

                let page = {
                    size: this.nzPageSize,
                    number: 0
                }
                this.loadData(data, page);
            }
        )
    }

    loadData(data, page) {
        this._isSpinning = true;
        this.id = null;
        this.annualplanService.getAllOfPage(data, page).subscribe(
            annualPlans => {
                this.annualPlans = annualPlans.content;
                this.total = annualPlans.totalElements
                console.log(this.annualPlans)
                this._isSpinning = false;
            }
        );
    }

    // 审核意见 modal
    handleCancelApproval = (e) => {
        this.isVisibleApproval = false;
    }

    // 研发机动预算
    showResearchBudget(id: number) {
        this.annualplanService.getResearchBudget(id).subscribe(
            budget => {
                this.nzModalService.info({
                    title: "研发机动预算",
                    content: budget.researchBudget + '元',
                    zIndex: 1003,
                });
            }
        );
    }

    // 删除
    delete(item) {
        console.log(item)
        if (item.publishStatus == true) {
            tipMessage('已发布的年度计划不能删除！', 'warning', 5000);
        } else {
            this.annualplanService.getUnPassSubPlanCount(item.id).subscribe(
                count => {
                    if (count != 1) {
                        // 说明年度计划下存在子计划
                        tipMessage('该年度计划下已填报了子计划，不能删除！', 'warning', 5000);
                        return;
                    } else {
                        this.layer.confirm(`确定要删除选择的年度计划吗？`, () => {
                            this.doServiceDelete('delete', '删除', item.id);
                        });
                    }
                }
            )
        }
    }

    doServiceDelete(action: string, actionName: string, id: number) {
        this.annualplanService[action](id).subscribe(
            ok => {
                tipMessage(`${actionName}成功`, 'success', 5000);
                let data = {
                    name: '',
                    approvalStatus: ''
                }
                let page = {
                    size: this.nzPageSize,
                    number: 0
                }
                this.loadData(data, page);
                if (action == 'approve') {
                    this.message = '';
                }
            },
            err => tipMessage(`${actionName}失败`)
        );
    }

    // 审核意见
    showApprovalInfo(annualPlan?: AnnualPlan) {
        this.isVisibleApproval = true;
        this.annualplanService.getApprovalInfo(annualPlan.id).subscribe(
            approvalInfos => this.approvalInfos = approvalInfos
        );
    }

    // 培训机动预算
    handelTrainingBudget = (id) => {
        this.annualplanService.getTrainingBudget(id).subscribe(
            budget => {
                this.nzModalService.info({
                    title: "培训机动预算",
                    content: budget.trainingBudget + '元',
                    zIndex: 1003,
                });
            }
        );
    }

    // 查询
    handelClickSeach = () => {
        console.log(this.userGroup)
        this.pageIndex = 1;
        let data = {
            name: this.nameOfTheYearValue,
            approvalStatus: this.selectedOption.value,
            orgId: this.userGroup.length ? this.userGroup.map(it => it.id) : this.userGroup.id
        }
        let page = {
            size: this.nzPageSize,
            number: 0
        }
        this.loadData(data, page);
    }

    // checkbox
    handelChecked = (e, data) => {
        console.log(e);
        this.annualPlan = data;
        this.id = data.id
    }

    // 当前页数
    handelChangePage = (e) => {
        console.log(e)
        let indexPag = e - 1;
        let data = {
            name: this.nameOfTheYearValue,
            approvalStatus: this.selectedOption.value,
            orgId: this.userGroup.map(it => it.id)
        }
        let page = {
            size: this.nzPageSize,
            number: indexPag
        }
        this.loadData(data, page);
    }

    // 发布计划填报
    publish() {
        if (this.id == null) {
            tipMessage('请选择要发起的年度计划！', 'error', 5000);
        } else if (this.annualPlan.publishStatus) {
            tipMessage('请选择未发起填报的年度计划！', 'error', 5000);
        } else {
            this.layer.confirm(`确定要发起选择的年度计划吗？`, () => {
                this.pageIndex = 1
                this.doService('publishStatus', '发起', );
            });
        }

    }

    // 取消计划填报
    disPublish = () => {
        if (this.id == null) {
            tipMessage('请选择要取消的年度计划！', '', 5000);
        } else if (!this.annualPlan.publishStatus) {
            tipMessage('请选择已发起填报的年度计划！', '', 5000);
        } else {
            this.layer.confirm(`确定要取消已发布选择的年度计划吗？`, () => {
                this.pageIndex = 1
                this.doService('disPublishStatus', '取消发布', );
            });
        }
    }

    // 提交计划审核
    commit = () => {
        if (this.id == null) {
            tipMessage('请选择要提交审核的年度计划！', '', 5000);
        } else if (this.annualPlan.approvalStatus == 'A' || this.annualPlan.approvalStatus == 'P') {
            tipMessage('待审核或已通过的年度计划不能重复提交！', 'warning', 5000);
        } else if (this.annualPlan.publishStatus == false) {
            tipMessage('未发布的年度计划不能提交！', 'warning', 5000);
        } else {
            this.annualplanService.getUnPassSubPlanCount(this.id).subscribe(
                count => {
                    if (count == 1) {
                        tipMessage('该年度计划下没有子计划，无法提交！', 'warning', 5000);
                        return;
                    } else if (count == 2) {
                        tipMessage('尚有子计划未通过审核或未取消，无法提交！', 'warning', 5000);
                        return;
                    }
                    this.layer.confirm(`确定要提交选择的年度计划吗？`, () => {
                        this.doService('commit', '提交');
                    });
                }
            );
        }
    }


    // 审核
    approve = () => {
        if (this.id == null) {
            tipMessage('请选择要审核的年度计划！', 'error', 5000);
        } else if (this.annualPlan.approvalStatus != 'A') {
            tipMessage('只能审核状态为待审核年度计划！', 'warning', 5000);
        } else {
            this.isVisible = true;
        }
    }

    // 取消
    handleCancel = (e) => {
        this.isVisible = false;
    }

    // 确认
    handleOk = (e) => {
        this.isVisible = false;
        this.approvePlan(this.message, 'P');
    }

    // 拒绝
    handleNO = (e) => {
        this.isVisible = false;
        // 拒绝
        this.approvePlan(this.message, 'R');
    }

    approvePlan(message: string, operate: string) {
        let argusTemp = { selected: [], message: '', operate: '' };
        argusTemp.selected = [this.annualPlan];
        argusTemp.message = message;
        argusTemp.operate = operate;
        this.id = argusTemp;
        this.doService('approve', '审核');
    }

    // 撤销
    revoke = () => {
        if (this.id == null) {
            tipMessage('请选择要撤销的年度计划！', 'error', 5000);
        } else if (this.annualPlan.approvalStatus == 'N') {
            tipMessage('未提交的年度计划不能撤销审核！', 'warning', 5000);
        } else {
            this.layer.confirm(`确定要撤销已审核选择的年度计划吗？`, () => {
                this.pageIndex = 1
                this.doService('revoke', '撤销', );
            });
        }
    }

    doService(action: string, actionName: string) {
        this.annualplanService[action](this.id).subscribe(
            ok => {
                tipMessage(`${actionName}成功`, 'success', 2000);
                let data = {
                    name: '',
                    approvalStatus: '',
                    orgId: this.userGroup.length ? this.userGroup.map(it => it.id) : this.userGroup.id
                }
                let page = {
                    size: this.nzPageSize,
                    number: 0
                }
                this.loadData(data, page);
                if (action == 'approve') {
                    this.message = '';
                }
            },
            err => tipMessage(`${actionName}失败`)
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
    getMoneyType(value) {
        if (value) {
            // tslint:disable-next-line:no-construct
            return new Number(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        } else {
            return 0
        }
    }

}
