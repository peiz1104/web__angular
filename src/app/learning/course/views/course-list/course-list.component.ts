import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { style } from '@angular/animations';
import { Category } from './../../../../system/category/entity/category';
import { Column } from 'console-ui-ng';
import { CourseService } from './../../service/course.service';
import { Course } from './../../entity/course';
import { Pagination } from './../../../../core/entity/pagination';
import { Component, OnInit } from '@angular/core';
import { UserGroup } from 'app/managementhours/entity/user-group';
import { tipMessage } from 'app/account/entity/message-tip';
declare let $: any;
@Component({
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

    searchBy: {
        category?: Category,
        status?: string,
        name?: string,
        userGroupId?: any
    } = {
            status: ''
        };

    _status = [
        { value: 'published', label: '已发布', disabled: false },
        { value: 'not-published', label: '未发布', disabled: false },
        { value: 'archived', label: '已归档', disabled: false },
    ];

    courses: Pagination<Course>;
    selection: Course[];
    loading: boolean = true;
    columns = [
        { title: '课程名称', data: 'name', tpl: 'colTitle' },
        { title: '编码', data: 'code' },
        { title: '所属组织', data: 'userGroup.name' },
        { title: '所属分类', data: 'category.name' },
        { title: '内容类型', data: 'courseType', tpl: 'colCourseType' },
        { title: '状态', tpl: 'colIsPublished' },
        // { title: '课程培训', data: 'courseTrainCount', styleClass: 'text-center' },
        { title: '操作', styleClass: 'text-right', tpl: 'rowAction' },
    ];

    columns2 = [
        { title: '缩略图', tpl: 'col2-0' },
        { title: '名称', tpl: 'col2-1' },
        { title: '编码', tpl: 'code' },
        { title: '类型', tpl: 'col2-2' },
        { title: '学时', tpl: 'period', styleClass: 'text-right' },
        { title: '组织', tpl: 'col2-3' },
        { title: '分类', tpl: 'cat' },
        { title: '状态', tpl: 'colIsPublished' },
        { title: '操作', styleClass: 'text-right', tpl: 'rowAction' },
    ];

    constructor(private courseService: CourseService, private message: NzMessageService, private modal: NzModalService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.courseService.getAllOfPage(this.getSearchParams(), page).subscribe(
            courses => {
                this.loading = false;
                this.courses = courses;
            },
            err => {
                this.loading = false;
            }
        );
    }

    datasource() {
        return this.courseService.getAllOfPage();
    }

    getSearchParams() {
        if (this.searchBy) {
            // console.log(this.searchBy)
            let params = {};
            params['name'] = this.searchBy.name;
            if (this.searchBy.status) {
                if (this.searchBy.status == 'published') {
                    params['isPublished'] = true;
                }
                if (this.searchBy.status == 'not-published') {
                    params['isPublished'] = false;
                }
                if (this.searchBy.status == 'archived') {
                    params['isArchived'] = true;
                }
            }
            if (this.searchBy.category && this.searchBy.category.id) {
                params['category.id'] = this.searchBy.category.id;
            }
            if (this.searchBy.userGroupId && this.searchBy.userGroupId.id) {
                params['userGroup.id'] = this.searchBy.userGroupId.id
            }
            return params;
        }
        return null;
    }

    getCourseTypeText(key) {
        let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
        return texts[key] || '';
    }

    delete(course?: Course, single_flag?: boolean) {
        this.batchOperate('delete', '删除', course, single_flag);
    }

    publish(course?: Course, single_flag?: boolean) {
        this.batchOperate('publish', '发布', course, single_flag);
    }

    disPublish(course?: Course, single_flag?: boolean) {
        this.batchOperate('disPublish', '撤销发布', course, single_flag);
    }

    archive(course?: Course) {
        this.batchOperate('archive', '归档', course, false);
    }

    disArchive(course?: Course) {
        this.batchOperate('disArchive', '撤销归档', course, false);
    }

    private batchOperate(action: string, actionName: string, course?: Course, single_flag?: boolean) {
        let selected = course ? [course] : this.selection;
        if (!selected || selected.length == 0) {
            this.tipMessage('warning', `请选择要${actionName}的课程`, 5000);
            return;
        }

        if (single_flag) {
            let canDel = true;
            let hasArchived = false;
            selected.forEach(c => {
                if (c.isPublished || c.isArchived) {
                    canDel = false;
                }
                if (c.isArchived) {
                    hasArchived = true;
                }
            });
            if (action == 'delete' && !canDel) {
                this.tipMessage('warning', '发布或归档状态下不允许删除', 3000);
                return;
            }
            if (action != "disArchive" && hasArchived) {
                this.tipMessage('warning', '已归档的课程不能做任何操作', 3000);
                return;
            }

            this.courseService[action](selected.map(it => it.id)).subscribe(
                ok => {
                    this.tipMessage('success', `${actionName}成功`, 3000);
                    this.loadData();
                },
                err => this.tipMessage('error', `${actionName}失败`)
            );
        } else {
            this.modal.confirm({
                title: `确定要${actionName}选择的课程吗？`,
                zIndex: 1003,
                onOk: () => {
                    let canDel = true;
                    let hasArchived = false;
                    selected.forEach(c => {
                        if (c.isPublished || c.isArchived) {
                            canDel = false;
                        }
                        if (c.isArchived) {
                            hasArchived = true;
                        }
                    });
                    if (action == 'delete' && !canDel) {
                        tipMessage('发布或归档状态下不允许删除', 'warning');
                        return;
                    }
                    if (action != "disArchive" && hasArchived) {
                        tipMessage('已归档的课程不能做任何操作', 'warning');
                        return;
                    }
                    this.courseService[action](selected.map(it => it.id)).subscribe(
                        ok => {
                            tipMessage(`${actionName}成功`, 'success');
                            this.loadData();
                        },
                        err => tipMessage(`${actionName}失败`, 'error')
                    );
                }
            });
        }
    }
    chooseCategory(value) {
        this.loadData();
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
