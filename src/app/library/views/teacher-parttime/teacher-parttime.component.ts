import { TeacherPartService } from './../../service/teachernew.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Teachernew } from 'app/library/entity/teacher-new';
import { UserGroup } from 'app/system/entity/user-group';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-teacher-parttime',
    templateUrl: './teacher-parttime.component.html',
    styleUrls: ['./teacher-parttime.component.scss']
})
export class TeacherParttimeComponent implements OnInit {
    @ViewChild('tableHandle') tableHandle;
    userGroup: UserGroup;
    teacher: Teachernew[];
    data: Pagination<any>;
    loading: boolean;
    searchTeachers: Teachernew = new Teachernew();
    selection: any;
    isVisibleTeacher: boolean = false;
    isStar: any = undefined; //控制渠道星级显示
    teacherId: any;
    userGroupName: any;
    teacherNo;
    searchBy: {
        teacherNo?: any,
        userName?: any,
        displayName?: any,
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

    ];

    _searchForm: FormGroup;
    _options: any;

    isVisible: boolean = false;

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


        this.isStarShow(() => {
            this.traingapiServer.getCurrentUser().subscribe(
                user => {
                    if (user.managerGroup) {
                        this.searchBy.userGroupId = user.managerGroup;
                        this.userGroupName = user.managerGroup;
                        this._searchForm.get('userGroupId').setValue(user.managerGroup)
                    }
                    this.loadData();
                    setTimeout(() => {
                        this.tableHandle.isComplexSearch = true;
                    })

                }
            )
        }); //查询当前登录人站点是否显示星级渠道

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
            courseName: [],
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
            teacherType: 'PARTTIME',
            ...this.searchBy
        };
        if (this.searchBy.userGroupId) {
            params['userGroupId'] = this.searchBy.userGroupId.id;
            if (Object.prototype.toString.call(this.searchBy.userGroupId) == "[object Object]") {
                params['userGroupId'] = this.searchBy.userGroupId.id;
            } else {
                // console.log(444, this.searchBy.ownProject);
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
        if (str == 'JUNIOR') {
            return '初级兼职讲师';
        } else if (str == 'LECTURER') {
            return '中级兼职讲师';
        } else if (str == 'SENIOR') {
            return '高级兼职讲师';
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

    showCourse() {
        this.isVisible = true;
    }
    handleCancel(e) {
        this.isVisible = false;
    }

    onSave(e) {
        this.isVisible = false;
        this._searchForm.get(`courseId`).setValue((e[0] && e[0].id) || null);
        this._searchForm.get(`courseName`).setValue((e[0] && e[0].name) || null);
    }
    showTeacherModal(id) {
        this.isVisibleTeacher = true;
        this.teacherId = id;
    }
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

    //查看是否显示渠道星级
    isStarShow(callback) {
        this.initSearchForm();
        this.teacherPartService.userToken().subscribe(
            data => {
                if (data && data.name && 30 == data.id) {
                    this.columns = [
                        { title: '讲师编号', data: 'teacherNo', styleClass: 'text-left' },
                        { title: '讲师工号', data: 'username', styleClass: 'text-left' },
                        { title: '讲师姓名', tpl: 'displayName', styleClass: 'text-left' },
                        { title: '讲师级别', tpl: 'rank', styleClass: 'text-center' },
                        { title: '所属渠道', tpl: 'channelCol', styleClass: 'text-center' },
                        { title: '所属机构', tpl: 'namePathCol', styleClass: 'text-left' },
                        { title: '课时量', data: 'classHour', styleClass: 'text-right' },
                        { title: '发布状态', tpl: 'isPost', styleClass: 'text-center' },
                        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
                    ]
                    this.isStar = true;
                    callback(this.isStar)
                } else {
                    this.columns = [
                        { title: '讲师编号', data: 'teacherNo', styleClass: 'text-left' },
                        { title: '讲师工号', data: 'username', styleClass: 'text-left' },
                        { title: '讲师姓名', tpl: 'displayName', styleClass: 'text-left' },
                        { title: '讲师级别', tpl: 'rank', styleClass: 'text-center' },
                        { title: '所属机构', tpl: 'namePathCol', styleClass: 'text-left' },
                        { title: '课时量', data: 'classHour', styleClass: 'text-right' },
                        { title: '发布状态', tpl: 'isPost', styleClass: 'text-center' },
                        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
                    ]
                    this.isStar = false;
                    callback(this.isStar)
                }
            }
        );
    }


    toAdd() {
        let target = JSON.stringify(this.isStar)
        window.localStorage.setItem('target', target);
        this.router.navigate(['/library/teacher/main/parttime/add']);
    }

    toEdit(id) {
        let target = JSON.stringify(this.isStar)
        window.localStorage.setItem('target', target);
        this.router.navigate(['/library/teacher/main/parttime/' + id + '/edit']);
    }

    export() {
        let ids = [];
        let selected = this.selection;
        if (selected) {
            ids = selected.map(it => it.id);
        }
        let params = {};

        // if (this.isComplexSearch) { // 如果是复杂查询
        //     params = this.getParams();
        //   } else {
        //     params = { teacherNo: this.teacherNo, sort: 'lastModifiedDate,desc' }
        //   }

        //   if (this.searchBy.userGroupId) {
        //     params['userGroupId'] = this.searchBy.userGroupId.id;
        //    };
        params['ids'] = ids;
        params['teacherType'] = 'PARTTIME';

        this.teacherPartService.exportExl(params).subscribe(
            ok => {
                this.teacherPartService.exportdownload(ok.sessionName);
            },
            err => {
                tipMessage('导出失败');
            }
        )
    }

    getParams() {// 获取导出条件（高级查询）
        let params = {};
        Object.keys(this.searchTeachers).map(it => {
            if (this.searchTeachers[it]) {
                params[it] = this.searchTeachers[it];
            }
        });
        params['sort'] = 'lastModifiedDate,desc';
        return params;
    }


}
