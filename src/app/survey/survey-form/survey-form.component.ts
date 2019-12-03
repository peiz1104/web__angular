import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SurveyPaper } from '../surveyPaper.model';
import { Survey } from '../survey.model';
import { SurveyPaperService } from '../surveyPaper.service';
import { Column, CuiLayer, CuiLayerRef } from 'console-ui-ng';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { WSAVERNOTSUPPORTED } from 'constants';

@Component({
  selector: 'spk-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  @Input() survey: Survey;
  @Input() excludeFields: string[];
  @Input() isSubmitting: boolean = false;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  _form: FormGroup;

  get isCreate() {
    return this.survey && !this.survey.id;
  }

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    if (!this.survey) {
      this.survey = new Survey();
      this.survey['isAnonymous'] = 'REJECT';
    }

    this.initForm();
  }

  initForm() {
    this._form = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(20)]],
      'description': ['', Validators.maxLength(200)],
      'startDate': ['', null],
      'endDate': ['', null],
      'isAnonymous': ['ALLOW', null],
      'userGroup': ['', Validators.required],
      'imageUrl': ['']
    });

    this._form.patchValue(this.survey || new Survey());

    if (this.excludeFields && this.excludeFields.length > 0) {
      this.excludeFields.forEach(it => {
        if (this._form.contains(it)) {
          this._form.removeControl(it);
        }
      })
    }
  }

  onUploadComplete(result) {
    let imageUrl = result[0].relativePath;
    this._form.patchValue({imageUrl: imageUrl});
  }

  isExcludeField(name: string) {
    return this.excludeFields && this.excludeFields.some(it => it == name);
  }

  onSubmit(e?, detail = false) {
    this._form.markAsDirty();

    if (this._form.invalid) {
      this.message.error('表单填写有误，请检查表单后重试');
      return;
    }

    this.save.emit({originalEvent: e, value: this._form.value, toDetail: detail});
  }

  onCancel(e?) {
    this.cancel.emit({originalEvent: e});
  }
}
