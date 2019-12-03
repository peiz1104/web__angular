import { CuiPagination, Column } from 'console-ui-ng';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import {
    Component, OnInit, AfterViewInit, forwardRef,
    Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild
} from '@angular/core';
import { NzModalService, NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { TrainingClassApiService } from '../../../service/training-class-api.service';
import { Teacher } from '../entity/teacher';
import { AuthService } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-course-teacher-system-lookup',
    templateUrl: './course-teacher-system-lookup.component.html',
    styleUrls: ['./course-teacher-system-lookup.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CourseTeacherSystemLookupComponent),
        multi: true
    }]
})
export class CourseTeacherSystemLookupComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @Input() selectionType: any;
    @Input() courseId: any;
    @Input() needCourseId: any;
    @Input() mode: 'single' | 'multiple' = 'multiple';
    @Input() placeholder: string = '请选择用户...';
    @Input() overflow: number = 50;
    @Input() teacherListApiUrl: string;

    @Output() ok: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() remove: EventEmitter<any> = new EventEmitter();

    @ContentChild("echoTpl") echoTpl: TemplateRef<any>;
    @ContentChild("echoItemTpl") echoItemTpl: TemplateRef<any>;

    @ViewChild("lookupModalTitle") lookupModalTitle: TemplateRef<any>;
    @ViewChild("lookupModalContent") lookupModalContent: TemplateRef<any>;
    @ViewChild("lookupModalFooter") lookupModalFooter: TemplateRef<any>;
    _value;
    loading;
    confirming;
    disabled;
    _searchForm: FormGroup;
    teacher: Teacher = new Teacher();

    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;
    displayName: any;
    userName: any;
    userGroupId: any;
    modalSubject: NzModalSubject;
    teacherData: any;
    pagination: CuiPagination;
    columns: Column[] = [
        { title: '讲师编号', data: 'teacherNo', styleClass: 'text-left' },
        { title: '讲师工号', data: 'username', styleClass: 'text-left' },
        { title: '讲师姓名', data: 'name', styleClass: 'text-left' },
        { title: '性别', tpl: 'sex', styleClass: 'text-center' },
        { title: '所属机构', tpl: 'group', styleClass: 'text-left' },
        { title: '讲师类型', tpl: 'type', styleClass: 'text-center' },
        { title: '讲师级别', tpl: 'rank', styleClass: 'text-center' },
        { title: '累计课时量', data: 'classHour', styleClass: 'text-center' },
    ];

    withChildGroup = false;

    isComplexSearch = false;

    target: any;
    tableLoading: boolean = false;
    selection: any[] = [];
    constructor(
        private modal: NzModalService,
        private message: NzMessageService,
        private teacherLookupApi: TrainingClassApiService,
        private fb: FormBuilder,
        private authService: AuthService,
    ) { }

    ngOnInit() {
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            userName: [],
            displayName: [],
            userGroupId: [],
        });
    }
    ngAfterViewInit() {
        if (this.echoTpl) {
            return;
        } else {
            // 设置回显列表模板
            // 设置回显列表项模板
        }
    }

    writeValue(value: any): void {
        console.log(value)
        this._value = value;
        this.selection = value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    get isSingle() {
        return this.mode != 'multiple';
    }

    get isMultiple() {
        return this.mode == 'multiple';
    }

    openLookup() {
        if (this.disabled) {
            tipMessage('选择讲师由于业务约束，已被禁用', 'warning', 3000);
            return;
        }
        this.modalSubject = this.modal.open({
            title: this.lookupModalTitle,
            content: this.lookupModalContent,
            footer: this.lookupModalFooter,
            maskClosable: false,
            width: 1000,
            zIndex: 1003,
            onOk: () => { },
            onCancel: () => { }
        });
        this.initSearchForm();
        this.authService.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.teacher.userGroupId = user.managerGroup;
                    this._searchForm.get('userGroupId').setValue([user.managerGroup])
                }
                if (!user.managerGroup) {
                    this.teacher.userGroupId = user.userGroup;
                    this._searchForm.get('userGroupId').setValue([user.userGroup])
                }
                this.loadData();
            }
        )
    }

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.teacher = value;
        // console.log(value, 2333)
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
    loadData(page?: CuiPagination) {
        this.loading = true;
        let teacher = new Teacher();
        if (this.teacher.displayName) {
            teacher.displayName = this.teacher.displayName
        }
        if (this.teacher.userGroupId) {
            if (Object.prototype.toString.call(this.teacher.userGroupId) == '[object Object]') {
                teacher.userGroupId = this.teacher.userGroupId;
            } else {
                teacher.userGroupId = this.teacher.userGroupId[0];
            }
        }
        if (this.teacher.userName) {
            teacher.userName = this.teacher.userName
        }

        let params = {
            page: page && page.number || 0,
            size: page && page.size || 10,
            courseId: this.courseId,
            displayName: '',
            userGroupId: '',
            userName: '',

        }
        if (this.teacher.displayName) {
            params.displayName = teacher.displayName;
        }
        if (this.teacher.userName) {
            params.userName = teacher.userName;
        }
        if (this.teacher.userGroupId) {
            params.userGroupId = teacher.userGroupId.id;
        }
        this.teacherLookupApi.getTeacherList(params).subscribe(
            (res) => {
                this.loading = false;
                this.teacherData = res;
                // console.log(res, 'zlc');
            }
        )
    }
    _remove(e, u, v) {
        e.stopPropagation();

        if (this.disabled) {
            return;
        }

        this.selection = this.selection.filter(it => it.id != u.id);
        this._value = this.selection;
        this.onChange(this._value);
        this.remove.emit({ u, v });
    }

    clear(e) {
        e.stopPropagation();

        if (this.disabled) {
            return;
        }

        let _value = this._value;
        this.selection = [];
        this._value = [];
        this.onChange(this._value);
    }

    _ok() {
        if (this.selection && this.selection.length == 0) {
            return tipMessage('请选择讲师', 'warning', 3000);
        }
        this._value = this.selection;
        this.onChange(this._value);

        this.modalSubject.destroy("onOk");
        if (this.needCourseId) {
            this.ok.emit({ value: this._value, courseId: this.courseId });
        } else {
            this.ok.emit(this._value);
        }
    }

    _cancel() {
        this.modalSubject.destroy("onCancel");
        this.cancel.emit();
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

    // 所属机构处理
    namePath(str) {
        if (str) {
            return str.replace(/,/g, '/');
        } else {
            return "--";
        }
    }


}
