import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, enableProdMode } from '@angular/core';
import { UgcActivity } from './../../entity/ugc-activity';
import { UserGroup } from 'app/system/entity/user-group';
@Component({
    selector: 'spk-ugc-activity-form',
    templateUrl: './ugc-activity-form.component.html',
    styleUrls: ['./ugc-activity-form.component.scss']
})
export class UgcActivityFormComponent implements OnInit {

    @Input() ugcActivity: UgcActivity;
    @Input() loading: boolean = false;

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    validateForm: FormGroup;
    leaderOption: any;
    thumbnail: string;
    categoryType: boolean = false;
    _startDateEnd = null;
    _activityStatus = [
        { value: 'DRAFT', label: '草稿', disabled: false },
        { value: 'PREPARE', label: '准备中', disabled: false },
        { value: 'GOING', label: '进行中', disabled: false },
        { value: 'FINISHED', label: '已结束', disabled: false },
    ];


    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.initForm();
        this.leaderOption = [
            { value: 'jack', label: '杰克' },
            { value: 'lucy', label: '露西' },
            { value: 'tom', label: '汤姆' }
        ];
    }

    initForm() {
        let m = this.ugcActivity || new UgcActivity();
        this.thumbnail = m.thumbnail;
        let userGroup: UserGroup;
        if (m.userGroupId && m.userGroupName) {
            userGroup = new UserGroup();
            userGroup.id = m.userGroupId;
            userGroup.name = m.userGroupName;
        }

        this.validateForm = this.fb.group({
            title: [m.title, [Validators.required]],
            thumbnail: [m.thumbnail],
            cover: [m.cover],
            leaders: [m.leaders],
            startDate: [m.startDate || new Date, [Validators.required]],
            endDate: [m.endDate, [Validators.required]],
            isAudit: [m.isAudit || false],
            uploadStartDate: [m.uploadStartDate, [Validators.required]],
            uploadEndDate: [m.uploadEndDate, [Validators.required]],
            enrollStartDate: [m.enrollStartDate],
            enrollEndDate: [m.enrollEndDate],
            // status: [m.status || 'DRAFT'],
            content: [m.content],
            userGroup: [userGroup, Validators.required],
            category: [m.category]
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    markAsDirty() {
        for (let name of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[name].markAsDirty();
        }
    }

    onImageUpload(image) {
        if (image) {
            this.getFormControl('thumbnail').setValue(image.relativePath);
            this.getFormControl('cover').setValue(image.relativePath);
        }
    }



    _save(event) {
        this.markAsDirty();
        this.categoryType = this.getFormControl('category').value ? (this.getFormControl('category').value.id ? false : true) : true;
        if (this.categoryType) {
            return false;
        }
        if (this.validateForm.invalid) {
            return;
        }

        // this.validateForm.value.sponsorDeptId = this.validateForm.value.sponsorDeptId && this.validateForm.value.sponsorDept.id;
        // this.validateForm.value.undertakeDeptId = this.validateForm.value.undertakeDeptId && this.validateForm.value.undertakeDept.id;
        this.save.emit({ originalEvent: event, value: this.validateForm.value });
    }

    logSelectCategory(event) {
        this.categoryType = event ? false : true;
    }

    _cancel(event) {
        this.cancel.emit({ originalEvent: event });
    }

    // 表单日期处理
    // 开始日期
    // 活动开始
    _startDateBeginChange = () => {
      if (this.getFormControl('startDate').value > this.getFormControl('endDate').value) {
          this.getFormControl('endDate').setValue(null);
      }
    };
    // 活动结束
    _startDateEndChange = () => {
        let notNull = this.getFormControl('startDate').value != null && this.getFormControl('endDate').value != null ;
        if (notNull && (this.getFormControl('startDate').value >  this.getFormControl('endDate').value) ) {
            this.getFormControl('startDate').setValue(null);
        }

        if ( this._startDateEnd != null && this.getFormControl('enrollStartDate').value >  this._startDateEnd) {
            this.getFormControl('enrollStartDate').setValue(null);
            this.validateForm.controls['enrollStartDate'].markAsPristine();
        }
        if (this.getFormControl('enrollEndDate').value >  this._startDateEnd) {
            this.getFormControl('enrollEndDate').setValue(null);
            this.validateForm.controls['enrollEndDate'].markAsPristine();
        }
        if (this._startDateEnd != null &&  this.getFormControl('uploadStartDate').value >  this._startDateEnd) {
            this.getFormControl('uploadStartDate').setValue(null);
            this.validateForm.controls['uploadStartDate'].markAsPristine();
        }
        if (this.getFormControl('uploadEndDate').value >  this._startDateEnd) {
            this.getFormControl('uploadEndDate').setValue(null);
            this.validateForm.controls['uploadEndDate'].markAsPristine();
        }
    };
    // 活动开始
    _disabledStartDateBegin = (startValue) => {
        if (!startValue || !this.getFormControl('endDate').value) {
            return false;
        }
        return startValue.getTime() > new Date(this.getFormControl('endDate').value).getTime();
    };
    _disabledStartDateEnd = (endValue) => {
        if (!endValue || !this.getFormControl('startDate').value) {
            return false;
        }
        return endValue.getTime() <  new Date(this.getFormControl('startDate').value).getTime();
    };
    // 结束日期
    // 报名开始
    _endDateBeginChange = () => {
        if (this.getFormControl('enrollStartDate').value > this.getFormControl('enrollEndDate').value) {
            this.getFormControl('enrollEndDate').setValue(null);
        }
    };
    // 报名结束时间
    _endDateEndChange = () => {
        let notNull = this.getFormControl('startDate').value != null && this.getFormControl('endDate').value != null ;
        if (notNull && (this.getFormControl('startDate').value > this.getFormControl('endDate').value) ) {
            this.getFormControl('startDate').setValue(null);
        }
    };
    // 报名开始--禁用日期
    _disabledEndDateBegin = (startValue) => {
        if (this.getFormControl('enrollEndDate').value) {
            return startValue.getTime() > new Date(this.getFormControl('enrollEndDate').value).getTime();
        }
        if (this.getFormControl('endDate').value) {
            return startValue.getTime() > new Date(this.getFormControl('endDate').value).getTime();
        }
        // return startValue.getTime() > new Date(this.getFormControl('endDate').value).getTime();
    };
    // 报名结束--禁用日期
    _disabledEndDateEnd = (endValue) => {
        if (!endValue || !this.getFormControl('enrollStartDate').value) {
            return false;
        }
        return (endValue.getTime() >  new Date(this.getFormControl('endDate').value).getTime()
            || endValue.getTime() < new Date(this.getFormControl('enrollStartDate').value).getTime());
    };


    // 上传开始日期--禁用日期
    _disableduploadStartDate = (startValue) => {

        if (this.getFormControl('uploadEndDate').value) {
            return  startValue.getTime() > new Date(this.getFormControl('uploadEndDate').value).getTime();
        }
        if (this.getFormControl('endDate').value) {
            return startValue.getTime() > new Date(this.getFormControl('endDate').value).getTime();
        }
    };

    // 上传结束日期--禁用日期
    _disabledUploadEndDate = (endValue) => {
        if (!endValue) {
            return false;
        }
        if (!this.getFormControl('uploadStartDate').value) {
            return (endValue.getTime() > new Date(this.getFormControl('endDate').value).getTime()
                || endValue.getTime() < new Date(this.getFormControl('startDate').value).getTime());
        }
        return (endValue.getTime() < new Date(this.getFormControl('uploadStartDate').value).getTime()
            || endValue.getTime() > new Date(this.getFormControl('endDate').value).getTime());
    };
}
