import { Component, OnInit } from '@angular/core';
import { Survey } from '../survey.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spk-survey-tpl-paper',
  templateUrl: './survey-tpl-paper.component.html',
  styleUrls: ['./survey-tpl-paper.component.scss']
})
export class SurveyTplPaperComponent implements OnInit {

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
