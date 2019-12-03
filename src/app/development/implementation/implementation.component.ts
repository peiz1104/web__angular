import { Component, OnInit } from '@angular/core';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { ResearchPlan } from "app/planning/annualplan/entity/researchplan";
import { ImplementationService } from "app/development/implementation/service/implementation.service";
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserGroup } from 'app/system/entity/user-group';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-implementation',
    templateUrl: './implementation.component.html',
    styleUrls: ['./implementation.component.scss']
})
export class ImplementationComponent implements OnInit {
    _searchForm: FormGroup;
    pagination: CuiPagination;
    columns;
    plan: ResearchPlan[];
    loading: boolean = true;
    isLoading: boolean = false;
    showSpinning: boolean = false;
    searchtext;
    detailData: any = {};
    selected: number[];
    selection: any[] = [];
    isVisible: boolean = false;
    year: any = new Date().getFullYear();
    yearArray: any = [];
    searchBy: {
        name?: string,
        devType?: any,
        createBy?: any,
        userGroup?: any,
        years?: any

    } = {};


    constructor(private implementationService: ImplementationService,
        private modal: NzModalService,
        private dialog: CuiLayer,
        private fb: FormBuilder,
        private router: Router,
        private traingapiServer: AuthService,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '计划名称', tpl: 'planName', styleClass: 'text-center' },
            { title: '填报机构', tpl: 'userGroupName', styleClass: 'text-center' },
            { title: '创建人', tpl: 'createdBy', styleClass: 'text-center' },
            { title: '创建时间', tpl: 'createdDate', styleClass: 'text-center' },
            { title: '修改人', tpl: 'updateBy', styleClass: 'text-center' },
            { title: '执行状态', tpl: 'executingStateCol', styleClass: 'text-center' },
            { title: '最后修改时间', tpl: 'lastModifiedDate', styleClass: 'text-center' }
        ];
    }

    ngOnInit() {

        this._searchForm = this.fb.group({
            name: [''],
            devType: [''],
            createBy: [''],
            userGroup: [''],
            years: [this.year]
        })
        this.searchBy.years = this.year;
        this.traingapiServer.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.userGroup = [user.managerGroup];
                    this._searchForm.get('userGroup').setValue([user.managerGroup])
                }
                this.loadData();
            }
        )
        this.judgeYear(this.year);
    }

    // 判断年份
    judgeYear(year) {
        for (let i = 0; i <= year - 2016; i++) {
            this.yearArray.push(2017 + i);
        }

    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : ''
        };
        if (this.searchBy.createBy) {
            params['createdBy.displayName'] = this.searchBy.createBy
        }
        if (this.searchBy.name) {
            params['name'] = this.searchBy.name
        }
        if (this.searchBy.devType) {
            params['executingState'] = this.searchBy.devType
        }
        if (this.searchBy.userGroup) {
            let userGroupArr = [];
            if (Object.prototype.toString.call(this.searchBy.userGroup) == "[object Object]") {
                params['userGroupIds'] = [this.searchBy.userGroup.id];
            } else {
                this.searchBy.userGroup.map((item) => {
                    userGroupArr.push(item.id)
                })
                params['userGroupIds'] = userGroupArr;
            }

        }
        if (this.searchBy.years) {
            params['years'] = this.searchBy.years;
        }
        this.loading = true;
        this.implementationService.pageList(params).subscribe(
            (pag) => {
                this.pagination = pag;
                this.plan = pag.content;
                this.loading = false;
            }
        );
    }

    searchData(event, value) {
        this.searchBy = value;
        this.loadData();
    }

    namePath(str) {
        if (str) {
            return str.replace(/,/g, '/');
        }
    }

    addProject() {
        if (this.selection.length) {
            let self = this;
            let ids = this.getselectionids(this.selection);
            let judge = this.judgexecutingState(this.selection);
            if (judge) {
                return tipMessage('不能选择已执行状态的可执行计划！', '', 4000);
            } else {
                this.isLoading = true;
                this.implementationService.addProject(ids).subscribe(
                    ok => {
                        tipMessage('生成成功！', 'success');
                        this.isLoading = false;
                        this.loadData();
                    },
                    err => {
                        this.dialog.confirm(err);
                        this.isLoading = false;
                    }
                );
            }
        } else {
            return tipMessage('请选择要生成项目的可执行计划!', '', 3000);
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


    // 查看详情
    showModalDetail(value) {
        this.isVisible = true;
        this.showSpinning = true;
        this.implementationService.getsinglemessage(value.id).subscribe(
            result => {
                this.detailData = result;
                this.showSpinning = false;
            }
        )

    }

    handleOk(event) {
        this.isVisible = false;

    }
    handleCancel(event) {
        this.isVisible = false;
    }





}
