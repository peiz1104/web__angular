import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { OfferingCourse } from './../../entity/offering-course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from './../../../course/entity/course';
import { Classroom } from './../../entity/classroom';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-classroom-form',
    templateUrl: './classroom-form.component.html',
    styleUrls: ['./classroom-form.component.scss']
})
export class ClassroomFormComponent implements OnInit {

    @Input() classroom: Classroom;
    @Input() actionsViewRef: TemplateRef<any>;
    @Input() loading: boolean;
    @Input() disabledFields: string[];
    @Input() excludeFields: string[];

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    _form: FormGroup;
    enrollMaxEnabled: boolean = false;
    // course: Course;

  _startDateEnd = null;


    get isCreate() {
        if (this.classroom) {
            return !this.classroom.id;
        }
    }

    public get valid() {
        return !!this._form && this._form.valid;
    }

    public get invalid() {
        return !this._form || this._form.invalid;
    }

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        // if (this.classroom.offeringCourse) {
        //   this.course = this.classroom.offeringCourse.course;
        // }

        this._initForm();
    }

    _initForm() {
        let m = this.classroom || new Classroom();

        const offeringCourse: FormGroup = this.fb.group({
            course: [],
            sourceType: []
        });

        this._form = this.fb.group({
            id: [m.id],
            name: [m.name, [Validators.required, Validators.maxLength(40)]],
            offeringCourse: offeringCourse,
            userGroup: [m.userGroup, Validators.required],
            description: [m.description],
            startDate: [m.startDate],
            endDate: [m.endDate],
            enrollStart: [m.enrollStart],
            enrollEnd: [m.enrollEnd],
            enrollMax: [m.enrollMax],
            enrollMin: [m.enrollMin],
            enableWaitList: [m.enableWaitList],
            enableAccredit: [m.enableAccredit],
        });

        if (m.offeringCourse) {
            this._form.get('offeringCourse').patchValue(m.offeringCourse);

            const course = this._form.get('offeringCourse.course').value;
            if (!this.isCreate && !!course) {
                if (course.sourceType == 'ORIGINAL') {
                    this.excludeFields = this.excludeFields ? [...this.excludeFields] : ['offeringCourse.sourceType'];
                } else {
                    this._form.patchValue({ offeringCourse: { sourceType: course.sourceType } });
                }

                offeringCourse.disable();
            }
        }

        if (this.disabledFields && this.disabledFields.length > 0) {
            this.disabledFields.forEach(it => {
                if (this._form.get(it)) {
                    this._form.get(it).disable();
                }
            });
        }
    }

    getFormControl(name) {
        return this._form.get(name);
    }


    isExcludeFiled(name) {
        if (this.excludeFields) {
            return this.excludeFields.some(it => it == name);
        }
    }

    _save(event) {
        this._form.markAsDirty();
        if (!this.getFormControl('offeringCourse.course')) {
            tipMessage('请选择一个课程');
            return;
        }

        if (this._form.invalid) {
            tipMessage('表单填写有误，请根据提示修改后重试', '', 4000);
            return;
        }
        if (this.classroom.id) {
            if (!this.getFormControl('startDate').value) {
                this._form.controls['startDate'].setValue("");
            }
            if (!this.getFormControl('endDate').value) {
                this._form.controls['endDate'].setValue("");
            }
            if (!this.getFormControl('enrollStart').value) {
                this._form.controls['enrollStart'].setValue("");
            }
            if (!this.getFormControl('enrollEnd').value) {
                this._form.controls['enrollEnd'].setValue("");
            }
        }
        const value = this.isCreate ? this._form.getRawValue() : this._form.value;
        this.save.emit({ originEvent: event, value: value });
    }

    _cancel(event) {
        this.cancel.emit({ originEvent: event });
    }

    doAfterCourseSelected(course: Course) {
        if (course) {
            if (!this.getFormControl('name').value) {
                this.getFormControl('name').setValue(course.name);
            }

            // sourceType
            if (course.courseType == 'OFFLINE' || course.courseType == 'LIVE') {
                this._form.get('offeringCourse.sourceType').setValue('COPIED');
                this._form.get('offeringCourse.sourceType').disable();
            } else if (course.courseType == 'ONLINE') {
                this._form.get('offeringCourse.sourceType').setValue('REFERENCED');
                this._form.get('offeringCourse.sourceType').enable();
            }

        }
    }
  // 开始时间
  _startDateBeginChange = () => {
      if (this.getFormControl('startDate').value > this.getFormControl('endDate').value) {
          this.getFormControl('endDate').setValue(null);
      }
  };
  // 结束时间
  _startDateEndChange = () => {
      let notNull = this.getFormControl('startDate').value != null && this.getFormControl('endDate').value != null ;
      if ( notNull && (this.getFormControl('startDate').value >  this.getFormControl('endDate').value)) {
          this.getFormControl('startDate').setValue(null);
      }
      if (this.getFormControl('enrollStart').value >  this._startDateEnd) {
        this.getFormControl('enrollStart').setValue(null);
        this._form.controls['enrollStart'].markAsPristine();
      }
      if (this.getFormControl('enrollEnd').value >  this._startDateEnd) {
        this.getFormControl('enrollEnd').setValue(null);
        this._form.controls['enrollEnd'].markAsPristine();
      }
  };
  // 开始时间禁用范围
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
  _endDateBeginChange = () => {
      if (this.getFormControl('enrollStart').value > this.getFormControl('enrollEnd').value) {
          this.getFormControl('enrollEnd').setValue(null);
      }
  };
  _endDateEndChange = () => {
      if (this.getFormControl('startDate').value > this.getFormControl('endDate').value) {
          this.getFormControl('startDate').setValue(null);
      }
  };
  _disabledEndDateBegin = (startValue) => {
      if (this.getFormControl('enrollEnd').value) {
        return startValue.getTime() >  new Date(this.getFormControl('enrollEnd').value).getTime();
      }
    return startValue.getTime() > new Date(this.getFormControl('endDate').value).getTime();
  };
  _disabledEndDateEnd = (endValue) => {
      if (!endValue || !this.getFormControl('enrollStart').value) {
          return false;
      }
      return (endValue.getTime() >  new Date(this.getFormControl('endDate').value).getTime()
    || endValue.getTime() <  new Date(this.getFormControl('enrollStart').value).getTime());
  };
}
