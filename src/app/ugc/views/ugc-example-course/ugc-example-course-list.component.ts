import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UgcExampleCourse } from './../../entity/ugc-example-course';
import { UgcExampleCourseService } from "./../../service/ugc-example-course.service";
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { tipMessage } from 'app/account/entity/message-tip';


@Component({
    selector: 'spk-ugc-example-course-list',
    templateUrl: './ugc-example-course-list.component.html',
    styleUrls: ['./ugc-example-course-list.component.scss']
})

export class UgcExampleCourseListComponent implements OnInit {

    data: Pagination<UgcExampleCourse>;
    searchList: any;
    loading: boolean;
    exampleCourse: UgcExampleCourse;
    selection: UgcExampleCourse[];
    @ViewChild('preview')
    private previewTempRef: TemplateRef<any>
    columns: Column[] = [
        { title: '标题', tpl: 'title' },
        { title: '类型', tpl: 'type', styleClass: 'text-center' },
        { title: '创建日期	', tpl: 'createdDate', styleClass: 'text-center' },
        { title: '创建人	', tpl: 'createdBy', styleClass: 'text-center' },
        { title: '发布状态', tpl: 'isPublished' },
        { title: '调整顺序', tpl: 'displayOrder' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' },
    ];

    courseTypeOptions = [
        { value: '', label: '全部' },
        { value: 'EXAMPLE', label: '样课' },
        { value: 'TUTORIAL', label: '教程' }
    ];
    searchText;
    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ugcExampleCourseService: UgcExampleCourseService,
        private message: NzMessageService,
        public sanitizer: DomSanitizer,
        private fb: FormBuilder,
        private modal: NzModalService,
        private layer: CuiLayer
    ) { }

    ngOnInit() {
        this.loadData();
        this.initSearchForm();
    }


    initSearchForm() {
        let that = this;
        this._searchForm = this.fb.group({
            searchText: [],
            type: ""
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
        this.ugcExampleCourseService.getAllOfPage(params).subscribe(
            data => {
                this.data = data;
                this.loading = false;
            },
            err => {
                tipMessage(err, 'error', 5000);
                this.loading = false;
            }
        );
    }

    hasSelection() {
        return this.selection && this.selection.length > 0;
    }

    _submitForm($event, value) {
        $event.preventDefault();
        this.searchList = value;
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





    publish(courses: UgcExampleCourse[], flag: boolean) {
        courses = courses ? courses : this.selection;
        if (!courses || courses.length <= 0) {
            tipMessage('请选择需要操作的课程', 'warning');
            return;
        }
        if (flag) {
            this.modal.confirm({
                title: `确认要发布选中的课程吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.ugcExampleCourseService.publish(courses.map(it => it.id)).subscribe(
                        () => {
                            tipMessage('发布成功', 'success');
                            courses.forEach(it => it.isPublished = true);
                        },
                        err => { this.layer.msg(err.message); }
                    );
                }
            });
        } else {
            this.ugcExampleCourseService.publish(courses.map(it => it.id)).subscribe(
                () => {
                    tipMessage('发布成功', 'success');
                    courses.forEach(it => it.isPublished = true);
                },
                err => { this.layer.msg(err.message); }
            );
        }
        /* this.layer.confirm(
            '确认要发布选中的课程吗？',
            () => {
                this.ugcExampleCourseService.publish(courses.map(it => it.id)).subscribe(
                    () => {
                        tipMessage('发布成功', 'success');
                        courses.forEach(it => it.isPublished = true);
                    },
                    err => { this.layer.msg(err.message); }
                );
            }
        ); */
    }
    cancel(courses: UgcExampleCourse[], flag: boolean) {
        courses = courses ? courses : this.selection;
        if (!courses || courses.length <= 0) {
            tipMessage('请选择需要操作的课程', 'warning');
            return;
        }
        if (flag) {
            this.modal.confirm({
                title: `确认要撤销发布选中的课程吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.ugcExampleCourseService.cancel(courses.map(it => it.id)).subscribe(
                        () => {
                            tipMessage('撤销发布成功', 'success');
                            courses.forEach(it => it.isPublished = false);
                        },
                        err => { tipMessage(err.message); }
                    );
                }
            });
        } else {
            this.ugcExampleCourseService.cancel(courses.map(it => it.id)).subscribe(
                () => {
                    tipMessage('撤销发布成功', 'success');
                    courses.forEach(it => it.isPublished = false);
                },
                err => { tipMessage(err.message); }
            );
        }
        /* this.layer.confirm(
            '确认要取消发布选中的课程吗？',
            () => {
                this.ugcExampleCourseService.cancel(courses.map(it => it.id)).subscribe(
                    () => {
                        tipMessage('取消发布成功', 'success');
                        courses.forEach(it => it.isPublished = false);
                    },
                    err => {
                        tipMessage(err.message);
                    }
                );
            }
        ); */
    }
    delete(courses: UgcExampleCourse[], flag: boolean) {
        courses = courses ? courses : this.selection;
        if (!courses || courses.length <= 0) {
            tipMessage('请选择需要操作的课程', 'warning');
            return;
        }
        if (flag) {
            this.modal.confirm({
                title: "确认要删除选中的课程吗？",
                onOk: () => {
                    this.ugcExampleCourseService.delete(courses.map(it => it.id)).subscribe(
                        () => {
                            tipMessage('删除成功', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage(err.message);
                        }
                    );
                }
            })
        } else {
            this.ugcExampleCourseService.delete(courses.map(it => it.id)).subscribe(
                () => {
                    tipMessage('删除成功', 'success');
                    this.loadData();
                },
                err => { tipMessage(err.message); }
            );
        }

    }
    moveUp(course: UgcExampleCourse) {
        this.ugcExampleCourseService.moveUp(course.id, { searchText: this.searchText }).subscribe(
            () => {
                this.loadData();
            },
            err => {
                this.layer.msg(err.message);
                this.layer.alert(err);
            }
        );
    }
    openPreview(course: UgcExampleCourse) {
        this.exampleCourse = course;
        // this.layer.open(this.previewTempRef);
        this.modal.open({
            title: "预览",
            content: this.previewTempRef,
            footer: false,
            maskClosable: false,
            // width: 1000
            wrapClassName: 'full-dialog'
        });
    }
    getSaveUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    moveDown(course: UgcExampleCourse) {
        this.ugcExampleCourseService.moveDown(course.id, { searchText: this.searchText }).subscribe(
            () => {
                this.loadData();
            },
            err => {
                this.layer.msg(err.message);
                this.layer.alert(err);
            }
        );
    }
}
