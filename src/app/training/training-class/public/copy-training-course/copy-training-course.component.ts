import { NzMessageService, NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { Course } from './../entity/course';
import { Pagination } from './../../../../core/entity/pagination';
import { TrainingClassApiService } from '../../../service/training-class-api.service';
import { Column } from 'console-ui-ng';
import { AuthService } from 'app/core';
import { Component, OnInit, ViewChild, TemplateRef, forwardRef, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

export const COPY_COURSE_LOOKUP_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CopyTrainingCourseComponent),
    multi: true
};

@Component({
    selector: 'spk-copy-training-course',
    templateUrl: './copy-training-course.component.html',
    styleUrls: ['./copy-training-course.component.scss'],
    providers: [COPY_COURSE_LOOKUP_VALUE_ACCESSOR]
})
export class CopyTrainingCourseComponent implements OnInit {
    @Input() trainId;
    @Input() groupName;
    @Input() multiple;
    @Input() trainingType;
    @Input() echoTplCopy: TemplateRef<any>;

    @ViewChild("lookupDialog") lookupDialog: TemplateRef<any>;
    @Output() afterSelected = new EventEmitter();
    loading: boolean = false;
    err;
    trainList = []; // 培训班列表
    courseList = []; // 课程列表
    spinning: boolean = false;
    selection: any[];
    _allChecked = false;
    _indeterminate = false;
    trainName;
    activeId;

    searchForm: FormGroup;
    nowYear = new Date().getFullYear();
    modalSubject: NzModalSubject;

    @Input() disabled: boolean;
    value: Course | Course[];
    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };

    getCourseTypeText(key) {
        let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
        return texts[key] || '';
    }


    constructor(
        private courseService: TrainingClassApiService,
        private cd: ChangeDetectorRef,
        private message: NzMessageService,
        private modal: NzModalService,
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit() {
        console.log(this.groupName, 444)
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
            tipMessage('选择课程由于业务约束，已被禁用', 'warning');
            return;
        }

        this.modalSubject = this.modal.open({
            title: '选择课程',
            content: this.lookupDialog,
            width: 1100,
            footer: false,
            zIndex: 1003,
            onCancel: () => {
                this.resetModalData()
            }
        });

        this.initSearchForm();
        this.selection = [];
        this.loadTrainList();
    }
    resetModalData() {
        this.selection = [];
        this._allChecked = false;
        this._indeterminate = false;
        this.courseList = [];
        this.trainName = undefined;
        this.activeId = undefined;
    }
    initSearchForm() {
        this.searchForm = this.fb.group({
            name: [],
            planYear: [this.nowYear],
            groupName: [this.groupName],
            performerSearch: []
        });
    }
    getCourserListData(value) {
        this.trainName = value.name
        this.activeId = value.id;
        this.loadCourseList(value.id)
    }
    loadCourseList(id?: any) {
        this.loading = true;
        let params = {
            trainingType: this.trainingType,
            tbcId: this.trainId
        }
        this.courseService.getAllCourseList(id, params).subscribe(
            (res) => {
                this.courseList = res;
                this.loading = false;
                this.selection = [];
                this._allChecked = false;
                this._indeterminate = false;
            },
            err => {
                tipMessage(err);
                this.loading = false
            }
        )
    }
    loadTrainList() {
        this.spinning = true;
        let params = {};
        if (this.searchForm.value && this.searchForm.value.name) {
            params['name'] = this.searchForm.value.name
        }
        if (this.searchForm.value && this.searchForm.value.planYear) {
            params['planYear'] = this.searchForm.value.planYear
        }
        if (this.searchForm.value && this.searchForm.value.groupName) {
            params['groupName'] = this.searchForm.value.groupName
        }
        if (this.searchForm.value && this.searchForm.value.performerSearch) {
            params['performerSearch'] = this.searchForm.value.performerSearch
        }
        params['id'] = this.trainId;
        this.courseService.getAllTrainList(params).subscribe(
            (res) => {
                this.trainList = res;
                this.spinning = false;
            },
            err => {
                this.spinning = false;
                tipMessage(err);
            }
        )
    }

    _submitSearchForm(e, v) {
        this.loadTrainList();
    }

    ok(e) {
        if (this.getSelection()) {
            this.value = this.getSelection();

            this.afterSelected.emit({ value: this.value, type: 'C' });
            this.onModelChange(this.value);
        } else {
            tipMessage('请选择课程', 'warning');
            return;
        }
        this.resetModalData()
        this.modalSubject.destroy('onOk');
    }
    // 复制课程
    copyCourse() {
        if (this.courseList.length == 0) {
            return tipMessage('没有选择课程');
        }
        this.afterSelected.emit({ value: this.courseList, type: 'C' });

        this.resetModalData()
        this.modalSubject.destroy('onOk');
    }
    // 复制课程和讲师
    copyCourseTeacher() {
        if (this.courseList.length == 0) {
            return tipMessage('没有选择课程')
        }
        this.afterSelected.emit({ value: this.courseList, type: 'T' });
        this.resetModalData()
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
    _refreshStatus() {
        const allChecked = this.courseList.every(value => value.checked === true);
        const allUnChecked = this.courseList.every(value => !value.checked);
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
        if (this.courseList.length) {
            if (value) {
                this.courseList.forEach(data => {
                    data.checked = true;
                });
                this.selection = this.courseList;
            } else {
                this.courseList.forEach(data => {
                    data.checked = false;
                });
                this.selection = [];
            }
            this._refreshStatus();
        }
    }
    getPathName(value) {
        if (value) {
            if (value.indexOf(',') != -1 || value.indexOf('，') != -1) {
                return value.replace(/(\,|\，)/g, '/');
            } else {
                return value;
            }
        } else {
            return '---'
        }
    }

}
