import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { UgcActivityWork } from './../../../entity/ugc-activity-work';
import { ActivatedRoute } from '@angular/router';
import { UgcActivity } from './../../../entity/ugc-activity';
import { UgcActivityWorkService } from './../../../service/ugc-activity-work.service';
import { Course } from './../../../../learning/course/entity/course';
import { Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'spk-ugc-activity-work-list',
    templateUrl: './ugc-activity-work-list.component.html',
    styleUrls: ['./ugc-activity-work-list.component.scss']
})
export class UgcActivityWorkListComponent implements OnInit {

    ugcActivity: UgcActivity;
    searchList: any;
    data: Pagination<UgcActivityWork>;
    loading: boolean;
    selection: UgcActivityWork[];
    _searchForm: FormGroup;

    showStatus: boolean = false;
    _statusForm: FormGroup;
    selectId: number;
    statusLoading: boolean = false;
    columns: Column[] = [
        { title: '标题', tpl: 'title' },
        { title: '分类', tpl: 'category' },
        { title: '所有者', tpl: 'owner' },
        { title: '创建时间', tpl: 'createdDate' },
        { title: '审核状态', tpl: 'status' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' },
    ];

    constructor(
        private route: ActivatedRoute,
        private ugcActivityWorkService: UgcActivityWorkService,
        private fb: FormBuilder,
        private message: NzMessageService,
        private modal: NzModalService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
            this.initSearchForm();
            this.initStatusForm();
            this.loadData();
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
        this.ugcActivityWorkService.getAllOfPage(this.ugcActivity.id, params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            err => {
                this.message.error(err);
                this.loading = true;
            }
        );
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            searchText: [],
        });
    }
    initStatusForm() {
        this._statusForm = this.fb.group({
            status: ['APPLIED'],
            reason: [],
        });
    }

    _submitForm($event, value) {
        $event.preventDefault();
        this.searchList = value;
        this.loadData();
    }
    getFormControl(name) {
        return this._statusForm.controls[name];
    }
    showModal(row) {
        this.showStatus = true;
        this.selectId = row.id;
        this.getFormControl('status').setValue(row.status);
        this.getFormControl('reason').setValue(row.reason);
    }
    onSubmit() {
        this.statusLoading = true;
        let value = this._statusForm.value;
        this.ugcActivityWorkService.updateStatus(this.ugcActivity.id, this.selectId, value).subscribe(
            ok => {
                this.message.success('保存成功');
                this.showStatus = false;
                this.statusLoading = false;
                this.loadData();
            },
            err => {
                this.message.error(err);
                this.statusLoading = false;
                // this.showStatus = false;
            }
        )
    }

    handleCancel(e) {
        this.showStatus = false;
    }


    delete(works: UgcActivityWork[], single_flag?: boolean) {
        works = works ? works : this.selection;
        if (!works || works.length <= 0) {
            this.message.warning('请选择需要删除的作品');
            return;
        }
        if (single_flag) {
            this.ugcActivityWorkService.deleted(this.ugcActivity.id, works.map(it => it.id)).subscribe(
                () => {
                    this.message.success('删除成功');
                    this.loadData();
                },
                err => { this.message.error(err.message); }
            );
        } else {
            this.modal.confirm({
                title: "确认要删除选中的作品吗？",
                onOk: () => {
                    this.ugcActivityWorkService.deleted(this.ugcActivity.id, works.map(it => it.id)).subscribe(
                        () => {
                            this.message.success('删除成功');
                            this.loadData();
                        },
                        err => { this.message.error(err.message); }
                    );
                }
            })
        }
    }

}
