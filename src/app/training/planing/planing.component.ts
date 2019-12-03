import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';
import { UserGroup } from './../entity/user-group';
import { TrainingClassApiService } from './../service/training-class-api.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';
import { NzToolTipModule } from 'ng-zorro-antd/src/tooltip/nz-tooltip.module';
// import { setTimeout } from 'timers';

@Component({
    selector: 'spk-planing',
    templateUrl: './planing.component.html',
    styleUrls: ['./planing.component.scss']
})
export class PlaningComponent implements OnInit {
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    nowYear = new Date().getFullYear();
    annualPlanId: any;
    addplanstatus: boolean = false;
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
        { title: '计划类型', tpl: 'planType' },
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
            annualPlanId: this.annualPlanId
            // knowledgeId: this.selectTreeId
        };
        if (this.searchBy.userGroup != null) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
        }
        params['name'] = this.searchBy.name || '';
        if (this.searchBy.planTypes) {
            params['planTypes'] = this.searchBy.planTypes || '';
        }
        if (this.searchBy['userGroupId'] != null) {
            params['userGroup.id'] = this.searchBy['userGroupId'].id
        }
        params['planYear'] = this.searchBy.planYear || this.nowYear;
        params['executingState'] = this.searchBy.executingState || '';
        this.trainingservice.getplanlist(params).subscribe(
            res => {
                // console.log(res);
                this.spinning = false;
                this.testListData = res;
                // this._searchForm.reset();
                this.judgeCheckable();
                this.selection = [];
            },
            err => {
                this.spinning = false;
                this.selection = [];
                return tipMessage(err);
            }
        )
        // console.log(params, 4356)

    }
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private confirmServ: NzModalService,
        private trainingservice: TrainingClassApiService
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
        this.trainingservice.getAnnualPlanId().subscribe(
            map => {
                if (map.id) {
                    this.annualPlanId = map.id;
                    this._searchForm.get("userGroupId").setValue({
                        id: map.userGroupId,
                        name: map.userGroupName
                    })
                    this.searchBy.userGroupId = {
                        id: map.userGroupId,
                        name: map.userGroupName
                    }
                    this.loadData();
                } else {
                    this.spinning = false;
                    this.testListData = null;
                    // this._searchForm.reset();
                    this.selection = [];
                }
            },
            err => {
                tipMessage(err);
            }
        )
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        console.log(value, 44)
        this.searchBy = value;
        this.loadData();
        return;
    }
    // 按计划生成培训班
    addtrainplan(event) {
        if (this.selection.length) {
            let self = this;
            let ids = this.getselectionids(this.selection);
            let judge = this.judgexecutingState(this.selection);
            if (judge) {
                return tipMessage('请取消已执行或已开班的选项！', '', 4000);
            } else {
                this.confirmServ.confirm({
                    title: '生成培训班',
                    content: '您确定要生成培训班？',
                    showConfirmLoading: true,
                    zIndex: 1003,
                    onOk() {
                        self.addplanstatus = true;
                        self.trainingservice.createtrainingplan(ids).subscribe(
                            res => {
                                // console.log(res);
                                tipMessage('生成培训班成功！', 'success');
                                self.loadData();
                                self.addplanstatus = false;
                            },
                            err => {
                                self.addplanstatus = false;
                                return tipMessage(err);
                            }
                        )
                    },
                    onCancel() { }
                })
            }

        } else {
            return tipMessage('请选择要操作的项!');
        }

    }
    // 判断执行状态如果已执行则给以提示
    judgexecutingState(array?: any[]) {
        return array.some((item, index) => {
            return item.executingState == 'E' || item.executingState == 'O'
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
    // 已开班已执行不可选择
    judgeCheckable() {

        this.testListData.content.map((item) => {
            if (item.executingState == 'O' || item.executingState == 'E') {
                item.checkable = false;
            }
        })
    }

}
