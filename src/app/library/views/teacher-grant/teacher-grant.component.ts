import { TeacherPartService } from './../../service/teachernew.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teacher-grant',
    templateUrl: './teacher-grant.component.html',
    styleUrls: ['./teacher-grant.component.scss']
})
export class TeacherGrantComponent implements OnInit {

    data: Pagination<any>;
    loading: boolean;
    selection: any;
    searchBy: {
        teacherNo?: any,
        name?: any,
        teacherType?: any,
        publishStatus?: any,
        rank?: any,
        userGroupId?: any,
        classHourD?: any,
        classHourH?: any,
        courseId?: any,
        ageOne?: any,
        ageTwo?: any,
        yearOne?: any,
        yearTwo?: any,
        teacherInfo?: any
    } = {};
    columns: Column[] = [
        { title: '讲师编号', data: 'teacherNo', styleClass: 'text-left' },
        { title: '讲师姓名', tpl: 'myName', styleClass: 'text-left' },
        { title: '讲师类型', tpl: 'type', styleClass: 'text-left' },
        { title: '讲师级别', tpl: 'rank', styleClass: 'text-left' },
        { title: '性别', tpl: 'sex', styleClass: 'text-center' },
        { title: '所属机构', tpl: 'group', styleClass: 'text-left' },
        { title: '任教开始日期', tpl: 'start', styleClass: 'text-center' },
        { title: '累计课时量', data: 'classHour', styleClass: 'text-right' },
        { title: '发布状态', tpl: 'isPost', styleClass: 'text-center' },
        { title: '查看授权', tpl: 'look', styleClass: 'text-center' },
        { title: '授权', tpl: 'actions', styleClass: 'text-center' },
    ];

    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;
    _options: any;

    isVisible: boolean = false;
    curId: number;
    type: any;

    isLook: boolean = false;
    lookCourseId: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private teacherPartService: TeacherPartService,
        private message: NzMessageService,
        private traingapiServer: AuthService,
        private fb: FormBuilder,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.initSearchForm();
        this.traingapiServer.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.userGroupId = user.managerGroup;
                    this._searchForm.get('userGroupId').setValue([user.managerGroup])
                }
                this.loadData();
            }
        )
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            teacherNo: [],
            name: [],
            teacherType: [],
            publishStatus: [],
            rank: [],
            userGroupId: [],
            classHourD: [],
            classHourH: [],
            courseId: [],
            ageOne: [],
            ageTwo: [],
            yearOne: [],
            yearTwo: [],
            teacherInfo: [],
        });
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            ...this.searchBy
        };
        if (this.searchBy.userGroupId) {
            if (Object.prototype.toString.call(this.searchBy.userGroupId) == "[object Object]") {
                params['userGroupId'] = this.searchBy.userGroupId.id;
            } else {
                // console.log(444, this.searchBy.ownProject);
                if (this.searchBy.userGroupId[0] && this.searchBy.userGroupId[0].id) {
                    params['userGroupId'] = this.searchBy.userGroupId[0].id;
                } else {
                    params['userGroupId'] = this.searchBy.userGroupId.id;
                }
            }
        };
        if (!this.searchBy.teacherType) { // 讲师类型没有选择时 rank重置（第一次选择rank中保存了值，二次选择讲师类型去掉时该rank应当也去掉）
            params['rank'] = null;
        }
        this.teacherPartService.pageList(params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            err => {
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
        this.searchBy = value;
        // console.log(this.searchBy, 2333)
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

    isLvs(row) {
        if (row.teacherType == 'FULLTIME') {
            if (row.rank == 'PREPARATORY') {
                return '预备讲师';
            } else if (row.rank == 'ASSISTANT') {
                return '助理讲师';
            } else if (row.rank == 'LECTURER') {
                return '中级讲师';
            } else {
                return '高级讲师';
            }
        } else if (row.teacherType == 'PARTTIME') {
            if (row.rank == 'JUNIOR') {
                return '初级讲师';
            } else if (row.rank == 'LECTURER') {
                return '中级讲师';
            } else {
                return '高级讲师';
            }
        } else {
            if (row.rank == 'PREPARATORY') {
                return '讲师';
            } else if (row.rank == 'ASSISTANT') {
                return '副教授';
            } else if (row.rank == 'LECTURER') {
                return '教授';
            } else {
                return '社会培训机构讲师';
            }
        }

    }

    delete(param?: any) {
        let selected = param ? [param] : this.selection;
        if (!selected || selected.length == 0) {
            this.modal.warning({
                title: `请选择要删除的讲师`,
                zIndex: 1003,
            });
            return;
        }

        this.modal.confirm({
            title: `确定要删除选择的讲师吗？`,
            zIndex: 1003,
            onOk: () => {
                this.teacherPartService.delete(selected.map(it => it.id)).subscribe(
                    ok => {
                        tipMessage('删除成功', 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage('删除失败');
                    }
                )
            }
        });
    }

    ispublish(param) {
        let str = !!param.publishStatus ? '取消发布' : '发布';
        let selected = param ? [param] : this.selection;
        if (!selected || selected.length == 0) {
            this.modal.warning({
                title: `请选择要${str}的讲师`,
                zIndex: 1003,
            });
            return;
        }

        this.modal.confirm({
            title: `确定要${str}选择的讲师吗？`,
            zIndex: 1003,
            onOk: () => {
                let obj = {
                    publishStatus: !param.publishStatus,
                }
                this.teacherPartService.isPublish(selected.map(it => it.id), obj).subscribe(
                    ok => {
                        tipMessage(`${str}成功`, 'success');
                        this.loadData();
                    },
                    err => {
                        tipMessage(`${str}失败`);
                    }
                )
            }
        });
    }

    showCourse(row) {
        this.isVisible = true;
        this.curId = row.id;
    }
    handleCancel(e) {
        this.isVisible = false;
    }

    onSave(e) {
        this.teacherPartService.saveCourse(this.curId, e).subscribe(
            obj => {
                tipMessage('添加授课成功', 'success');
                this.isVisible = false;
            },
            err => {
                tipMessage(err);
            }
        )
    }


    typeChange(e) {
        this.type = e;
    }


    lookCourse(row) {
        this.lookCourseId = row.id;
        this.isLook = true;
    }
    cancelCourse(e) {
        this.isLook = false;
    }

    // 所属机构处理
    namePath(str) {
        if (str) {
            return str.replace(/,/g, '/');
        } else {
            return "--";
        }
    }
}
