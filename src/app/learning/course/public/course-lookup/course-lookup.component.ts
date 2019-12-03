import { OfferingGroup } from './../../../../training/entity/offering_group';
import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { Course } from './../../entity/course';
import { Pagination } from './../../../../core/entity/pagination';
import { CourseService } from './../../service/course.service';
import { Column } from 'console-ui-ng';
import { Component, OnInit, ViewChild, TemplateRef, forwardRef, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { tipMessage } from 'app/account/entity/message-tip';

export const COURSE_LOOKUP_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CourseLookupComponent),
    multi: true
};

@Component({
    selector: 'spk-course-lookup',
    templateUrl: './course-lookup.component.html',
    styleUrls: ['./course-lookup.component.scss'],
    providers: [COURSE_LOOKUP_VALUE_ACCESSOR]
})
export class CourseLookupComponent implements OnInit, ControlValueAccessor {

    @Input() showSourceType: boolean = false; // 仅能通过afterSelected事件接受返回的值
    @Input() multiple;
    @Input() echoTpl: TemplateRef<any>;
    @Input() submitted: Subject<boolean>;
    submitting: boolean = false;

    @ViewChild("lookupDialog") lookupDialog: TemplateRef<any>;
    @Output() afterSelected = new EventEmitter();

    sourceType: 'REFERENCED' | 'COPIED' = 'COPIED';

    loading: boolean = true;
    courses: Pagination<Course>;
    err;
    selection: Course[];

    columns: Column[] = [
        { title: '缩略图', tpl: 'thumbnail' },
        { title: '名称/编码', tpl: 'nameAndCode' },
        { title: '类型/学时', tpl: 'typeAndDuration' },
        { title: '组织/分类', tpl: 'orgAndCate' },
    ];

    searchForm: FormGroup;

    modalSubject: NzModalSubject;

    @Input() disabled: boolean;
    value: Course | Course[];
    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };

    _getCourseTypeText(key) {
        let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
        return texts[key] || '';
    }


    constructor(
        private courseService: CourseService,
        private cd: ChangeDetectorRef,
        private modal: NzModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
    }

    writeValue(value: any): void {
        this.value = value;
        this.cd.markForCheck();
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    openLookup(group?: OfferingGroup) {
        if (this.disabled) {
            tipMessage('选择课程由于业务约束，已被禁用', '', 3000);
            return;
        }

        this.modalSubject = this.modal.open({
            title: '选择课程',
            content: this.lookupDialog,
            width: 1000,
            footer: false,
            zIndex: 1003,
        });

        this.initSearchForm();
        this.selection = [];
        if (group && group.id) {
            this.loadGroupCourse(group);
        } else {
            this.loadList();
        }
    }

    loadGroupCourse(group: any, page?: any) {
        this.loading = true;
        let params;
        if (page) {
            params = {
                ...this.searchForm.value,
                page: page ? page.number : 0,
                size: page ? page.size : 10,
                // sort: page && page.sort ? page.sort : null
            };
        } else {
            params = {
                ...this.searchForm.value,
                page: this.courses ? this.courses.number : 0,
                size: this.courses ? this.courses.size : 10,
                // sort: page && page.sort ? page.sort : null
            };
        }

        // let params = this.searchForm.value;
        params = { ...params, isPublished: true, isArchived: false, groupId: group.id };
        this.courseService.getAllGroupCourse(params, page).subscribe(
            courses => {
                this.courses = courses;
                this.loading = false;
            },
            err => {
                this.err = err;
                this.loading = false;
            }
        );
    }

    initSearchForm() {
        this.searchForm = this.fb.group({
            searchText: [],
            type: [],
            category: [],
            userGroup: []
        });
    }

    // loadList(params?: any, page?: any) {
    loadList(page?: any) {
        this.loading = true;
        let params;
        if (page) {
            params = {
                ...this.searchForm.value,
                page: page ? page.number : 0,
                size: page ? page.size : 10,
                // sort: page && page.sort ? page.sort : null
            };
        } else {
            params = {
                ...this.searchForm.value,
                page: this.courses ? this.courses.number : 0,
                size: this.courses ? this.courses.size : 10,
                // sort: page && page.sort ? page.sort : null
            };
        }
        if (this.searchForm.value["userGroup"] && this.searchForm.value["userGroup"].id) {
            let userGroup = this.searchForm.value["userGroup"];
            delete params["userGroup"];
            params['userGroup.id'] = userGroup.id;
        }
        if (this.searchForm.value["category"] && this.searchForm.value["category"].id) {
            let category = this.searchForm.value["category"];
            delete params["category"];
            params['category.id'] = category.id;
        }
        params = { ...params, isPublished: true, isArchived: false };
        this.courseService.getAllOfPage(params, page).subscribe(
            courses => {
                this.courses = courses;
                this.loading = false;
            },
            err => {
                this.err = err;
                this.loading = false;
            }
        );
    }

    _submitSearchForm(e, v) {
        let page = {
            page: 0,
            size: this.courses ? this.courses.size : 10,
        }
        this.loadList(page);
    }

    ok(e) {
        if (this.getSelection()) {
            this.value = this.getSelection();
            this.afterSelected.emit(this.showSourceType ? { sourceType: this.sourceType, value: this.value } : this.value);
            this.onModelChange(this.value);
        } else {
            tipMessage('请选择课程');
            return;
        }
        if (this.submitted) {
            this.submitting = true;
            this.submitted.subscribe(
                () => {
                    this.submitting = false;
                    this.modalSubject.destroy('onOk');
                },
                err => {
                    this.submitting = false;
                    this.modalSubject.destroy('onOk');
                }
            );
        } else {
            this.modalSubject.destroy('onOk');
        }
    }

    cancel(e) {
        this.modalSubject.destroy('onCancel');
    }

    getSelection(): Course | Course[] {
        if (this.selection && this.selection.length > 0) {
            return this.multiple ? this.selection : this.selection[0];
        }
    }
}
