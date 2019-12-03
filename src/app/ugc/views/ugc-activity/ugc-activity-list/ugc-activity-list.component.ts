import { Component, OnInit } from '@angular/core';
import { UgcActivity } from './../../../entity/ugc-activity';
import { UgcActivityService } from "./../../../service/ugc-activity.service";
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'spk-ugc-activity-list',
    templateUrl: './ugc-activity-list.component.html',
    styleUrls: ['./ugc-activity-list.component.scss']
})

export class UgcActivityListComponent implements OnInit {

    data: Pagination<UgcActivity>;
    searchList: any;
    loading: boolean;
    selection: UgcActivity[];
    columns: Column[] = [
        { title: '标题', tpl: 'title' },
        { title: '开始日期', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束日期', tpl: 'endDate', styleClass: 'text-center' },
        { title: '负责人', tpl: 'leaders' },
        { title: '报名人数	', tpl: 'enrollmentCount', styleClass: 'text-center' },
        { title: '作品数	', tpl: 'workCount', styleClass: 'text-center' },
        { title: '发布状态', tpl: 'isPublished', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' },
    ];

    activityStatusOptions = [
        { value: '', label: '全部' },
        { value: 'DRAFT', label: '草稿' },
        { value: 'PREPARE', label: '准备中' },
        { value: 'GOING', label: '进行中' },
        { value: 'FINISHED', label: '已结束' },
    ];
    selectedOption;
    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ugcActivityService: UgcActivityService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private layer: CuiLayer,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.loadData();
        this.initSearchForm();
    }


    initSearchForm() {
        this._searchForm = this.fb.group({
            title: [],
            status: ""
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
        this.ugcActivityService.getAllOfPage(params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            err => {
                this.message.error(err, {
                    nzDuration: 5000,
                    nzPauseOnHover: true
                });
                this.loading = false;
            }
        );
    }

    hasSelection() {
        return this.selection && this.selection.length > 0;
    }

    _submitForm($event, value) {
        $event.preventDefault();
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


    delete(activitys: UgcActivity[], flag: boolean) {
        activitys = activitys ? activitys : this.selection;
        if (!activitys || activitys.length <= 0) {
            this.message.warning('请选择需要删除的活动');
            return;
        }
        if (flag) {
            this.modal.confirm({
                title: "确认要删除选中的活动吗？",
                onOk: () => {
                    this.ugcActivityService.delete(activitys.map(it => it.id)).subscribe(
                        () => {
                            this.message.success('删除成功');
                            this.loadData();
                        },
                        err => { this.message.error(err.message); }
                    );
                }
            })
        } else {
            this.ugcActivityService.delete(activitys.map(it => it.id)).subscribe(
                () => {
                    this.message.success('删除成功');
                    this.loadData();
                },
                err => { this.message.error(err.message); }
            );
        }

    }


    publish(activitys: UgcActivity[], flag: boolean) {
        activitys = activitys ? activitys : this.selection;
        if (!activitys || activitys.length <= 0) {
            this.message.warning('请选择需要发布的活动');
            return;
        }
        if (flag) {
            this.modal.confirm({
                title: `确认要发布选中的活动吗？`,
                onOk: () => {
                    this.ugcActivityService.publish(activitys.map(it => it.id)).subscribe(
                        () => {
                            this.message.success('发布成功');
                            this.loadData();
                        },
                        err => { this.message.error(err.message); }
                    );
                }
            });
        } else {
            this.ugcActivityService.publish(activitys.map(it => it.id)).subscribe(
                () => {
                    this.message.success('发布成功');
                    this.loadData();
                },
                err => { this.message.error(err.message); }
            );
        }
        /* this.layer.confirm(
            '确认要发布选中的活动吗？',
            () => {
                this.ugcActivityService.publish(activitys.map(it => it.id)).subscribe(
                    () => {
                        this.message.success('发布成功');
                        this.loadData();
                    },
                    err => { this.message.error(err.message); }
                );
            }
        ); */
    }
    cancel(activitys: UgcActivity[], flag: boolean) {
        activitys = activitys ? activitys : this.selection;
        if (!activitys || activitys.length <= 0) {
            this.message.warning('请选择需要撤销发布的活动');
            return;
        }
        if (flag) {
            this.modal.confirm({
                title: `确认要撤销发布选中的活动吗？`,
                onOk: () => {
                    this.ugcActivityService.cancel(activitys.map(it => it.id)).subscribe(
                        () => {
                            this.message.success('撤销发布成功');
                            this.loadData();
                            // activitys.forEach(it => it.isPublished = false);
                        },
                        err => { this.message.error(err.message); }
                    );
                }
            });
        } else {
            this.ugcActivityService.cancel(activitys.map(it => it.id)).subscribe(
                () => {
                    this.message.success('撤销发布成功');
                    this.loadData();
                    // activitys.forEach(it => it.isPublished = false);
                },
                err => { this.message.error(err.message); }
            );
        }
        /* this.layer.confirm(
            '确认要取消发布选中的活动吗？',
            () => {
                this.ugcActivityService.cancel(activitys.map(it => it.id)).subscribe(
                    () => {
                        this.message.success('取消发布成功');
                        this.loadData();
                        // activitys.forEach(it => it.isPublished = false);
                    },
                    err => { this.message.error(err.message); }
                );
            }
        ); */
    }
}
