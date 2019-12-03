import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { TrainingClass } from '../../../../training/entity/training-class';
import { Column } from 'console-ui-ng';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TbcAssistApiService } from '../../service/tbc-assist-api.service';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-tbc-list',
    templateUrl: './tbc-list.component.html',
    styleUrls: ['./tbc-list.component.scss']
})
export class TbcListComponent implements OnInit {

    data: Pagination<TrainingClass>;
    searchList: any;
    loading: boolean;
    selection: TrainingClass[];
    columns: Column[] = [
        { title: '班级名称', tpl: 'name' },
        { title: '主办单位', data: 'sponsorDeptName' },
        { title: '开始日期', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束日期', tpl: 'endDate', styleClass: 'text-center' },
        { title: '负责人', tpl: '' },
        { title: '发布状态', tpl: 'isPublished', styleClass: 'text-center' },
        { title: '结班状态', tpl: 'isArchived', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' },
    ];

    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private tbcAssistApi: TbcAssistApiService,
        private fb: FormBuilder,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.initSearchForm();
        this.loadData();
    }

    initSearchForm() {
        this._searchForm = this.fb.group({
            searchText: [],
            name: [],
            sponsorDeptId: [],
            isPublished: [],
            startDate: [],
            endDate: [],
        });
    }

    loadData() {
        let params = {
            ...this.searchList,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        this.loading = true;
        this.tbcAssistApi.getAllOfPage(params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            err => {
                tipMessage(err, '', 5000);
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
        this.searchList = value;
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
            tipMessage(`请选择要${actionName}的培训班`, '', 3000)
            return;
        }

        this.modal.confirm({
            title: `确定要${actionName}选择的培训班吗？`,
            zIndex: 1002,
            onOk: () => {
                this.tbcAssistApi[action](selected[0].id, selected.map(it => it.id)).subscribe(
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
