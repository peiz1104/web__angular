import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../survey.model';

@Component({
  selector: 'spk-survey-tpl-detail',
  templateUrl: './survey-tpl-detail.component.html',
  styleUrls: ['./survey-tpl-detail.component.scss']
})
export class SurveyTplDetailComponent implements OnInit {

  survey: Survey;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({survey}: {survey: Survey}) => {
      this.survey = survey;
    });
  }

}
