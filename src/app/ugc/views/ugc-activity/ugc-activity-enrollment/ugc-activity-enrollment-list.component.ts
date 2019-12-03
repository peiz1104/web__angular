import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { UgcActivity } from './../../../entity/ugc-activity';
import { ActivatedRoute } from '@angular/router';
import { UgcActivityEnrollment } from './../../../entity/ugc-activity-enrollment';
import { UgcActivityEnrollmentService } from './../../../service/ugc-activity-enrollment.service';
import { Course } from './../../../../learning/course/entity/course';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
    selector: 'spk-ugc-activity-enrollment-list',
    templateUrl: './ugc-activity-enrollment-list.component.html',
    styleUrls: ['./ugc-activity-enrollment-list.component.scss']
})
export class UgcActivityEnrollmentListComponent implements OnInit {

    ugcActivity: UgcActivity;
    searchList: any;
    data: Pagination<UgcActivityEnrollment>;
    loading: boolean;
    selection: UgcActivityEnrollment[];
    _searchForm: FormGroup;
    columns: Column[] = [
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '所属组织', tpl: 'userGroup' },
        { title: '报名时间', tpl: 'createdDate' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' },
    ];
    selectionUsers: any = [];
    selectedLoading: boolean = false;
    isVisible: boolean = false;
    constructor(
        private route: ActivatedRoute,
        private ugcActivityEnrollmentService: UgcActivityEnrollmentService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private layer: CuiLayer,
        private modal: NzModalService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
            this.initSearchForm()
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
        this.ugcActivityEnrollmentService.getAllOfPage(this.ugcActivity.id, params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            error => {
                this.loading = false;
            }
        );
    }

    initSearchForm() {
        this._searchForm = this.fb.group({
            searchText: [],
        });
    }

    _submitForm($event, value) {
        $event.preventDefault();
        this.searchList = value;
        this.loadData();
    }


    delete(enrollments: UgcActivityEnrollment[], single_flag?: boolean) {
        enrollments = enrollments ? enrollments : this.selection;
        if ( !enrollments || enrollments.length <= 0) {
            this.message.warning('请选择需要删除的用户');
            return;
        }
        if (single_flag) {
            this.ugcActivityEnrollmentService.deleted(this.ugcActivity.id, enrollments.map(it => it.id)).subscribe(
                () => {
                    this.message.success('删除成功');
                    this.loadData();
                },
                err => { this.message.error(err.message); }
            );
        } else {
            this.modal.confirm({
                title: "确认要删除选中的用户吗？",
                onOk: () => {
                    this.ugcActivityEnrollmentService.deleted(this.ugcActivity.id, enrollments.map(it => it.id)).subscribe(
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

    handleCancel(e) {
        this.isVisible = false;
    }
    showPerson() {
        this.isVisible = true;
    }
    persons(arr) {
        this.selectedLoading = true;
        this.selectionUsers = arr;
        if (this.selectionUsers != null && this.selectionUsers.length > 0 ) {
            this.ugcActivityEnrollmentService.add(this.ugcActivity.id, this.selectionUsers.map(it => it.id)).subscribe(
                () => {
                    this.message.success('添加成功');
                    this.loadData();
                    this.isVisible = false;
                    this.selectedLoading = false;
                },
                err => { this.message.error(err.message); this.isVisible = false;  this.selectedLoading = false; }
            );
        }else {
            this.isVisible = false;
            this.selectedLoading = false;
        }
    }


}
