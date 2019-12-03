import { Component, OnInit, Input } from '@angular/core';
import { SurveyPaperService } from '../surveyPaper.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SurveyPaper } from 'app/survey/surveyPaper.model';

@Component({
  selector: 'spk-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit {

  surveyId: number;
  offeringId: number;
  @Input() paperId?: number; // 问卷id
  @Input() trainingSurveyId?: number;
  @Input() trainingPaperId?: number;
  @Input() outSide: boolean;
  constructor(
    private surveyPaperService: SurveyPaperService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.offeringId = params['id'] as number;
          this.surveyPaperService.get(this.offeringId).subscribe(surveyPaper => {
            this.surveyId = surveyPaper.offeringSurvey.survey.id;
            this.paperId = surveyPaper.offeringSurvey.survey.paper.id;
          });
        }
      });
  }
}
