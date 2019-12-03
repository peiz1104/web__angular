import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { TrainingClass } from './../../../entity/training-class';
import { TrainingClassApiService } from './../../../service/training-class-api.service';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';


@Component({
    selector: 'spk-training-class-list',
    templateUrl: './training-class-list.component.html',
    styleUrls: ['./training-class-list.component.scss']
})
export class TrainingClassListComponent implements OnInit {

    data: Pagination<TrainingClass>;
    searchList: any;
    loading: boolean;
    selection: TrainingClass[];
    columns: Column[] = [
        { title: '班级名称', tpl: 'name' },
        { title: '班级编码', tpl: 'code' },
        { title: '主办单位', data: 'sponsorDeptName' },
        { title: '所属组织', data: 'userGroupName' },
        { title: '开始日期', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束日期', tpl: 'endDate', styleClass: 'text-center' },
        { title: '班级负责人', tpl: 'leaders' },
        { title: '发布状态', tpl: 'isPublished', styleClass: 'text-center' },
        { title: '结班状态', tpl: 'isArchived', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' },
    ];

    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private trainingClassApi: TrainingClassApiService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.loadData();
        this.initSearchForm();
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            searchText: [],
            name: [],
            code: [],
            sponsorDept: [],
            userGroup: [],
            isPublished: [],
            startDateBegin: [],
            startDateEnd: [],
            endDateBegin: [],
            endDateEnd: [],
        });
        // this._searchForm.value['startDateBegin'];
        // this._searchForm.controls['startDateBegin'].value
    }

    loadData() {
        let params = {
            ...this.searchList,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        this.loading = true;
        this.trainingClassApi.getAllOfPage(params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            err => {
                tipMessage(err);
                this.loading = false;
            }
        );
    }

    hasSelection() {
        return this.selection && this.selection.length > 0;
    }

    showLeaders(leaders) {
        let showLeader = '';
        let displayNames = [];
        if (leaders && leaders.length > 0) {
            leaders.forEach(leader => {
                displayNames.push(leader.displayName);
            });
            showLeader = displayNames.join(",");
        }
        return showLeader;
    }

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        value.ownProject = value.ownProject && value.ownProject.id;

        this.searchList = { ...value };
        if (value['sponsorDept']) {
            this.searchList['sponsorDept.id'] = value['sponsorDept'].id;
            this.searchList['sponsorDept'] = null;
        }
        if (value['userGroup']) {
            this.searchList['userGroup.id'] = value['userGroup'].id;
            this.searchList['userGroup'] = null;
        }
        this.data = null;
        this.loadData();
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }

    delete(trainingClass?: TrainingClass) {
        this.batchOperate('delete', '删除', trainingClass, false);
    }

    publish(trainingClass?: TrainingClass) {
        this.batchOperate('publish', '发布', trainingClass, true);
    }

    disPublish(trainingClass?: TrainingClass) {
        this.batchOperate('disPublish', '撤销发布', trainingClass, true);
    }

    publish_single(trainingClass?: TrainingClass) {
        this.batchOperate_single('publish', '发布', trainingClass);
    }

    disPublish_single(trainingClass?: TrainingClass) {
        this.batchOperate_single('disPublish', '撤销发布', trainingClass);
    }

    batchOperate_single(action: string, actionName: string, trainingClass?: TrainingClass) {
        this.trainingClassApi[action]([trainingClass].map(it => it.id)).subscribe(
            ok => {
                this.message.success(`${actionName}成功`);
                this.loadData();
            },
            err => this.message.error(`${actionName}失败`)
        );
    }

    archive(trainingClass?: TrainingClass) {
        this.batchOperate('archive', '结班', trainingClass, true);
    }

    disArchive(trainingClass?: TrainingClass) {
        this.batchOperate('disArchive', '撤销结班', trainingClass, true);
    }

    private batchOperate(action: string, actionName: string, trainingClass?: TrainingClass, keepFilter?: boolean) {
        let selected = trainingClass ? [trainingClass] : this.selection;
        if (!selected || selected.length == 0) {
            /* this.modal.warning({
                title: `请选择要${actionName}的培训班`
            }); */
            this.message.warning(`请选择要${actionName}的培训班`);
            return;
        }

        this.modal.confirm({
            title: `确定要${actionName}选择的培训班吗？`,
            zIndex: 1003,
            onOk: () => {
                this.trainingClassApi[action](selected.map(it => it.id)).subscribe(
                    ok => {
                        tipMessage(`${actionName}成功`, 'success', 3000);
                        this.loadData();
                    },
                    err => tipMessage(`${actionName}失败`)
                );
            }
        });
    }

    // 表单日期处理
    // 开始日期
    _startDateBeginChange = () => {
        if (this._searchForm.value['startDateBegin'] > this._searchForm.value['startDateEnd']) {
            this._searchForm.value['startDateEnd'] = null;
        }
    };
    _startDateEndChange = () => {
        if (this._searchForm.value['startDateBegin'] > this._searchForm.value['startDateEnd']) {
            this._searchForm.value['startDateBegin'] = null;
        }
    };
    _disabledStartDateBegin = (startValue) => {
        if (!startValue || !this._searchForm.value['startDateEnd']) {
            return false;
        }
        return startValue.getTime() >= this._searchForm.value['startDateEnd'].getTime();
    };
    _disabledStartDateEnd = (endValue) => {
        if (!endValue || !this._searchForm.value['startDateBegin']) {
            return false;
        }
        return endValue.getTime() <= this._searchForm.value['startDateBegin'].getTime();
    };
    // 结束日期
    _endDateBeginChange = () => {
        if (this._searchForm.value['endDateBegin'] > this._searchForm.value['endDateEnd']) {
            this._searchForm.value['endDateEnd'] = null;
        }
    };
    _endDateEndChange = () => {
        if (this._searchForm.value['startDateBegin'] > this._searchForm.value['startDateEnd']) {
            this._searchForm.value['startDateBegin'] = null;
        }
    };
    _disabledEndDateBegin = (startValue) => {
        if (!startValue || !this._searchForm.value['endDateEnd']) {
            return false;
        }
        return startValue.getTime() >= this._searchForm.value['endDateEnd'].getTime();
    };
    _disabledEndDateEnd = (endValue) => {
        if (!endValue || !this._searchForm.value['endDateBegin']) {
            return false;
        }
        return endValue.getTime() <= this._searchForm.value['endDateBegin'].getTime();
    };
}
