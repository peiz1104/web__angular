import { QuestionsService } from '../questions/questions.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Survey } from '../survey.model';
import { SurveyService } from '../survey.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';


@Component({
  selector: 'spk-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.scss']
})
export class SurveyEditComponent implements OnInit {

  @Input() outSide?: boolean;
  @Input() paperId?: number;
  @Input() trainingId?: number;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  dataForm: FormGroup;
  survey: Survey;
  isLoading: boolean = false;

  constructor(private surveyService: SurveyService,
    private questionService: QuestionsService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.survey = new Survey();
    this.survey.id = this.paperId;
    //  this.initForm();
    this.route.params.subscribe(
      (params: Params) => {
        this.survey.id = this.paperId || params['id'] as number;
        this.initForm();
      });
  }
  private initForm() {
    this.dataForm = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(20)]],
      'description': ['', Validators.maxLength(200)]
    });

    if (this.survey.id) {
      this.surveyService.get(this.survey.id).subscribe(survey => {
        this.survey.id = survey.id;
        this.survey.name = survey.name;
        this.survey.description = survey.description;
        this.dataForm.patchValue(survey);
      });
    }
  }
  onSubmit() {
    this.isLoading = true;
    this.survey.name = this.dataForm.value['name'];
    this.survey.description = this.dataForm.value['description'];
    if (!this.survey.name.trim().length) {
      tipMessage('问卷名称不能为空');
      this.isLoading = false;
    } else {
      if (this.survey.id) {
        this.questionService.modified(this.survey.id).subscribe(
          num => {
            if (num > 0) {
              tipMessage('该问卷已作答不允许修改', 'warning');
              this.isLoading = false;
            } else {
              this.surveyService.edit(this.survey).subscribe(
                survey => {
                  tipMessage('保存成功', 'success');
                  if (!this.outSide) {
                    this.onCancel();
                  }
                  this.isLoading = false;
                }
              );
            }
          }
        );
      } else {
        this.surveyService.add(this.survey).subscribe(
          survey => {
            tipMessage('保存成功', 'success');
            this.onCancel();
            this.isLoading = false;
          }
        );
      }
    }
  }
  onCancel() {
    this.router.navigate([this.survey.id ? '../../' : '../'], { relativeTo: this.route });
  }
}
