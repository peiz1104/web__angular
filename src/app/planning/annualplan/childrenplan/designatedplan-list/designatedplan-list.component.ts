import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnualSubPlan } from './../../entity/annualsubplan'
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from './../../../../core/entity/pagination';
import { DesignatedPlanService } from './../../service/designatedplan.service';
import { UserGroup } from './../../../../system/entity/user-group';
import { NzModalService } from 'ng-zorro-antd';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { AnnualSubPlanService } from './../../service/annualsubplan.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-designatedplan-list',
    templateUrl: './designatedplan-list.component.html',
    styleUrls: ['./designatedplan-list.component.scss']
})
export class DesignatedPlanListComponent implements OnInit {
    searchBy: {
        annualId?: number, // 年度计划id
        name?: string, // 计划名称
        userGroup?: UserGroup, // 填报单位
        isQuote?: boolean, // 是否引用
    } = {};
    annualSubPlans: Pagination<AnnualSubPlan>;
    selection: AnnualSubPlan[] = [];
    annualPlanId: number;
    columns2 = [
        { title: '计划编号', tpl: 'colprojectnumber' },
        { title: '计划名称', tpl: 'colname' },
        { title: '计划类型', tpl: 'colplantype' },
        { title: '预算 (元)', tpl: 'coltrainingbudget' },
        { title: '填报机构', tpl: 'colgroupname' },
        { title: '填报人', tpl: 'coldisplayname' },
        { title: '填报时间', tpl: 'colcreateddate' },
        { title: '是否引用', tpl: 'colQuote' }
    ];
    argus: any;
    inputValue: string;
    validateForm: FormGroup;
    loading: boolean = true;
    id: number;
    options = [];
    selectedOption;
    inputSearchValue: string;

    constructor(private designatedPlanService: DesignatedPlanService,
        private layer: CuiLayer,
        private fb: FormBuilder,
        private router: Router,
        private annualSubPlanService: AnnualSubPlanService,
        private confirmServ: NzModalService,
        private routerIonfo: ActivatedRoute) {
    }

    ngOnInit() {
        setTimeout(_ => {
            this.options = [
                { value: null, label: '全部' },
                { value: false, label: '否' },
                { value: true, label: '是' },
            ];
            this.selectedOption = this.options[0];
        }, 100);
        this.id = this.routerIonfo.snapshot.params.id;
        this.annualPlanId = this.routerIonfo.snapshot.params.id;
        this.validateForm = this.fb.group({
            annualId: [this.annualPlanId],
            name: ['', []],
            userGroup: [null, []],
        });
        this.loadData();
    }

    _submitForm = ($event) => {
        console.log(this.inputSearchValue, this.selectedOption.value)
        this.searchBy.name = this.inputSearchValue;
        this.searchBy.isQuote = this.selectedOption.value
        this.loadData();
    };

    handelChooseCourse = (e) => {
        console.log(e)
    }
    //   导出
    // 导出
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
    exportplan(event) {
        let self = this;
        this.confirmServ.confirm({
            title: '导出',
            content: this.selection.length ? '确定要导出所选项？' : '确定要导出全部信息？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                if (self.selection.length) {
                    // let paramsselection = self.getplanids(self.selection);
                    let paramsselection = self.selection;
                    let planIds = [];
                    paramsselection.map((item) => {
                        planIds.push(item.id)
                    })
                    let paramsobj = {
                        planIds: planIds,
                        annualPlanId: self.id
                    }
                    // console.log(paramsobj, 3345);
                    self.annualSubPlanService.exportPlan(paramsobj).subscribe(
                        result => {
                            // console.log(result, 222)
                            self.annualSubPlanService.exportdownloadPlan()
                        }
                    );
                } else {
                    let params = { annualPlanId: self.id }
                    self.annualSubPlanService.exportPlan(params).subscribe(
                        result => {
                            // console.log(result, 223)
                            self.annualSubPlanService.exportdownloadPlan()
                        }
                    );
                }
            },
            onCancel() { }
        })

    }
    loadData(page?: Pagination<any>) {
        console.log(page)
        this.loading = true;
        this.designatedPlanService.getAllOfPage(this.getSearchParams(), page).subscribe(
            annualSubPlans => {
                this.annualSubPlans = annualSubPlans;
                console.log(this.annualSubPlans)
                this.loading = false;
            }
        );
    }
    getSearchParams() {
        if (this.searchBy) {
            let params = {};
            params['annualId'] = this.annualPlanId;
            params['name'] = this.searchBy.name;
            params['isQuote'] = this.searchBy.isQuote;
            if (this.searchBy.userGroup) {
                params['orgIds'] = this.searchBy.userGroup.id;
            }
            return params;
        }
        return null;
    }

    introduce() {
        this.batchOperate('introduce', '引用', this.annualPlanId, false);
    }

    private batchOperate(action: string, actionName: string, annualPlanId: number,
        keepFilter?: boolean) {
        let selected = this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的计划`, 'warning');
            return;
        }
        this.argus = selected;
        this.layer.confirm(`确定要${actionName}选择的计划吗？`, () => {
            this.designatedPlanService[action](this.argus, annualPlanId).subscribe(
                ok => {
                    tipMessage(`${actionName}成功`, 'success');
                    this.toList();
                },
                err => {
                    tipMessage(`${actionName}失败`);
                    this.selection = [];
                }
            );
        });
    }

    toList() {
        this.router.navigate(['../'], { relativeTo: this.routerIonfo });
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



