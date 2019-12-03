import { Category } from './../../../../system/category/entity/category';
import { UserGroup } from '../../../../system/entity/user-group';
import { SubjectActivity } from './../../../entity/subject-activity';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output, TemplateRef } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CaseInfo } from 'app/library/entity/case-info';
import { CuiLayer, CuiPagination } from 'console-ui-ng';
import { element } from 'protractor';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'spk-subject-activity-form',
  templateUrl: './subject-activity-form.component.html',
  styleUrls: ['./subject-activity-form.component.scss']
})
export class SubjectActivityFormComponent implements OnInit {

  @Input() actionsViewRef: TemplateRef<any>;
  @Input() loading: boolean;
  @Input() isCreate: boolean;
  @Input() subjectInfo?: SubjectActivity;

  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  _form: FormGroup;

  categoryType: boolean = false;
  userGroupType: boolean = false;

  switchValue: boolean = false;
  _startDate = null;
  _endDate = null;

  constructor(
    private message: NzMessageService,
    private dialog: CuiLayer,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let m = this.subjectInfo || new SubjectActivity();
    let userGroup: UserGroup;
    if (m.userGroupId && m.userGroupName) {
      userGroup = new UserGroup();
      userGroup.id = m.userGroupId;
      userGroup.name = m.userGroupName;
    }
    let category: Category;
    if (m.categoryId && m.categoryName) {
      category = new Category();
      category.id = m.categoryId;
      category.name = m.categoryName;
    }

    this._form = this.fb.group({
      id: [m.id],
      name: [m.name, [Validators.required, Validators.maxLength]],
      userGroup: [m.userGroup || userGroup, Validators.required],
      imageUrl: [m.imageUrl],
      startDate: [m.startDate],
      endDate: [m.endDate],
      category: [m.category || category, Validators.required],
      description: [m.description],
      innerOuter: [m.innerOuter],
      isPublished: [m.isPublished],
      // link: [m.link],
      displayOrder: [m.displayOrder, [Validators.pattern(/^(0|[1-9][0-9]*)$/)]],
      keyWords: [m.keyWords],
      salesEnabled: [m.salesEnabled],
    });

    let keywords = m.keyWords ? m.keyWords.split(',') : [];
    this._form.addControl('_keywords', new FormControl(keywords));
    if (m.innerOuter == 'OUTER') {
      this.switchValue = true;
      this._form.addControl('link', new FormControl(m.link, Validators.required));
    }
  }

  radioChange() {
    if (this.switchValue) {
      this._form.addControl('link', new FormControl('', Validators.required));
    } else {
      this._form.removeControl('link');
    }
  }

  getFormControl(name) {
    return this._form.controls[name];
  }

  markAsDirty() {
    for (let key of Object.keys(this._form.controls)) {
      this._form.controls[key].markAsDirty();
    }
  }

  initImage(result) {
    if (result) {
      this.getFormControl("imageUrl").setValue(result["relativePath"]);
    }
  }

  logSelectCategory(event) {
    this.categoryType = event ? false : true;
  }
  logSelectGroup(event) {
    this.userGroupType = event ? false : true;
  }

  onSubmit(event: Event) {
    this.markAsDirty();
    let isSubmit = this.validateForm();
    if (isSubmit) {
       this.doSubmit.emit({ originalEvent: event, value: this._form.value });
    }
  }

  validateForm() {
    this.categoryType = this.getFormControl('category').value ? (this.getFormControl('category').value.id ? false : true) : true;
    this.userGroupType = this.getFormControl('userGroup').value ? (this.getFormControl('userGroup').value.id ? false : true) : true;
    if (this.categoryType || this.userGroupType) {
      return false;
    }
    return true;
  }

  /**
   * 关键字
   * @param value
   */
  keywordsChange(value) {
    if (!!value) {
      this.getFormControl('keyWords').setValue(Array.isArray(value) ? value.join(',') : value);
    } else {
      this.getFormControl('keyWords').setValue(undefined);
    }
  }


   // 日期控件
   newArray = (len) => {
    const result = [];
    for (let i = 0; i < len; i++) {
      result.push(i);
    }
    return result;
  };
  _startValueChange = () => {
    if (this._startDate > this._endDate) {
      this._endDate = null;
    }
  };
  _endValueChange = () => {
    if (this._startDate > this._endDate) {
      this._startDate = null;
    }
  };
  _disabledStartDate = (startValue) => {
    if (!startValue || !this._endDate) {
      return false;
    }
    return startValue.getTime() >= this._endDate.getTime();
  };
  _disabledEndDate = (endValue) => {
    this._startDate = new Date(this._startDate)
    if (!endValue || !this._startDate) {
      return false;
    }
    return endValue.getTime() <= this._startDate.getTime();
  };
  get _isSameDay() {
    return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day')
  }
  get _endTime() {
    return {
      nzHideDisabledOptions: true,
      nzDisabledHours: () => {
        return this._isSameDay ? this.newArray(this._startDate.getHours()) : [];
      },
      nzDisabledMinutes: (h) => {
        if (this._isSameDay && h === this._startDate.getHours()) {
          return this.newArray(this._startDate.getMinutes());
        }
        return [];
      },
      nzDisabledSeconds: (h, m) => {
        if (this._isSameDay && h === this._startDate.getHours() && m === this._startDate.getMinutes()) {
          return this.newArray(this._startDate.getSeconds());
        }
        return [];
      }
    }
  }

}
