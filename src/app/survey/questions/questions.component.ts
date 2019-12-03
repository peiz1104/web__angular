import { Component, OnInit, Input,ElementRef} from '@angular/core';
import { QuestionsService } from './questions.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SurveyService } from '../survey.service';
import { QuestionBase } from './base-question.model';
import { RelevantLogic } from './relevant-logic.model';
import { Survey } from 'app/survey/survey.model';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';
import { MainLayoutComponent} from '../../core/layout/main-layout/main-layout.component'

declare let $: any;

@Component({
  selector: 'spk-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit{

  questions = [];
  logics = [];
  surveyId: number;
  @Input() paperId?: number;
  @Input() outSide?: boolean;
  @Input() isSurvey?: boolean;
  survey: Survey;
  msgSave: string;
  isFix:boolean=false;
  isLoadingOne: boolean = false;
  fixMargin:any;
  constructor(private surveyService: SurveyService,
    private questionsService: QuestionsService,
    private router: Router,
    private message: NzMessageService,
    private element: ElementRef,
    private route: ActivatedRoute,
    private mainLayout:MainLayoutComponent
  ) {
    this.mainLayout.subject.subscribe(it =>{
      if(it =='小于'){
        this.isFix = false;
      }else{
        this.isFix = true;
        this.fixMargin = it-92 +'px';
      }
    })
   }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.surveyId = this.paperId || +params['id'];
        this.questionsService.surveyId = +params['id'];
        this.questionsService.getQuestions(this.surveyId)
          .subscribe(data => {
            this.questions = [];
            data.forEach(e => {
              this.questions.push(new QuestionBase(e));
            });
            this.questionsService.questions = this.questions;
            this.questionsService.sort();
          });
        // 请求关联逻辑
        this.questionsService.getLogics(this.surveyId)
          .subscribe(data => {
            this.logics = [];
            data.forEach(e => {
              this.logics.push(new RelevantLogic(e));
            });
            this.questionsService.logics = this.logics;
          });

        this.surveyService.get(this.surveyId).subscribe(
          data => {
            this.survey = data;
            this.msgSave = "是否将更改保存到" + data.name + "问卷中？";
          }
        );
      });
  }
  // goScroll(){
  //   let oDiv = this.element.nativeElement.querySelector(".container-fluid")
  //   oDiv.bind('scroll', this.listionScroll);
  //   console.log(oDiv)
  // }
  // goFix(){
  // }
  onAddQuestion(type) {
    this.questionsService.addQuestion(type);
  }
  onAddMatrixQuestion(type) {
    this.questionsService.addMatrixQuestion(type);
  }

  onAddMatrixFillQuestion(type) {
    this.questionsService.addMatrixFillQuestion(type);
  }

  saveQuestions() {
    console.log(this.surveyId)
    this.questionsService.modified(this.surveyId).subscribe(
      num => {
        if (num > 0) {
          tipMessage('该问卷已作答不允许修改', 'warning');
        } else {
          this.isLoadingOne = true;
          this.questionsService.saveQuestions(this.surveyId).subscribe(
            ret => {
              this.isLoadingOne = false;
              tipMessage('保存成功', 'success');
              this.questionsService.getQuestions(this.surveyId).subscribe(
                data => {
                  this.questions = [];
                  data.forEach(e => {
                    this.questions.push(new QuestionBase(e));
                  });
                  this.questionsService.questions = this.questions;
                  this.questionsService.sort();
                });
              // 请求关联逻辑
              this.questionsService.getLogics(this.surveyId)
                .subscribe(data => {
                  this.logics = [];
                  data.forEach(e => {
                    this.logics.push(new RelevantLogic(e));
                  });
                  this.questionsService.logics = this.logics;
                });
            },
            err => {
              this.isLoadingOne = false;
            }
          );
        }
      }
    );
  }

  confirm() {
    this.isLoadingOne = true;
    this.questionsService.saveQuestions(this.surveyId).subscribe(
      ret => {
        this.isLoadingOne = false;
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      err => {
        this.isLoadingOne = false;
      }
    );
  }

  cancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  toView() {
    this.isLoadingOne = true;
    this.questionsService.saveQuestions(this.surveyId).subscribe(
      ret => {
        this.isLoadingOne = false;
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
      },
      err => {
        this.isLoadingOne = false;
      }
    );
  }

}
