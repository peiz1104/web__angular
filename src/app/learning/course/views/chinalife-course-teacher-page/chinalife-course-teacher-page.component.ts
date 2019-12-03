import { Component, OnInit } from '@angular/core';
import { Column } from 'console-ui-ng';
import { NzModalService, NzMessageService, NzModalSubject } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination, AuthService } from 'app/core';
import { Course } from './../../entity/course';
import { Teacher } from './../../entity/teacher';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CourseTeacherService } from './../../service/course-teacher.service';
import { CourseTeacherLookupComponent } from './../../public/course-teacher-lookup/course-teacher-lookup.component';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-chinalife-course-teacher-page',
    templateUrl: './chinalife-course-teacher-page.component.html',
    styleUrls: ['./chinalife-course-teacher-page.component.scss']
})
export class ChinalifeCourseTeacherPageComponent implements OnInit {
    _searchForm: FormGroup;
    searchBy: {
        teacherNo?: any,
        name?: any,
        teacherType?: any,
        publishStatus?: any,
        userGroup?: any,
    } = {};
    course: Course;
    _isComplexSearch: boolean = false;
    teachers: any;
    isLook: any = true;
    spinning: boolean;
    selection: any;
    columns: Column[] = [
        { title: '讲师编号', data: 'teacherNo', styleClass: 'text-left' },
        { title: '讲师姓名', data: 'name', styleClass: 'text-left' },
        { title: '讲师类型', tpl: 'teacherTypeCol', styleClass: 'text-center' },
        { title: '性别', tpl: 'sexCol', styleClass: 'text-center' },
        { title: '所属机构', tpl: 'userGroupCol', styleClass: 'text-left' },
        { title: '发布状态', tpl: 'publishStatusCol', styleClass: 'text-left' },
        { title: '操作', tpl: 'rowAction', styleClass: 'text-right' }
    ];


    constructor(
        private courseTeacherService: CourseTeacherService,
        private fb: FormBuilder,
        private traingapiServer: AuthService,
        private router: Router, private route: ActivatedRoute,
        public message: NzMessageService,
        public modal: NzModalService
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            teacherNo: [''],
            name: [''],
            teacherType: [''],
            publishStatus: [''],
            userGroup: [''],
        })
        this.route.data.subscribe((data: { course: Course }) => {
            this.course = data.course;
            this.traingapiServer.getCurrentUser().subscribe(
                user => {
                    if (user.managerGroup) {
                        this.searchBy.userGroup = user.managerGroup;
                        this._searchForm.get('userGroup').setValue(user.managerGroup)
                    }
                    this.loadTeachers();
                }
            )


        });

    }



    loadTeachers(page?: Pagination<any>) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };

        if (this.searchBy.name) {
            params['name'] = this.searchBy.name.trim();
        }
        if (this.searchBy.teacherNo) {
            params['teacherNo'] = this.searchBy.teacherNo.trim();
        }
        if (this.searchBy.teacherType) {
            params['teacherType'] = this.searchBy.teacherType;
        }
        if (this.searchBy.publishStatus) {
            params['publishStatus'] = this.searchBy.publishStatus;
        }

        if (this.searchBy.userGroup) {
            if (Object.prototype.toString.call(this.searchBy.userGroup) == "[object Object]") {
                params['userGroup.id'] = this.searchBy.userGroup.id;
            } else {
                if (this.searchBy.userGroup[0] && this.searchBy.userGroup[0].id) {
                    params['userGroup.id'] = this.searchBy.userGroup.id;
                } else {
                    params['userGroup.id'] = this.searchBy.userGroup.id;
                }
            }
        };

        this.spinning = true;
        this.courseTeacherService.pageListByCourseId(this.course.id, params).subscribe(
            teachers => {
                this.teachers = teachers
                this.spinning = false;
            },
            err => {
                tipMessage(`未知错误:${err}`);
                this.spinning = false;
            }
        );
        this.courseTeacherService.getIsLook(this.course.id, this.course.turnAuthorization).subscribe(
            isLook => {
                this.spinning = false;
                if (isLook == 'Y') {
                    this.isLook = true;
                } else {
                    this.isLook = false;
                }
            }
        );
    }

    // 所属机构处理
    namePath(str) {
        if (str) {
            return str.replace(/,/g, '/');
        } else {
            return "--";
        }
    }

    _submitForm($event, value) {
        $event.preventDefault();
        this.searchBy = value;
        this.loadTeachers();
    }

    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }

    //删除功能
    confirmDelete(param?: any) {
        let selected = param ? param : this.selection.map(item => item.id);
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
                this.courseTeacherService.delete(this.course.id, selected).subscribe(
                    ok => {
                        tipMessage('删除成功', 'success');
                        this.loadTeachers();
                    },
                    err => {
                        tipMessage('删除失败');
                    }
                )
            }
        });
    }

    // 添加讲师
    openLookup() {
        const subscription = this.modal.open({
            title: '选择讲师',
            content: CourseTeacherLookupComponent,
            maskClosable: false,
            width: 960,
            zIndex: 1003,
            onOk() {
            },
            onCancel() {
                // console.log('Click cancel');
            },
            footer: false,
            componentParams: {
                course: this.course
            }
        });
        subscription.subscribe(result => {
            // console.log(result);
            if (typeof result == 'string') {
            } else if (typeof result == 'object') {
                if (result['event'] && result['event'] == 'onOk') {
                    let selection = result['data'];
                    if (selection && selection.length > 0) {
                        this.courseTeacherService.add(this.course.id, selection.map(it => it.id)).subscribe(
                            ok => {
                                subscription.destroy('onOk');
                                this.loadTeachers();
                                tipMessage('添加课程讲师成功', 'success');
                            },
                            err => {
                                tipMessage('添加课程讲师失败, 请重试');
                            }
                        );
                    } else {
                        tipMessage('请至少选择一名讲师', 'warning');
                    }
                }
            }
        });
    }
}
