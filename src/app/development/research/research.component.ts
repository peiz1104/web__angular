import { Component, OnInit } from '@angular/core';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { GreenDreamProject } from "app/development/research/entity/green-dream-project";
import { ResearchService } from "app/development/research/service/research.service";
import { NzModalService } from 'ng-zorro-antd';
import { UserGroup } from 'app/system/entity/user-group';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { directiveDef } from '@angular/core/src/view/provider';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-research',
    templateUrl: './research.component.html',
    styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {
    _searchForm: FormGroup;
    pagination: CuiPagination;
    columns;
    plan: GreenDreamProject[];
    loading: boolean = true;
    isLoading: boolean = false;
    selected: number[];
    selection: any[] = [];
    isVisible: boolean = false;
    detailData: any = {};
    researchDetailData: any;
    showSpinning: boolean = false;
    year: any = new Date().getFullYear();
    yearArray: any = [];
    searchBy: {
        name?: string,
        years?: any,
        devType?: any,
        createBy?: any,
        userGroup?: any,
    } = {};


    constructor(private researchService: ResearchService,
        private modal: NzModalService,
        private dialog: CuiLayer,
        private traingapiServer: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '研发项目名称', tpl: 'planName' },
            { title: '填报机构', tpl: 'userGroupName' },
            { title: '填报人', tpl: 'createdByName' },
            { title: '填报时间', data: 'createdDate', styleClass: 'text-center' },
            { title: '修改时间', data: 'lastModifiedDate', styleClass: 'text-center' },
            { title: '项目状态', tpl: 'DevStatusCol', styleClass: 'text-center' },
            { title: '编辑', tpl: 'devedit', styleClass: 'text-center' },
            { title: '研发阶段', tpl: 'actions', styleClass: 'text-center' }
        ];
    }

    ngOnInit() {
        this._searchForm = this.fb.group({
            name: [''],
            years: [this.year],
            devType: [''],
            createBy: [''],
            userGroup: [''],
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
        // console.log(this.yearArray);

    }
    // 判断年份
    judgeYear(year) {
        // console.log(444)
        for (let i = 0; i <= year - 2016; i++) {
            this.yearArray.push(2017 + i);
        }

    }
    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            name: this.searchBy.name ? this.searchBy.name : '',
            years: this.searchBy.years ? this.searchBy.years : '',
            devStatus: this.searchBy.devType ? this.searchBy.devType : '',
            'createdBy.displayName': this.searchBy.createBy ? this.searchBy.createBy : '',
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            sort: page && page.sort ? page.sort : ''
        };
        if (this.searchBy.userGroup) {
            if (Object.prototype.toString.call(this.searchBy.userGroup) == "[object Object]") {
                params['userGroupIds'] = [this.searchBy.userGroup.id]
            } else {
                let userGroupArr = [];
                this.searchBy.userGroup.map((item) => {
                    userGroupArr.push(item.id)
                })
                params['userGroupIds'] = userGroupArr;
            }

        }
        this.loading = true;
        this.researchService.pageList(params).subscribe(
            (pag) => {
                this.pagination = pag;
                this.plan = pag.content;
                this.loading = false;
            }
        );
    }
    // 表单提交
    _submitForm(event, value) {
        // console.log(value);
        this.searchBy = value;
        this.loadData();
    }

    // quxiao
    confirmcancel(value) {

    }
    confirmok(value) {

        this.researchService.devcancel(value.id, { flag: 'CANCEL' }).subscribe(
            res => {
                tipMessage('取消成功', 'success');
                this.loadData();
            },
            err => {
                return tipMessage(err);
            }
        )
    }
    // 结项
    confirmcancelend(value) { }
    confirmend(value) {
        this.researchService.devcancel(value.id, { flag: 'END' }).subscribe(
            res => {
                tipMessage('结项成功', 'success');
                this.loadData();
            },
            err => {
                return tipMessage(err);
            }
        )

    }

    // 批量删除
    mutipledelete(event) {
        if (this.selection.length) {
            let ids = this.getIds(this.selection);

            this.modal.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.researchService.deletelist(ids).subscribe(
                        res => {
                            tipMessage('删除成功！', 'success');
                            this.loadData();
                        },
                        error => {
                            return tipMessage(error);
                        }
                    )
                },
                onCancel() { }
            })
        } else {
            return tipMessage('请选择删除的项！');
        }
    }
    // 查看详情
    showModalDetail(value) {
        this.isVisible = true;
        this.showSpinning = true;
        this.researchService.getsinglemessage(value.id).subscribe(
            result => {
                console.log(result);
                this.detailData = result;
                this.researchService.getdevDetailList(value.id).subscribe(
                    res => {
                        this.researchDetailData = res;
                        console.log(res, 5344)
                        this.showSpinning = false;
                    },
                    error => {
                        return tipMessage(error);
                    }
                )
            }
        )

    }
    handleOk(event) {
        this.isVisible = false;

    }
    handleCancel(event) {
        this.isVisible = false;
    }
    // chakan详情阶段
    stepLsit(row) {
        this.router.navigate([`/development/research/${row.id}/steplist`], { queryParams: { devStatus: row.devStatus } })
    }
    // 编辑
    editstepDetail(row) {
        this.router.navigate([`/development/research/${row.id}/edit`])
    }
    // 获取删除的ids
    getIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }
    // 已结项不能删除
    getdeleteType(array: any[]) {
        return array.some((item, index) => {
            return item.devStatus == 'END' || item.devStatus == 'CONDUCT'
        })
    }


    // 所属机构全路径处理
    namePath(str) {
        if (str) {
            return str.replace(/,/g, '/');
        }
    }

}
