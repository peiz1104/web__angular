import { Component, OnInit } from '@angular/core';
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from './../../../../core/entity/pagination';
import { DesignatedPlan } from './../../entity/designatedplan'
import { DesignatedPlanService } from './../../service/designatedplan.service';
import { UserGroup } from './../../../../system/entity/user-group';

import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';


@Component({
    selector: 'spk-designatedplan-list',
    templateUrl: './designatedplan-list.component.html',
    styleUrls: ['./designatedplan-list.component.scss']

})

export class DesignatedPlanListComponent implements OnInit {
    searchBy: {
        name?: string,
        approvalStatus?: string,
        userGroup?: UserGroup[]
    } = {};
    designatedPlans: Pagination<DesignatedPlan>;
    selection: DesignatedPlan[];
    columns = [
        { title: '计划名称', tpl: 'colname', styleClass: 'text-center ' },
        { title: '所属机构', tpl: 'colorgname', styleClass: 'text-center ' },
        { title: '发起人', tpl: 'colusername', styleClass: 'text-center ' },
        { title: '发起时间', tpl: 'colcreateddate', styleClass: 'text-center ' }
    ];
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
        this.loadData();
    };


    constructor(private designatedPlanService: DesignatedPlanService,
        private layer: CuiLayer, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            name: ['', []],
            approvalStatus: ['', []],
            userGroup: [null]
        });
        this.searchBy.name = '';
        this.searchBy.approvalStatus = '';
        this.designatedPlanService.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.userGroup = [user.managerGroup];
                }
                this.loadData();
            }
        )
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.designatedPlanService.getAnnualPlan(this.getSearchParams(), page).subscribe(
            designatedPlans => {
                this.designatedPlans = designatedPlans;
                this.loading = false;
            }
        );
    }

    getSearchParams() {
        if (this.searchBy) {
            let params = {};
            params['name'] = this.searchBy.name;
            params['approvalStatus'] = this.searchBy.approvalStatus;
            if (this.searchBy.userGroup != null) {
                params['orgId'] = this.searchBy.userGroup.map(it => it.id);
            }
            return params;
        }
        return null;
    }

}



