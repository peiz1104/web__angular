/*
 * @Author: zhangyue
 * @Date: 2017-11-22 16:32:11
 * @Last Modified by: majunfeng
 * @Last Modified time: 2017-11-22 17:37:48
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CuiPagination, Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { OfficeTeacher } from './office-teacher-model';
import { TrainingClassApiService } from '../../../../service/training-class-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-office-teacher',
    templateUrl: './office-teacher.component.html',
    styleUrls: ['./office-teacher.component.scss']
})
export class OfficeTeacherComponent implements OnInit {

    data: Pagination<OfficeTeacher>;
    selection: any[] = [];
    loading: boolean = false;
    offeringId: number;
    columns: Column[] = [
	{ title: '用户名', data: 'user.username', styleClass: 'text-center' },
        { title: '讲师姓名', data: 'name', styleClass: 'text-center' },
        { title: '所属组织', data: 'userGroup.name', styleClass: 'text-center' },
        { title: '手机号', data: 'phoneNumber', styleClass: 'text-center' },
    	{ title: '讲师职级', tpl: 'rank', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    trainingName: string;
    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;

    constructor(
        private fb: FormBuilder,
        private trainingClassApi: TrainingClassApiService,
        private router: ActivatedRoute
    ) { }

    ngOnInit() {
        this.router.params.subscribe(
            obj => {
                this.offeringId = obj['tbcId'];
            }
        );
        this.router.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingName = obj.trainingClass.name;
            }
        );
        this.initSearchForm();
        this.loadData();
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            username: [],
            teacherName: [],
            organizeId: [],
        });
    }

    loadData(page?: CuiPagination) {
        this.loading = true;
        this.data = page;
        this._searchForm.value.organizeId = this._searchForm.value.organizeId && this._searchForm.value.organizeId.id;
        let params = {
            ...this._searchForm.value,
            offeringId: this.offeringId && this.offeringId || '',
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        this.trainingClassApi.gitTrainingTeacherList(params).subscribe(
            obj => {
                this.data = obj;
                this.loading = false;
            },
            err => {
                tipMessage(err);
                this.loading = false;
            }
        )
    }
    _submitForm($event, value) {
        this.loadData();
        $event.preventDefault();
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }
    // 删除选择的讲师列表或者单个人
    deleteTrainingTeacher(teacherId?: number) {
        let teacherIds: any[] = [];
        if (teacherId) {
            teacherIds.push(teacherId);
        } else {
            if (this.selection.length > 0) {
                teacherIds = this.selection.map(it => it.id);
            } else {
                tipMessage('请选择讲师！', 'info');
                return;
            }
        };
        this.trainingClassApi.deleteTrainingTeacher({ coueseId: this.offeringId, teacherIds: teacherIds }).subscribe(
            obj => {
                tipMessage('删除成功！', 'success');
                this.loadData();
            },
            err => {
                tipMessage(err);
            }
        )
    }

}
