import { TeacherPartService } from './../../service/teachernew.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Teachernew } from 'app/library/entity/teacher-new';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teacher-external',
    templateUrl: './teacher-external.component.html',
    styleUrls: ['./teacher-external.component.scss']
})
export class TeacherExternalComponent implements OnInit {
    @ViewChild('tableHandle') tableHandle;
    teacher: Teachernew[];
    data: Pagination<any>;
    loading: boolean;
    selection: any;
    isVisibleTeacher: boolean = false;
    teacherId: any;
    searchBy: {
        teacherNo?: any,
        name?: any,
        publishStatus?: any,
        rank?: any,
        userGroupId?: any,
        classHourD?: any,
        classHourH?: any,
        courseId?: any,
        yearOne?: any,
        yearTwo?: any
    } = {};
    columns: Column[] = [
        { title: '讲师编号', data: 'teacherNo', styleClass: 'text-left' },
        { title: '讲师姓名', tpl: 'name', styleClass: 'text-left' },
        { title: '认定职级', tpl: 'rank', styleClass: 'text-left' },
        { title: '性别', tpl: 'sex', styleClass: 'text-center' },
        { title: '所属机构', tpl: 'namePathCol', styleClass: 'text-left' },
        // { title: '出生日期', tpl: 'myDate', styleClass: 'text-center' },
        { title: '累计课时量', data: 'classHour', styleClass: 'text-right' },
        { title: '发布状态', tpl: 'isPost', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
    ];

    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;
    _options: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private teacherPartService: TeacherPartService,
        private traingapiServer: AuthService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.tableHandle.isComplexSearch=true;
        this.initSearchForm();
        this.traingapiServer.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.userGroupId = user.managerGroup;
                    this._searchForm.get('userGroupId').setValue(user.managerGroup)
                }
                this.loadData();
            }
        )
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            teacherNo: [],
            userName: [],
            displayName: [],
            publishStatus: [],
            rank: [],
            userGroupId: [],
            classHourD: [],
            classHourH: [],
            courseId: [],
            yearOne: [],
            yearTwo: []
        });
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            teacherType: 'EXTERNAL',
            ...this.searchBy
        };
        if (this.searchBy.userGroupId) {
            params['userGroupId'] = this.searchBy.userGroupId.id;
            if (Object.prototype.toString.call(this.searchBy.userGroupId) == "[object Object]") {
                params['userGroupId'] = this.searchBy.userGroupId.id;
            } else {
                if (this.searchBy.userGroupId[0] && this.searchBy.userGroupId[0].id) {
                    params['userGroupId'] = this.searchBy.userGroupId.id;
                } else {
                    params['userGroupId'] = this.searchBy.userGroupId.id;
                }
            }
        };
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
        console.log(value);
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }

    isLvs(str) {
        if (str == 'PREPARATORY') {
            return '讲师';
        } else if (str == 'ASSISTANT') {
            return '副教授';
        } else if (str == 'LECTURER') {
            return '教授';
        } else {
            return '社会培训机构讲师';
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
                zIndex: 1003
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

    // 查看信息详情
    showModalList(id) {
        this.teacherId = id;
        this.isVisibleTeacher = true;
    }
    // 取消
    handleCancelTeacherList(event) {
        this.isVisibleTeacher = false;
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
