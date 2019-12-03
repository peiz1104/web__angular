import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import { QuestionsService } from '../questions.service';
import { Option } from '../option.model';

@Component({
  selector: 'spk-assess-short-answer',
  templateUrl: './short-answer.component.html',
  styleUrls: ['../questions.component.scss']
})
export class ShortAnswerComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.question.qList = this.getOptionView(this.question);
  }

  onSave() {
    this.question.isEdit = false;
  }

  getOptionView(question: QuestionBase) {
    question.displayOptionNum = +question.displayOptionNum;
    let a_len = question.options.length;
    let result = [];
    for (let i = 0; i < a_len; i += question.displayOptionNum) {
      result.push(question.options.slice(i, i + question.displayOptionNum));
    }
    return result;
  }

}
