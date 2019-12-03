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
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-survey-paper-edit',
  templateUrl: './survey-paper-edit.component.html',
  styleUrls: ['./survey-paper-edit.component.scss']
})
export class SurveyPaperEditComponent implements OnInit {

  @ViewChild('paperLookupDialog') paperLookupDialog: TemplateRef<any>;

  @Input() outSide?: boolean;
  @Input() trainingId?: number;
  @Input() surveyId?: number;
  @Input() trainingSurveyId?: number;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  paper: Survey;
  isLoading: boolean = false;
  isValidate: boolean = false;
  imageValue: string;
  dataForm: FormGroup;
  surveyPaper: SurveyPaper;
  layerRef: CuiLayerRef<any>;
  _startDate = null;
  _endDate = null;
  startValidate: boolean = false;
  endValidate: boolean = false;
  userGroupValidate: boolean = false;
  paperValidate: boolean = false;

  constructor(private surveyPaperService: SurveyPaperService,
    private message: NzMessageService,
    private dialog: CuiLayer,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.surveyPaper = new SurveyPaper();
    this.route.params.subscribe(
      (params: Params) => {
        if (!this.outSide) {
          this.surveyPaper.offeringId = params['id'] as number;
        }
        this.initForm();
      });
  }

  private initForm() {
    if (!this.outSide) {
      this.dataForm = this.fb.group({
        'name': ['', [Validators.required, Validators.maxLength(20)]],
        'description': ['', Validators.maxLength(200)],
        'startDate': ['', null],
        'endDate': ['', null],
        'isAnonymous': ['ALLOW', null],
        'paperName': ['', null],
        'userGroup': ['', null],
        'paper': ['', null]
      });
    } else {
      this.dataForm = this.fb.group({
        'name': ['', [Validators.required, Validators.maxLength(20)]],
        'description': ['', Validators.maxLength(200)],
        'startDate': ['', null],
        'endDate': ['', null],
        'isAnonymous': ['ALLOW', null],
        'paperName': ['', null],
        'paper': ['', null]
      });
    }
    if (this.outSide) {// 如果是培训班点击编辑
      if (this.trainingSurveyId) {
        this.surveyPaperService.trainGet(this.trainingSurveyId).subscribe(surveyPaper => {
          this.surveyPaper.name = surveyPaper.name;
          this.surveyPaper.description = surveyPaper.description;
          this.surveyPaper.startDate = surveyPaper.startDate;
          this.surveyPaper.endDate = surveyPaper.endDate;
          this.surveyPaper.isAnonymous = surveyPaper.isAnonymous;
          this.surveyPaper.isPublished = surveyPaper.isPublished;
          this.imageValue = surveyPaper.imageUrl;
          this.surveyPaper.paperName = '';
          if (surveyPaper.paper) {
            this.surveyPaper.paperName = surveyPaper.paper.name;
            this.surveyPaper.paper = surveyPaper.paper;
          }
          this.dataForm.patchValue(this.surveyPaper);
        });
      }
    } else {
      if (this.surveyPaper.offeringId) {
        this.surveyPaperService.get(this.surveyPaper.offeringId).subscribe(surveyPaper => {
          this.surveyPaper.id = surveyPaper.offeringSurvey.survey.id;
          this.surveyPaper.name = surveyPaper.name;
          this.surveyPaper.description = surveyPaper.description;
          this.surveyPaper.startDate = surveyPaper.startDate;
          this.surveyPaper.endDate = surveyPaper.endDate;
          this.surveyPaper.isAnonymous = surveyPaper.offeringSurvey.survey.isAnonymous;
          this.surveyPaper.isPublished = surveyPaper.isPublished;
          this.surveyPaper.userGroup = surveyPaper.userGroup;
          this.imageValue = surveyPaper.imageUrl;
          this.surveyPaper.paperName = '';
          if (surveyPaper.offeringSurvey.survey.paper) {
            this.surveyPaper.paperName = surveyPaper.offeringSurvey.survey.paper.name;
            this.surveyPaper.paper = surveyPaper.offeringSurvey.survey.paper;
          }
          this.dataForm.patchValue(this.surveyPaper);
        });
      } else {
        this.surveyPaper.isAnonymous = 'ALLOW';
        this.dataForm.patchValue(this.surveyPaper);
      }
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.validate();
    if (this.isValidate) {
      if (this.outSide) {
        if (this.trainingSurveyId) {
          this.surveyPaper.id = this.trainingSurveyId;
          this.surveyPaperService.trainEdit(this.surveyPaper).subscribe(
            survey => {
              tipMessage('保存成功', 'success');
              this.isLoading = false;
              this.closeModal.emit();
            });
        } else {
          this.surveyPaper.isPublished = false;
          this.surveyPaperService.trainAdd(this.trainingId, this.surveyPaper).subscribe(
            survey => {
              tipMessage('保存成功', 'success');
              this.isLoading = false;
              this.closeModal.emit();
            });
        }
      } else {
        if (this.surveyPaper.id) {
          this.surveyPaperService.edit(this.surveyPaper).subscribe(
            survey => {
              tipMessage('保存成功', 'success');
              this.onCancel();
              this.isLoading = false;
            }
          );
        } else {
          this.surveyPaper.isPublished = false;
          this.surveyPaperService.add(this.surveyPaper).subscribe(
            survey => {
              tipMessage('保存成功', 'success');
              this.onCancel();
              this.isLoading = false;
            }
          );
        }
      }
    } else {
      tipMessage('名称不允许为空', 'warning');
      this.isLoading = false;
    }
  }

  validate() {
    this.getFormData();
    this.paperValidate = this.surveyPaper.paper ? false : true;
    this.startValidate = this._startDate ? false : true;
    this.endValidate = this._endDate ? false : true;
    if (this.outSide) {
      // if (this.surveyPaper.paper && this.surveyPaper.startDate && this.surveyPaper.endDate) {
      //   this.isValidate = true;
      // }
      this.isValidate = true;
    } else {
      this.userGroupValidate = this.surveyPaper.userGroup ? false : true;
      if (this.surveyPaper.userGroup // && this.surveyPaper.paper
        && this.surveyPaper.startDate && this.surveyPaper.endDate) {
        this.isValidate = true;
      }
    }
    return false;
  }
  getFormData() {
    this.surveyPaper.name = this.dataForm.value['name'];
    this.surveyPaper.description = this.dataForm.value['description'];
    this.surveyPaper.startDate = this.dataForm.value['startDate'];
    this.surveyPaper.endDate = this.dataForm.value['endDate'];
    this.surveyPaper.isAnonymous = this.dataForm.value['isAnonymous'];
    if (!this.outSide) {
      this.surveyPaper.userGroup = this.dataForm.value['userGroup'];
    }
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  openPapersDialog() {
    this.layerRef = this.dialog.open(this.paperLookupDialog);
  }

  // 选择完弹出层数据 回复给当前指定的值
  selectPaper(papers) {
    this.paper = papers;
  }

  onUploadComplete(result) {
    this.surveyPaper.imageUrl = result[0].relativePath;
    this.getFormData();
    this.dataForm.patchValue(this.surveyPaper);
  }

  logSelectGroup(event) {
    this.userGroupValidate = event ? false : true;
  }

  // 点击确定按钮
  paperLookupOk() {
    if (this.paper) {
      // 单选有且只有一个，所以取第0个
      let selected = this.paper[0];
      this.surveyPaper.paper = selected;
      this.surveyPaper.paperName = selected.name;
      this.getFormData();
      this.dataForm.patchValue(this.surveyPaper);
      this.layerRef.close();
    } else {
      tipMessage('请选择问卷');
    }
    this.paperValidate = this.surveyPaper.paper ? false : true;
  }
  paperLookupCancel() {
    this.layerRef.close();
    this.paperValidate = this.surveyPaper.paper ? false : true;
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
    this.startValidate = this._startDate ? false : true;
  };
  _endValueChange = () => {
    if (this._startDate > this._endDate) {
      this._startDate = null;
    }
    this.endValidate = this._endDate ? false : true;
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
