import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, enableProdMode } from '@angular/core';
import { TrainingClass } from './../../../entity/training-class';
import { UserGroup } from 'app/system/entity/user-group';
import { TrainingClassApiService } from '../../../service/training-class-api.service';
import { TrainingClassXType } from '../../service/training-class-xtype.service';
@Component({
  selector: 'spk-training-class-form',
  templateUrl: './training-class-form.component.html',
  styleUrls: ['./training-class-form.component.scss']
})
export class TrainingClassFormComponent implements OnInit {

  @Input() trainingClass: any;
  @Input() loading: boolean = false;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  validateForm: FormGroup;
  leaderOption: any;
  performerOption: any;
  imageUrl: string;
  groupValidate: boolean = false;
  spinning: boolean = false;
  endDate = null;
  oldEndDate = null;

  _startDateEnd = null;
  _trainingTypes = [
    { value: 'ONLINE', label: '在线培训', disabled: false },
    { value: 'OFFLINE', label: '面授培训', disabled: false },
    { value: 'MIXED', label: '混合培训', disabled: false },
  ];
  _trainClassify = [
    { value: 'ONLINE', label: '在线培训', disabled: false },
    { value: 'OFFLINE', label: '面授培训', disabled: false },
    { value: 'MIXED', label: '混合培训', disabled: false },
  ];
  _trainLevel = [
    { value: 'ONLINE', label: '在线培训', disabled: false },
    { value: 'OFFLINE', label: '面授培训', disabled: false },
    { value: 'MIXED', label: '混合培训', disabled: false },
  ];

  constructor(
    private fb: FormBuilder,
    private trainingClassApi: TrainingClassApiService,
    private xtype: TrainingClassXType
  ) { }

  ngOnInit() {
    this.initForm();
  }
  endValueChange = () => {
    if (this.endDate && (this.endDate != this.oldEndDate)) {
      this.endDate = new Date(this.endDate.toDateString() + " 23:59:59");
      this.oldEndDate = this.endDate;
    }
  };

  initForm() {
    let m = this.trainingClass || new TrainingClass();
    this.imageUrl = m.imageUrl;
    let sponsorDept: UserGroup;
    let undertakeDept: UserGroup;
    let userGroup: UserGroup;
    if (m.sponsorDeptId && m.sponsorDeptName) {
      sponsorDept = new UserGroup();
      sponsorDept.id = m.sponsorDeptId;
      sponsorDept.name = m.sponsorDeptName;
    }
    if (m.undertakeDeptId && m.undertakeDeptName) {
      undertakeDept = new UserGroup();
      undertakeDept.id = m.undertakeDeptId;
      undertakeDept.name = m.undertakeDeptName;
    }
    if (m.userGroupId && m.userGroupName) {
      userGroup = new UserGroup();
      userGroup.id = m.userGroupId;
      userGroup.name = m.userGroupName;
    }

    this.validateForm = this.fb.group({
      name: [m.name, [Validators.required]],
      code: [m.code, [Validators.required]], // TODO: 添加系统配置之培训班编码规则
      imageUrl: [m.imageUrl],
      // status: [m.status || 1, [Validators.required]],
      leaders: [m.leaders],
      performers: [m.performers],
      address: [m.address],
      startDate: [m.startDate || new Date, [Validators.required]],
      endDate: [m.endDate, [Validators.required]],
      switch: [true, [Validators.required]],
      enrollStart: [m.enrollStart  || new Date],
      enrollEnd: [m.enrollEnd],
      trainingType: [m.trainingType || 'MIXED', [Validators.required]],
      // trainClassify: [''],
      sponsorDept: [sponsorDept], // 主办单位
      undertakeDept: [undertakeDept], // 协办单位
      // mobileStudy: [true],
      // messageInput: [true],
      // message: [''],
      description: [m.description],
      userGroup: [userGroup, Validators.required],
      salesEnabled: [m.salesEnabled],
      originalPrice: [m.originalPrice],
      price: [m.price],
      monetaryUnit: [m.monetaryUnit],
      selfElective: [m.selfElective],
      ratedPeriod: [m.ratedPeriod],
    });
    this.endDate = m.endDate;
    this.oldEndDate = this.endDate;
    if (!m.code) {
      this.spinning = true;
      this.trainingClassApi.getTrainClassCode(m).subscribe(
        ({ code }) => {
          if (code) {
            this.validateForm.patchValue({ 'code': code });
            this.spinning = false;
          }
        }, err => {
          // err info
          this.spinning = false;
        }
      );
    }

    if (this.xtype && this.xtype.isAssist) {
      const disabledFields = ['userGroup', 'leaders', 'performers'];
      disabledFields.forEach(field => {
        let control = this.validateForm.controls[field];
        if (control) {
          control.disable();
        }
      })
    }
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
      this.getFormControl('imageUrl').setValue(image.relativePath);
    }
  }

  _save(event) {
    this.markAsDirty();
    this.groupValidate = this.getFormControl('userGroup').value ? (this.getFormControl('userGroup').value.id ? false : true) : true;
    if (this.validateForm.invalid || this.groupValidate ) {
      return;
    }

    this.validateForm.value.sponsorDeptId = this.validateForm.value.sponsorDeptId && this.validateForm.value.sponsorDept.id;
    this.validateForm.value.undertakeDeptId = this.validateForm.value.undertakeDeptId && this.validateForm.value.undertakeDept.id;
    this.save.emit({ originalEvent: event, value: this.validateForm.value });
  }

  logSelectGroup(event) {
    this.groupValidate = event ? false : true;
  }
  // resetForm($event: MouseEvent) {
  //   $event.preventDefault();
  //   this.validateForm.reset();
  //   for (const key in this.validateForm.controls) {
  //     this.validateForm.controls[key].markAsPristine();
  //   }
  // }
  _cancel(event) {
    this.cancel.emit({ originalEvent: event });
  }

  // 表单日期处理
    // 开始日期
    _startDateBeginChange = () => {
      if (this.getFormControl('startDate').value > this.getFormControl('endDate').value) {
          this.getFormControl('endDate').setValue(null);
      }
  };
  _startDateEndChange = () => {
      let notNull = this.getFormControl('startDate').value != null && this.getFormControl('endDate').value != null ;
      if (notNull && (this.getFormControl('startDate').value >  this.getFormControl('endDate').value) )  {
          this.getFormControl('startDate').setValue(null);
      }
      if (this.getFormControl('enrollStart').value >  this._startDateEnd) {
        this.getFormControl('enrollStart').setValue(null);
        this.validateForm.controls['enrollStart'].markAsPristine();
      }
      if (this.getFormControl('enrollEnd').value >  this._startDateEnd) {
        this.getFormControl('enrollEnd').setValue(null);
        this.validateForm.controls['enrollEnd'].markAsPristine();
      }
  };
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
