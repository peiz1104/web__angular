import { Teacher } from './../../entity/teacher';
import { CourseTeacherService } from './../../service/course-teacher.service';
import { CourseTeacherLookupComponent } from './../course-teacher-lookup/course-teacher-lookup.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from './../../entity/course';
import { Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { NzModalService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-course-teacher-list',
    templateUrl: './course-teacher-list.component.html',
    styleUrls: ['./course-teacher-list.component.scss']
})
export class CourseTeacherListComponent implements OnInit {
    course: Course;
    teachers: Teacher[];
    isVisible: boolean = false;
    dat: any;
    loadin: boolean;
    selectio: any;
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
        yearTwo?: any
    } = {};
    column: Column[] = [
        { title: '讲师编号', data: 'teacherNo', styleClass: 'text-center' },
        { title: '讲师类型', tpl: 'type', styleClass: 'text-center' },
        { title: '讲师姓名', tpl: 'myName', styleClass: 'text-center' },
        { title: '讲师级别', tpl: 'rank', styleClass: 'text-center' },
        { title: '性别', tpl: 'sex', styleClass: 'text-center' },
        { title: '所属机构', tpl: 'group', styleClass: 'text-center' },
        { title: '任教开始日期', tpl: 'start', styleClass: 'text-center' },
        { title: '累计课时量', data: 'classHour', styleClass: 'text-center' },
        /* { title: '发布状态', tpl: 'isPost', styleClass: 'text-center' },
        { title: '查看授权', tpl: 'look', styleClass: 'text-center' },
        { title: '授权', tpl: 'actions', styleClass: 'text-center' }, */
    ];

    constructor(private courseTeacherService: CourseTeacherService,
        private router: Router, private route: ActivatedRoute, private modalService: NzModalService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { course: Course }) => {
            this.course = data.course;
            this.loadTeachers();
        });
    }

    loadTeachers() {
        this.courseTeacherService.list(this.course.id).subscribe(
            teachers => this.teachers = teachers,
            err => {
                tipMessage(err);
            }
        );
    }

    handelLink = () => {
        this.router.navigate(['../../', 'assessment'], { relativeTo: this.route });
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
    loadDat(page?: Pagination<any>) {
        this.loadin = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            ...this.searchBy,
            publishStatus: 1
        };
        if (this.searchBy.userGroupId) {
            params['userGroupId'] = this.searchBy.userGroupId.id;
        };
        this.courseTeacherService.pageList(params).subscribe(
            data => {
                this.dat = data
                console.log(data)
                this.loadin = false;
            },
            err => {
                this.loadin = false;
            }
        );
    }
    handleCancel = (e) => {
        this.isVisible = false;
        this.loadin = false;
    }
    handleOk = (e) => {
        let selection = this.selectio
        if (selection && selection.length > 0) {
            this.courseTeacherService.add(this.course.id, selection.map(it => it.id)).subscribe(
                ok => {
                    this.isVisible = false;
                    this.route.data.subscribe((data: { course: Course }) => {
                        this.course = data.course;
                        this.loadTeachers();
                    });
                    tipMessage('添加课程讲师成功', 'success');
                },
                err => {
                    tipMessage('添加课程讲师失败, 请重试', '', 3000);
                }
            );
        } else {
            tipMessage('请至少选择一名讲师', 'warning', 3000);
        }

    }
    openLookup() {
        this.isVisible = true;
        this.loadDat()
        const subscription = this.modalService.open({
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
                // 坑爹的数据传递
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
                                tipMessage('添加课程讲师失败, 请重试', '', 3000);
                            }
                        );
                    } else {
                        tipMessage('请至少选择一名讲师');
                    }
                }
            }
        });
    }

    confirmDelete(id) {
        this.courseTeacherService.delete(this.course.id, [id]).subscribe(
            ok => {
                tipMessage('删除成功');
                this.loadTeachers();
            },
            err => {
                tipMessage('删除失败，请重试');
            }
        );
    }
}
