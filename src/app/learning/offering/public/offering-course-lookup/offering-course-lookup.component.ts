import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { Pagination } from './../../../../core/entity/pagination';
import { Column } from 'console-ui-ng';
import { Component, OnInit, ViewChild, TemplateRef, forwardRef, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Course } from '../../../course/entity/course';
import { OfferingCourseApiService } from '../../service/offering-course-api.service';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';
declare let $: any;
export const COURSE_LOOKUP_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OfferingCourseLookupComponent),
    multi: true
};

@Component({
    selector: 'spk-offering-course-lookup',
    templateUrl: './offering-course-lookup.component.html',
    styleUrls: ['./offering-course-lookup.component.scss'],
    providers: [COURSE_LOOKUP_VALUE_ACCESSOR]
})
export class OfferingCourseLookupComponent implements OnInit, ControlValueAccessor {
    @Input() offeringId: number;
    @Input() showSourceType: boolean = false; // 仅能通过afterSelected事件接受返回的值
    @Input() multiple;
    @Input() echoTpl: TemplateRef<any>;
    @Input() submitted: Subject<boolean>;
    @Input() trainingType: string;
    submitting: boolean = false;

    @ViewChild("lookupDialog") lookupDialog: TemplateRef<any>;
    @Output() afterSelected = new EventEmitter();

    sourceType: 'REFERENCED' | 'COPIED' = 'REFERENCED';
    searchType: 'H' | 'A' | 'G' = 'H';
    loading: boolean = true;
    courses: Pagination<any>;
    err;
    selection: Course[];
    showlist: boolean = true;
    listState: boolean = false;
    _allChecked = false;
    _indeterminate = false;
    pageIndex: number = 1;
    listPageSize: number = 10;
    currentSite: number;
    columns: Column[] = [
        // { title: '缩略图', tpl: 'thumbnail' },
        { title: '名称', tpl: 'nameAndCode' },
        { title: '编码', tpl: 'code' },
        { title: '类型', tpl: 'typeAndDuration' },
        { title: '组织', tpl: 'orgAndCate' },
        { title: '分类', tpl: 'categroy' },
        { title: '学时', tpl: 'period', styleClass: 'text-right' }
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
        private courseService: OfferingCourseApiService,
        private cd: ChangeDetectorRef,
        private modal: NzModalService,
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.getCurrentSite().subscribe(
            res => {
                this.currentSite = res.id;
            },
            err => {
                tipMessage(err);
            }
        )
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
            this.tipMessage('warning', '选择课程由于业务约束，已被禁用', 5000);
            return;
        }

        this.modalSubject = this.modal.open({
            title: '选择课程',
            content: this.lookupDialog,
            width: 1100,
            footer: false,
            zIndex: 1003
        });

        this.initSearchForm();
        this.selection = [];
        this.authService.getCurrentSite().subscribe(
            res => {
                this.currentSite = res.id;
            },
            err => {
                tipMessage(err);
            }
        )
        this.loadList();
    }

    initSearchForm() {
        this.searchForm = this.fb.group({
            searchText: [],
            type: [],
            category: [],
            userGroup: [],
        });
    }
    // 获取当前组织
    getCurrentGroup(call) {
        this.authService.getCurrentUser().subscribe(
            user => {
                if (user.userGroup) {
                    this.searchForm.get('userGroup').setValue([user.userGroup])
                }
                call();
            },
            error => {
                call();
            }
        )
    }
    // loadList(params?: any, page?: any) {
    loadList(page: any = {}) {

        this.loading = true;
        let params = this.searchForm.value;
        params = { ...params, isPublished: true, isArchived: false };
        if (this.searchType !== 'G') {
            delete params.userGroup;
        }
        if (this.currentSite == 30) {
            params['searchType'] = this.searchType
        }
        if (params.category) {
            params["category.id"] = params.category.id;
        }
        if (this.offeringId) {
            params['trainingType'] = this.trainingType;
        }
        if (params['userGroup']) {
            let userGroupForm = this.searchForm.value['userGroup'];
            if (Object.prototype.toString.call(userGroupForm) == "[object Array]") {
                params['userGroup.id'] = this.searchForm.value['userGroup'][0].id
            } else {
                params['userGroup.id'] = this.searchForm.value['userGroup'].id
            }
        }
        let pagep = {
            size: page ? page.size : this.listPageSize,
            number: page ? page.number : this.pageIndex - 1,
        }
        delete params.category;
        delete params.userGroup;
        this.courseService.getCoursesLookup(this.offeringId, pagep, params).subscribe(
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
        this.listPageSize = 10;
        this.pageIndex = 1;
        let page = {
            size: this.listPageSize,
            number: this.pageIndex - 1,
        }
        this.loadList(page);
    }
    chooseCategory(value) {
        this.loadList();
    }
    ok(e) {
        if (this.getSelection()) {
            this.value = this.getSelection();
            this.afterSelected.emit(this.showSourceType ? { sourceType: this.sourceType, value: this.value } : this.value);
            this.onModelChange(this.value);
        } else {
            this.tipMessage('warning', '请选择课程');
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
    tipMessage(type: string, text: string, duration?: number) {
        $.toast({
            icon: type,
            text: text,
            position: 'top-center',
            allowToastClose: false,
            hideAfter: duration || 1000
        })
    }
    toggleList() {
        this.listState = false;
        this.showlist = true;
    }
    toggleShowList() {
        this.listState = true;
        this.showlist = false;
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
    changePageSize(event) {
        let page = {
            size: event,
            number: this.pageIndex - 1
        }
        this.loadList(page);
    }
    // 默认选择
    choosedefalutcourse(value) {
        // console.log(value, 244);
        this.searchType = value;
    }
}
