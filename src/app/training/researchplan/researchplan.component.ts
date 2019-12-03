import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageModule, NzModalService } from 'ng-zorro-antd';
import { TrainingClassApiService } from '../service/training-class-api.service';
import { Pagination } from 'app/core/entity/pagination';
import { UserGroup } from './../entity/user-group';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-researchplan',
    templateUrl: './researchplan.component.html',
    styleUrls: ['./researchplan.component.scss']
})
export class ResearchplanComponent implements OnInit {
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    nowYear = new Date().getFullYear();
    searchBy: {
        name?: string,
        planYear?: any,
        userGroup?: UserGroup[],
        executingState?: any,
        planTypes?: any,
        'userGroupId'?: any
    } = {};
    columns = [
        { title: '子计划编号', data: 'projectNumber' },
        { title: '子计划名称', tpl: 'planname' },
        { title: '计划分类', tpl: 'planType' },
        { title: '计划对应类型', data: 'trainingSchoolPlanType' },
        { title: '填报单位', tpl: 'name' },
        { title: '培训时间', data: 'trainingDate' },
        { title: '培训地点', data: 'trainingPlace' },
        { title: '填报人', data: 'displayName' },
        { title: '填报日期', tpl: 'createdDate' },
        { title: '审核状态', tpl: 'colapprovalstatus' },
        { title: '执行状态', tpl: 'executingState' },
        { title: '计划标识', tpl: 'colplanidentifier' }
    ]
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            isTrainingSchoolPlan: true,
            // knowledgeId: this.selectTreeId
        };
        if (this.searchBy.userGroup != null) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
        }
        params['name'] = this.searchBy.name || '';
        if (this.searchBy.planTypes) {
            params['planTypes'] = this.searchBy.planTypes || '';
        }
        params['planYear'] = this.searchBy.planYear || '';
        params['executingState'] = this.searchBy.executingState || '';
        if (this.searchBy['userGroupId'] != null) {
            params['userGroup.id'] = this.searchBy['userGroupId'].id
        }
        this.serviceapi.getResearchplanlist(params).subscribe(
            res => {
                this.spinning = false;
                this.testListData = res;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                this._searchForm.reset();
                this.selection = [];
                return tipMessage(err);
            }
        )
    }
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private serviceapi: TrainingClassApiService,
        private fb: FormBuilder,
        private confirmServ: NzModalService,
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            name: [],
            planTypes: [],
            userGroup: [],
            planYear: [this.nowYear],
            executingState: [null],
            'userGroupId': []
        })
        this.loadData();
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchBy = value;
        this.loadData();
        return;
    }
    addtrainplan($event) {
        if (this.selection.length) {
            let self = this;
            let ids = this.getselectionids(this.selection);
            let judge = this.judgexecutingState(this.selection);
            this.confirmServ.confirm({
                title: '生成培训班',
                content: '你确定要这些项生成培训班？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.serviceapi.createtrainingplan(ids).subscribe(
                        res => {
                            tipMessage('生成培训班成功！', 'success');
                            self.loadData();
                        },
                        err => {
                            return tipMessage(err);
                        }
                    )
                },
                onCancel() { }
            })
        } else {
            return tipMessage('请选择要操作的项！');
        }
    }

    // 判断执行状态如果已执行则给以提示
    judgexecutingState(array?: any[]) {
        return array.some((item, index) => {
            return item.executingState == 'E'
        })
    }
    // 审核状态只有已通过的才可以生成培训班计划
    getselectionids(array?: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids
    }
    goView(annualPlanId, type, id, view, plantype) {
        this.route.navigate([`/planning/annualplan/${annualPlanId}/childrenplan/${id}/${type}/view`], { queryParams: { type: plantype } })
    }

}
