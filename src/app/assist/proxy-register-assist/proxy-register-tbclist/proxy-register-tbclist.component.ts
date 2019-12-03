import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { TrainingClass } from '../../../training/entity/training-class';
import { Column } from 'console-ui-ng';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProxyRegisterApiService } from '../service/proxy-register-api.service';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-proxy-register-tbclist',
    templateUrl: './proxy-register-tbclist.component.html',
    styleUrls: ['./proxy-register-tbclist.component.scss']
})
export class ProxyRegisterTbclistComponent implements OnInit {

    data: Pagination<TrainingClass>;
    loading: boolean;
    selection: TrainingClass[];
    columns: Column[] = [
        { title: '班级名称', tpl: 'name' },
        { title: '所属组织', tpl: 'sponsorDeptName' },
        { title: '开始日期', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束日期', tpl: 'endDate', styleClass: 'text-center' },
        { title: '执行人', tpl: 'performer', styleClass: 'text-center' },
        { title: '发布状态', tpl: 'isPublished', styleClass: 'text-center' },
        { title: '结班状态', tpl: 'isArchived', styleClass: 'text-center' },
        { title: '注册人员', tpl: 'actions', styleClass: 'text-right' },
    ];

    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;
    searchBy: {
        name?: any,
        sponsorDeptId?: any,
        startDate?: any,
        endDate?: any,
        isPublished?: any
    } = {};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private proxyRegisterApiService: ProxyRegisterApiService,
        private fb: FormBuilder,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.initSearchForm();
        this.loadData();
    }

    initSearchForm() {
        this._searchForm = this.fb.group({
            name: [],
            sponsorDeptId: [],
            isPublished: [],
            startDate: [],
            endDate: [],
        });
    }

    loadData() {
        let params = {
            ...this.searchBy,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        if (this.searchBy.sponsorDeptId && this.searchBy.sponsorDeptId.trim()) {
            params['userGroupIds'] = this.searchBy.sponsorDeptId;
        }
        this.loading = true;
        this.proxyRegisterApiService.getAllOfPage(params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            err => {
                tipMessage(err, '', 50000);
                this.loading = false;
            }
        );
    }

    hasSelection() {
        return this.selection && this.selection.length > 0;
    }

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        value.ownProject = value.ownProject && value.ownProject.id;
        this.searchBy = value;
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

    archive(trainingClass?: TrainingClass) {
        this.batchOperate('archive', '结班', trainingClass, true);
    }

    disArchive(trainingClass?: TrainingClass) {
        this.batchOperate('disArchive', '撤销结班', trainingClass, true);
    }

    private batchOperate(action: string, actionName: string, trainingClass?: TrainingClass, keepFilter?: boolean) {
        let selected = trainingClass ? [trainingClass] : this.selection;
        if (!selected || selected.length == 0) {
            this.modal.warning({
                title: `请选择要${actionName}的培训班`,
                zIndex: 1002,
            });
            return;
        }

        this.modal.confirm({
            title: `确定要${actionName}选择的培训班吗？`,
            zIndex: 1003,
            onOk: () => {
                this.proxyRegisterApiService[action](selected[0].id, selected.map(it => it.id)).subscribe(
                    ok => {
                        tipMessage(`${actionName}成功`, 'success');
                        this.loadData();
                    },
                    err => tipMessage(`${actionName}失败`)
                );
            }
        });
    }
}
