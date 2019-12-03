import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import {QuestionsService} from '../questions.service';

@Component({
  selector: 'spk-survey-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
  }
}
