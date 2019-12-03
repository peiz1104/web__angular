import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SubjectActivity } from '../../../entity/subject-activity';
import { Component, OnInit } from '@angular/core';
import { CuiPagination } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { SubjectActivityApiService } from '../../../service/subject-activity-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-subject-activity-list',
    templateUrl: './subject-activity-list.component.html',
    styleUrls: ['./subject-activity-list.component.scss']
})
export class SubjectActivityListComponent implements OnInit {

    subjects: SubjectActivity[];
    columns;
    pagination: CuiPagination;
    loading: boolean = true;

    selection: SubjectActivity[];

    searchList: any;
    _searchForm: FormGroup;
    isComplexSearch: boolean = false;

    constructor(
        private router: Router,
        private modal: NzModalService,
        private message: NzMessageService,
        private route: ActivatedRoute,
        private subjectService: SubjectActivityApiService,
        private fb: FormBuilder,
    ) {
        this.columns = [
            { title: '专区名称', data: 'name', tpl: "nameMax" },
            // { title: '专区描述', data: 'description', tpl: 'descriptionMax'},
            { title: '所属组织', data: 'userGroupName' },
            { title: '开始时间', data: 'startDate', tpl: 'startDate' },
            { title: '结束时间', data: 'endDate', tpl: 'endDate' },
            { title: '发布状态', tpl: 'isPublished' },
            { title: '是否精选', tpl: 'isSuperior' },
            { title: '操作', tpl: 'actions' },
        ];
    }

    ngOnInit() {
        this.loadData();
        this.initSearchForm();
    }

    loadData(page?: CuiPagination) {
        this.selection = undefined;
        this.pagination = page;
        let params = {
            ...this.searchList,
            page: page ? page.number : 0,
            size: page ? page.size : '10'
        };
        this.loading = true;
        this.subjectService.getAllOfPage(params, page).subscribe(
            pag => {
                this.pagination = pag;
                this.subjects = pag.content;
                this.loading = false;
            }
        );
    }


    delete(subject?: SubjectActivity) {
        this.batchOperate('delete', '删除', subject, false);
    }
    publish(subject?: SubjectActivity, single_flag?: boolean) {
        this.batchOperate('publish', '发布', subject, single_flag);
    }
    disPublish(subject?: SubjectActivity, single_flag?: boolean) {
        this.batchOperate('disPublish', '撤销发布', subject, single_flag);
    }
    superior(subject?: SubjectActivity) {
        this.batchOperate('superior', '设为精选', subject, false);
    }
    disSuperior(subject?: SubjectActivity) {
        this.batchOperate('disSuperior', '取消精选', subject, false);
    }

    private batchOperate(action: string, actionName: string, subject?: SubjectActivity, single_flag?: boolean) {
        let selected = subject ? [subject] : this.selection;
        if (!selected || selected.length == 0) {
            this.message.warning(`请选择要${actionName}的专题`);
            return;
        }

        if (single_flag) {
            let canDel = true;
            let hasArchived = false;
            selected.forEach(c => {
                if (c.isPublished) {
                    canDel = false;
                }
            });
            if (action == 'delete' && !canDel) {
                tipMessage('发布状态下不允许删除', 'warning');
                return;
            }

            this.subjectService[action](selected.map(it => it.id)).subscribe(
                ok => {
                    tipMessage(`${actionName}成功`, 'success');
                    this.selection = null;
                    this.loadData();
                },
                err => tipMessage(`${actionName}失败`)
            );
        } else {
            this.modal.confirm({
                title: `确定要${actionName}选择的专区吗？`,
                zIndex: 1003,
                onOk: () => {
                    let canDel = true;
                    let hasArchived = false;
                    selected.forEach(c => {
                        if (c.isPublished) {
                            canDel = false;
                        }
                    });
                    if (action == 'delete' && !canDel) {
                        this.message.warning("发布状态下不允许删除");
                        return;
                    }
                    this.subjectService[action](selected.map(it => it.id)).subscribe(
                        ok => {
                            this.message.success(`${actionName}成功`);
                            this.selection = null;
                            this.loadData();
                        },
                        err => this.message.error(`${actionName}失败`)
                    );
                }
            });
        }
    }

    initSearchForm() {
        this._searchForm = this.fb.group({
            searchText: [],
            name: [],
            userGroup: [],
            isPublished: [],
            isSuperior: [],
            startDateBegin: [],
            startDateEnd: [],
            endDateBegin: [],
            endDateEnd: [],
        });
        // this._searchForm.value['startDateBegin'];
        // this._searchForm.controls['startDateBegin'].value
    }

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        value.ownProject = value.ownProject && value.ownProject.id;

        this.searchList = { ...value };
        if (value['userGroup']) {
            this.searchList['userGroup.id'] = value['userGroup'].id;
            this.searchList['userGroup'] = null;
        }
        this.pagination = null;
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
