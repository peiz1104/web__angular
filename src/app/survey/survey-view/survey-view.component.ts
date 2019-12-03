import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'spk-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.scss']
})
export class SurveyViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
