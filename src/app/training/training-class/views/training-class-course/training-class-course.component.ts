import { NzMessageService } from 'ng-zorro-antd';
import { TrainingClass } from './../../../entity/training-class';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferingCourseApiService } from './../../../service/offering-course-api.service';
import { Course } from './../../../../learning/course/entity/course';
import { Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { CourseTeacherService } from './../../../../learning/course/service/course-teacher.service';
import { NzModalService } from 'ng-zorro-antd';
import { CourseTeacherLookupComponent } from './../../../../learning/course/public/course-teacher-lookup/course-teacher-lookup.component';

import { FormGroup, FormBuilder } from '@angular/forms';
import { OfferingGroup } from 'app/training/entity/offering_group';
import { TrainingClassGroupService } from 'app/training/service/training-class-group.service';
import { Subject } from 'rxjs/Subject';
import { TrainingClassXType } from '../../service/training-class-xtype.service';
declare let $: any;
@Component({
    selector: 'spk-training-class-course',
    templateUrl: './training-class-course.component.html',
    styleUrls: ['./training-class-course.component.scss']
})
export class TrainingClassCourseComponent implements OnInit {

    trainingClass: TrainingClass;
    isExhibition: boolean = false;
    data: Pagination<any>;
    loading: boolean;
    selection: any[] = [];
    inputValue: any;
    course: Course;
    isVisible: boolean = false;
    isArchived: boolean = false;
    columns: Column[] = [
        { title: '名称', tpl: 'thumbnail' },
        { title: '编码', tpl: 'name' },
        { title: '类型', tpl: 'type' },
        { title: '学时', tpl: 'period', styleClass: 'text-right' },
        { title: '所属分类', tpl: 'cate' },
        { title: '讲师', tpl: 'teacher' },
        { title: '课程考试', tpl: 'courseExam' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-left' },
    ];
    courseLookupSubmitted: Subject<boolean> = new Subject();
    dat: any;
    loadin: boolean;
    selectio: any;
    isVisibleExport: boolean = false;
    exportContent: string;
    options = [];
    selectedOption;
    nzPageSize: number = 10;
    exhibition: boolean = false;
    listState: boolean = false;
    showlist: boolean = true;
    _allChecked = false;
    _indeterminate = false;
    pageIndex: number = 1;
    pageIndexCourse: number = 1;
    listPageSize: number = 10;
    serchCourse: string = '';
    trainingType: string;
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
    exportType: string = 'T';
    siteStatus: boolean = true;
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
    total: number = 50
    exhibitionDatas: any;
    offeringId: number;
    constructor(
        private route: ActivatedRoute,
        private offeringCourseApi: OfferingCourseApiService,
        private message: NzMessageService,
        private modalService: NzModalService,
        public xtype: TrainingClassXType,
        private teacherService: CourseTeacherService,
        private router: Router
    ) {
        if (!xtype || !xtype.isManage) {
            this.columns = this.columns.filter(it => it.title != '课程考试');
        }
    }

    ngOnInit() {
        // this.loadDat();
        this.route.data.subscribe((data: { trainingClass: TrainingClass }) => {
            // console.log(data, 332);
            this.trainingClass = data.trainingClass;
            if (data.trainingClass) {
                this.offeringId = this.trainingClass.id;
                this.trainingType = this.trainingClass.trainingType;
                this.isArchived = this.trainingClass.isArchived ? this.trainingClass.isArchived : false;
            }
            if (data.trainingClass && data.trainingClass.siteId) {
                if (data.trainingClass.siteId == 30) {
                    this.siteStatus = true;
                } else {
                    this.siteStatus = false;
                }
            }
            this.loadData();
        });
        let data = {
            page: 0,
            size: 10,
            classId: this.route.snapshot.params.tbcId
        }
        this.exhibitionData(data);
    }

    exhibitionData = (params) => {
        this.exhibition = true;
        this.offeringCourseApi.exhibitionData(params).subscribe(
            data => {
                this.exhibitionDatas = data.content;
                this.total = data.totalElements
                // console.log(data)
                this.exhibition = false;
            },
            err => {
                this.exhibition = false;
            }
        );
    }
    handelChangeExhibition = (e) => {
        // console.log(e)
        let data = {
            page: e - 1,
            size: 10,
            classId: this.route.snapshot.params.tbcId
        }
        this.exhibitionData(data)
    }
    handelClickExhibition = () => {
        this.isExhibition = true;
    }
    handleOkExhibition = (e) => {
        this.isExhibition = false;
    }

    // 确认导出
    handleOkExport = (e) => {
        this.isVisibleExport = false;
        // console.log(this.selection);
        // console.log(this.trainingClass);
        let courseIds = []
        if (this.selection.length) {
            this.selection.map((item) => {
                courseIds.push(item.id)
            })
        }
        // console.log(courseIds)
        let data = {
            courseIds: courseIds,
            classId: this.trainingClass.id
        }
        this.offeringCourseApi.export(data, this.exportType).subscribe(
            dat => {
                // console.log(11)
                // console.log(dat)
                this.offeringCourseApi.download(this.exportType)
            },
            err => {
            }
        );
    }

    handleCancelExport = (e) => {
        this.isVisibleExport = false;
    }
    // 导出
    handelClickExport = (e) => {
        this.exportType = e
        if (this.selection.length) {
            this.exportContent = "已选"
        } else {
            this.exportContent = "全部"
        }
        this.isVisibleExport = true;

    }

    // 导入
    handelClickImport = () => {
        // console.log("导入")
        // this.router.navigate(['/import']);
        const route = this.route
        let courseIds = [];
        let localStorageArray = JSON.stringify(courseIds)
        window.localStorage.setItem('importArray', localStorageArray)
        this.router.navigate(['import'], { relativeTo: route });
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
        this.loading = true;

        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            ...this.searchBy,
            publishStatus: 1
        };
        if (this.searchBy.userGroupId) {
            params['userGroupId'] = this.searchBy.userGroupId.id;
        };
        this.teacherService.pageList(params).subscribe(
            data => {
                this.dat = data
                // console.log(data)
                this.loadin = false;
            },
            err => {
                this.loadin = false;
            }
        );
    }
    showTeacher = (item) => {
        this.isVisible = true;
        this.course = item;
        this.loadDat()

    }
    handleCancel = (e) => {
        this.isVisible = false;
        this.loading = false;
    }

    doAddCourseFromCurriculum({ sourceType, value }) {
        if (value && value.length > 0) {
            this.offeringCourseApi.addFromCurriculum(this.trainingClass.id, value.map(c => c.id), sourceType)
                .subscribe(
                ok => {
                    this.tipMessage('success', '添加课程成功！');
                    this.loadData();
                },
                err => {
                    this.tipMessage('error', '添加课程失败');
                },
                () => {
                    this.courseLookupSubmitted.next(true);
                }
                );
        }
    }
    refreshteacher(event) {
        // console.log(event, '添加讲师')
        if (event && event.value.length > 0) {
            let ids = event.value.map((item) => {
                return item.id;
            })
            // console.log(ids)
            this.teacherService.add(event.courseId, ids).subscribe(
                ok => {
                    this.isVisible = false;
                    this.loadData();
                    this.tipMessage('success', '添加课程讲师成功');
                },
                err => {
                    this.tipMessage('error', '添加课程讲师失败, 请重试', 3000);
                }
            );
        }
    }
    handleOk = (e) => {
        let selection = this.selectio
        if (selection && selection.length > 0) {
            this.teacherService.add(this.course.id, selection.map(it => it.id)).subscribe(
                ok => {
                    this.isVisible = false;
                    this.loadData();
                    this.tipMessage('success', '添加课程讲师成功');
                },
                err => {
                    this.tipMessage('error', '添加课程讲师失败, 请重试', 3000);
                }
            );
        } else {
            this.tipMessage('warning', '请至少选择一名讲师', 3000);
        }

    }
    _console = (e) => {
        this.inputValue = e
    }
    handelSearch = () => {
        this.searchBy.name = this.inputValue;
        this.loadDat();
    }

    loadData(page?: any) {
        this.loading = true;
        // console.log(page, 234)
        if (page) {
            this.pageIndexCourse = page.number + 1;
        }
        let params = {
            page: page && page.number || this.pageIndexCourse - 1,
            size: page && page.size || this.listPageSize,
            serchCourse: this.serchCourse
        };
        this.offeringCourseApi.getCourses(this.trainingClass.id, params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            }
        );
    }

    getCourseTypeText(key) {
        let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
        return texts[key] || '';
    }
    refreshTrainCourse(event) {
        if (event.type == 'C') {
            this.offeringCourseApi.addRefresh(this.trainingClass.id, event.value.map(c => c.id)).subscribe(
                ok => {
                    this.tipMessage('success', '添加课程成功');
                    this.loadData();
                },
                err => {
                    this.tipMessage('error', '添加课程失败');
                }
            );
        } else if (event.type == 'T') {
            this.offeringCourseApi.addRefreshCourseTeacher(this.trainingClass.id, event.value.map(c => c.id)).subscribe(
                ok => {
                    this.tipMessage('success', '添加课程和老师成功');
                    this.loadData();
                },
                err => {
                    this.tipMessage('error', '添加课程和老师失败');
                }
            );
        }
    }

    refreshCourse(courses: any) {
        // console.log(courses, 444);
        if (courses.value && courses.value.length > 0) {
            this.offeringCourseApi.addCourseSystem(this.trainingClass.id, courses.value.map(c => c.id), courses.sourceType).subscribe(
                ok => {
                    this.tipMessage('success', '添加课程成功');
                    this.loadData();
                },
                err => {
                    this.tipMessage('error', '添加课程失败');
                }
            );
        }
    }

    delete(courseId?: number) {
        let courseIds = [];
        if (courseId || (this.selection && this.selection.length > 0)) {
            courseIds = courseId ? [courseId] : this.selection.map(it => it.id);
        }

        if (!courseIds || courseIds.length == 0) {
            this.tipMessage('warning', '请选择要删除课程');
            return;
        }
        this.modalService.confirm({
            title: '删除',
            content: '确定要删除?',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk: () => {
                this.offeringCourseApi.delete(this.trainingClass.id, courseIds).subscribe(
                    ok => {
                        this.tipMessage('success', '删除课程成功');
                        this.loadData();
                    },
                    err => {
                        this.tipMessage('error', '删除课程失败');
                    }
                );
            },
            onCancel() { }
        })

    }
    searchList() {
        this.pageIndexCourse = 1;
        this.listPageSize = 10;
        let page = {
            page: this.pageIndexCourse - 1,
            size: this.listPageSize,
        }
        this.loadData(page);
    }
    toggleList() {
        this.showlist = true;
        this.listState = false;
    }
    toggleShowList() {
        this.showlist = false;
        this.listState = true;
    }
    _refreshStatus() {
        const allChecked = this.data.content.every(value => value.checked === true);
        const allUnChecked = this.data.content.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    }
    // 全选
    _checkAll(value) {
        if (this.data.content.length) {
            if (value) {
                this.data.content.forEach(data => {
                    data.checked = true;
                });
                this.selection = this.data.content;
            } else {
                this.data.content.forEach(data => {
                    data.checked = false;
                });
                this.selection = [];
            }
            this._refreshStatus();
        }
    }
    singlechecked(event, value) {
        // console.log(event, value)
        if (event && value.checked) {
            this.selection.push(value);
        } else {
            this.selection = this.selection.filter((item, index) => {
                return item.id !== value.id
            })
        }
        this._refreshStatus();
    }
    changePages(event) {
        // console.log(event);

        let page = {
            size: this.listPageSize,
            number: event - 1
        }
        this.loadData(page);
    }

    selectGroup(event: number, courseId: number) {
        this.offeringCourseApi.addCourseToGroup(this.trainingClass.id, courseId, event).subscribe(
            ok => {
                this.tipMessage('success', '修改分类成功');
            },
            err => {
                this.tipMessage('success', '修改分类失败');
            }
        );
    }

    tipMessage(type: string, text: string, duration?: number) {
        $.toast({
            icon: type,
            text: text,
            position: 'top-center',
            allowToastClose: false,
            hideAfter: duration || 1000
        })
    }

}
