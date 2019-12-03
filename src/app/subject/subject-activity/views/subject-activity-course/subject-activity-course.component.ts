import { SubjectActivity } from '../../../../subject/entity/subject-activity';
import { OfferingCourseApiService } from './../../../../training/service/offering-course-api.service';
import { NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { Course } from './../../../../learning/course/entity/course';
import { Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OfferingGroupService } from '../../../../learning/offering/service/offering-group-api.service';
import { OfferingGroup } from 'app/training/entity/offering_group';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-subject-activity-course',
    templateUrl: './subject-activity-course.component.html',
    styleUrls: ['./subject-activity-course.component.scss']
})
export class SubjectActivityCourseComponent implements OnInit {

    data: Pagination<any>;
    loading: boolean;
    selection: any[];

    subjectActivity: SubjectActivity;

    courseGroups: OfferingGroup[];

    columns: Column[] = [
        { title: '缩略图', tpl: 'thumbnail' },
        { title: '名称/编码', tpl: 'name' },
        { title: '类型/学时', tpl: 'type' },
        { title: '所属分类', tpl: 'cate' },
        { title: '课程考试', tpl: 'courseExam' },
        { title: '课程讨论', tpl: 'courseForum' },
        { title: '选择分组', tpl: 'courseGroup', styleClass: 'text-center' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' },
    ];

    _searchForm: FormGroup;


    constructor(
        private route: ActivatedRoute,
        private offeringCourseApi: OfferingCourseApiService,
        private fb: FormBuilder,
        private offeringGroupService: OfferingGroupService,
        private modal: NzModalService,
    ) { }

    get hasSelection() {
        return this.selection && this.selection.length > 0;
    }

    ngOnInit() {
        this.initSearchForm();
        this.route.data.subscribe((data: { subjectActivity: SubjectActivity }) => {
            this.subjectActivity = data.subjectActivity;
            this.initGroups();
        });
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            searchText: ""
        });
    }

    loadData(page?) {
        this.loading = true;
        let params = this._searchForm && this._searchForm.value;
        this.offeringCourseApi.getCourses(this.subjectActivity.id, page, params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    initGroups() {
        this.offeringGroupService.getAllGroup(this.subjectActivity.id).subscribe(
            groups => {
                this.courseGroups = groups;
                let defoult = { "id": 0, "name": "无分组" };
                this.courseGroups.push(defoult);
                this.loadData();
            },
            err => {
                this.loadData();
            }
        );
    }

    getCourseTypeText(key) {
        let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
        return texts[key] || '';
    }

    refreshCourse(courses: Course[]) {
        if (courses && courses.length > 0) {
            this.offeringCourseApi.addRefresh(this.subjectActivity.id, courses.map(c => c.id)).subscribe(
                ok => {
                    tipMessage('添加课程成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage('添加课程失败');
                }
            );
        }
    }

    delete(courseId?: number, flag?: boolean) {
        let courseIds = [];
        if (courseId || (this.selection && this.selection.length > 0)) {
            courseIds = courseId ? [courseId] : this.selection.map(it => it.id);
        }

        if (!courseIds || courseIds.length == 0) {
            tipMessage('请选择要删除的课程', 'warning', 3000);
            return;
        }

        if (flag) {
            this.offeringCourseApi.delete(this.subjectActivity.id, courseIds).subscribe(
                ok => {
                    tipMessage('删除课程成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage('删除课程失败');
                }
            );
        } else {
            this.modal.confirm({
                title: "确认删除选中的课程吗？",
                zIndex: 1003,
                onOk: () => {
                    this.offeringCourseApi.delete(this.subjectActivity.id, courseIds).subscribe(
                        ok => {
                            tipMessage('删除课程成功', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage('删除课程失败', 'error');
                        }
                    );
                }
            })
        }
    }

    selectGroup(event: number, courseId: number) {
        this.offeringCourseApi.addCourseToGroup(this.subjectActivity.id, courseId, event).subscribe(
            ok => {
                tipMessage('修改分类成功', 'success');
            },
            err => {
                tipMessage('修改分类失败');
            }
        );
    }

}
