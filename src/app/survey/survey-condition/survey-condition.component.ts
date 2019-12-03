import { Component, OnInit, Input } from '@angular/core';
import { SurveyPaperService } from '../surveyPaper.service';
import { SurveyPaper } from 'app/survey/surveyPaper.model';


@Component({
  selector: 'spk-survey-condition',
  templateUrl: './survey-condition.component.html',
  styleUrls: ['./survey-condition.component.scss']
})
export class SurveyConditionComponent implements OnInit {

  @Input() offeringId: number;
  survey: SurveyPaper = new SurveyPaper();

  constructor(private surveyService: SurveyPaperService) { }

  ngOnInit() {
    this.surveyService.get(this.offeringId).subscribe(
      survey => {
        this.survey = survey;
      }
    );
  }

}
