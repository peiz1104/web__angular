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
    selector: 'spk-ugc-activity-excellent-list',
    templateUrl: './ugc-activity-excellent-list.component.html',
    styleUrls: ['./ugc-activity-excellent-list.component.scss']
})
export class UgcActivityExcellentListComponent implements OnInit {

    ugcActivity: UgcActivity;
    searchList: any;
    data: Pagination<UgcActivityWork>;
    loading: boolean;
    selection: UgcActivityWork[];
    _searchForm: FormGroup;

    showStatus: boolean = false;
    _statusForm: FormGroup;
    selectId: number;
    addLoading: boolean;
    columns: Column[] = [
        { title: '标题', tpl: 'title' },
        { title: '分类', tpl: 'category' },
        { title: '所有者', tpl: 'owner' },
        { title: '创建时间', tpl: 'createdDate' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' },
    ];


    workData: Pagination<UgcActivityWork>;
    selectionWorks: UgcActivityWork[];
    _searchWorkForm: FormGroup;
    showWorks: boolean = false;
    workColumns: Column[] = [
        { title: '作品名称', tpl: 'title' },
        { title: '所有者', tpl: 'owner' },
        { title: '分类', tpl: 'category' }
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
            status: 'ENROLLED',
            isExcellent: 'true',
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
            error => {
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



loadWorksData() {


    let params = {
        ...this.searchList,
        status: 'ENROLLED',
        isExcellent: 'false',
        page: this.data ? this.data.number : 0,
        size: this.data ? this.data.size : 10,
        // sort: page && page.sort ? page.sort : null
    };
    this.ugcActivityWorkService.getAllOfPage(this.ugcActivity.id, params).subscribe(
        workData => {
            this.workData = workData;
        }
    );

}


    addWorks() {
        this.showWorks = true;
        this.initSearchWorkForm();
        this.loadWorksData();
    }
    initSearchWorkForm() {
        this._searchWorkForm = this.fb.group({
            searchText: [],
        });
    }
    delete(works: UgcActivityWork[], single_flag?: boolean) {
        works = works ? works : this.selection;
        if (!works || works.length <= 0) {
            this.message.warning('请选择需要删除优秀的作品');
            return;
        }
        if (single_flag) {
            this.ugcActivityWorkService.disExcellent(this.ugcActivity.id, works.map(it => it.id)).subscribe(
                () => {
                    this.message.success('删除成功');
                    this.loadData();
                },
                err => { this.message.error(err.message); }
            );
        } else {
            this.modal.confirm({
                title: "确认要删除选中的优秀作品吗？",
                onOk: () => {
                    this.ugcActivityWorkService.disExcellent(this.ugcActivity.id, works.map(it => it.id)).subscribe(
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
    confirm(event) {
        if (this.selectionWorks == null || this.selectionWorks.length <= 0) {
            this.showWorks = false;
            this.addLoading = false;
            return;
        }
        this.ugcActivityWorkService.excellent(this.ugcActivity.id,  this.selectionWorks.map(it => it.id)).subscribe(
            data => {
                // this.data = data;
                this.showWorks = false;
                this.loadData();
            },
            err => { this.message.error(err.message); }
        );
    }

    handleCancel(e) {
        this.showWorks = false;
    }




}
