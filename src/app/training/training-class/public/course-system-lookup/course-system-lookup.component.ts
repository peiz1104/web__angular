import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { Course } from './../entity/course';
import { Pagination } from './../../../../core/entity/pagination';
import { CourseService } from './../../../../learning/course/service/course.service';
import { Column } from 'console-ui-ng';
import { Component, OnInit, ViewChild, TemplateRef, forwardRef, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

export const COURSE_LOOKUP_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CourseSystemLookupComponent),
    multi: true
};

@Component({
    selector: 'spk-course-system-lookup',
    templateUrl: './course-system-lookup.component.html',
    styleUrls: ['./course-system-lookup.component.scss'],
    providers: [COURSE_LOOKUP_VALUE_ACCESSOR]
})
export class CourseSystemLookupComponent implements OnInit, ControlValueAccessor {
    @Input() multiple;
    @Input() echoTpl: TemplateRef<any>;

    @ViewChild("lookupDialog") lookupDialog: TemplateRef<any>;
    @Output() afterSelected = new EventEmitter();
    loading: boolean = true;
    showlist: boolean = true;
    listState: boolean = false;
    courses: Pagination<any>;
    err;
    selection: any[];
    _allChecked = false;
    _indeterminate = false;
    pageIndex: number = 1;
    listPageSize: number = 10;
    columns: Column[] = [
        { title: '名称', tpl: 'thumbnail' },
        { title: '编码', tpl: 'nameAndCode' },
        { title: '类型', tpl: 'typeAndDuration' },
        { title: '学时', tpl: 'period', styleClass: 'text-right' },
        { title: '组织', tpl: 'orgAndCate' },
        { title: '分类', tpl: 'categroy' }
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

    openLookup() {
        if (this.disabled) {
            tipMessage('选择课程由于业务约束，已被禁用');
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
        this.loadList();
    }

    initSearchForm() {
        this.searchForm = this.fb.group({
            searchText: [],
            type: [],
            category: [],
            'userGroup.id': []
        });
    }

    // loadList(params?: any, page?: any) {
    loadList(page?: any) {
        this.loading = true;
        if (page) {
            this.listPageSize = page.size;
            this.pageIndex = page.number + 1; { }
        }
        let params = this.searchForm.value;
        if (this.searchForm.value['userGroup.id']) {
            params = {
                ...params,
                'userGroup.id': this.searchForm.value['userGroup.id'].id
            }
            // console.log(params)
        }
        params = { ...params, isPublished: true, isArchived: false, "category.id": params.category && params.category.id };
        delete params.category;
        this.courseService.getAllOfPage(params, page).subscribe(
            courses => {
                this.courses = courses;
                this.loading = false;
                this.selection = [];
            },
            err => {
                this.err = err;
                this.loading = false;
            }
        );
    }

    _submitSearchForm(e, v) {
        this.loadList();
    }

    ok(e) {
        if (this.getSelection()) {
            this.value = this.getSelection();
            this._allChecked = false;
            this._indeterminate = false;
            this.pageIndex = 1;
            this.listPageSize = 10;
            this.afterSelected.emit(this.value);
            this.onModelChange(this.value);
        } else {
            tipMessage('请选择课程');
            return;
        }
        this.modalSubject.destroy('onOk');
    }

    cancel(e) {
        this.modalSubject.destroy('onCancel');
    }

    getSelection(): Course | Course[] {
        if (this.selection && this.selection.length > 0) {
            return this.multiple ? this.selection : this.selection[0];
        }
    }
    toggleShowList() {
        this.listState = true;
        this.showlist = false;
    }
    toggleList() {
        this.listState = false;
        this.showlist = true;
    }
    _refreshStatus() {
        const allChecked = this.courses.content.every(value => value.checked === true);
        const allUnChecked = this.courses.content.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
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
    // 全选
    _checkAll(value) {
        if (this.courses.content.length) {
            if (value) {
                this.courses.content.forEach(data => {
                    data.checked = true;
                });
                this.selection = this.courses.content;
            } else {
                this.courses.content.forEach(data => {
                    data.checked = false;
                });
                this.selection = [];
            }
            this._refreshStatus();
        }
    }
    changePages(event) {
        // console.log(event);
        let page = {
            size: this.listPageSize,
            number: event - 1
        }
        this.loadList(page);

    }

}
