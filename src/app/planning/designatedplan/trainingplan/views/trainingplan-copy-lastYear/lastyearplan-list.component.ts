import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingPlan } from '../../entity/trainingplan';
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from './../../../../../core/entity/pagination';
import { TrainingPlanService } from '../../service/trainingplan.service';
import { UserGroup } from './../../../../../system/entity/user-group';
import { tipMessage } from 'app/account/entity/message-tip';

import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-lastyearplan-list',
    templateUrl: './lastyearplan-list.component.html',
    styleUrls: ['./lastyearplan-list.component.scss']
})
export class TrainingPlanCopyComponent implements OnInit {
    searchBy: {
        annualPlanId?: number, // 年度计划id
        name?: string, // 计划名称
        approvalStatus?: string, // 培训时间
        createBy?: string;
        isQuote?: string;
    } = {};
    annualSubPlans: Pagination<TrainingPlan>;
    selection: TrainingPlan[];
    id: number;
    columns2 = [
        { title: '指定计划编号', tpl: 'colprojectnumber' },
        { title: '指定计划名称', tpl: 'colname' },
        // { title: '计划类型', tpl: 'colplantype' },
        { title: '预算 (元)', tpl: 'coltrainingbudget' },
        { title: '填报机构', tpl: 'colgroupname' },
        { title: '填报人', tpl: 'coldisplayname' },
        { title: '填报时间', tpl: 'colcreateddate' }
    ];
    argus: any;
    inputValue: string;
    validateForm: FormGroup;
    loading: boolean = true;

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


    constructor(private trainingPlanService: TrainingPlanService,
        private layer: CuiLayer,
        private fb: FormBuilder,
        private router: Router,
        private routerIonfo: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.routerIonfo.snapshot.params.id;
        this.searchBy.annualPlanId = this.id;
        this.validateForm = this.fb.group({
            name: ['', []],
            approvalStatus: ['', []],
            isQuote: ['', []],
            createBy: ['', []],
        });
        this.loadData();
    }
    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.trainingPlanService.getAllOfPageNew(this.getSearchParams(), page).subscribe(
            trainingPlan => {
                this.annualSubPlans = trainingPlan;
                this.loading = false;
            }
        );
    }
    getSearchParams() {
        if (this.searchBy) {
            let params = {};
            params['annualPlanId'] = this.searchBy.annualPlanId;
            params['name'] = this.searchBy.name;
            params['approvalStatus'] = this.searchBy.approvalStatus;
            params['createBy'] = this.searchBy.createBy;
            params['isQuote'] = this.searchBy.isQuote;
            return params;
        }
        return null;
    }

    copy() {
        this.batchOperate('copyLastYear', '复制', this.id, false);
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
            console.log('111', this.argus)
            console.log('222', annualPlanId)
            this.trainingPlanService[action](this.argus, annualPlanId).subscribe(
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

    toList() {
        this.router.navigate(['../'], { relativeTo: this.routerIonfo });
    }

}



