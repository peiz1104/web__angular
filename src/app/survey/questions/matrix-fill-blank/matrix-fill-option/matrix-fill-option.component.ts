import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../../base-question.model';
import { QuestionsService } from '../../questions.service';
import { Option } from '../../option.model';
import { LeftQuestion } from '../../left-question.model';

@Component({
  selector: 'spk-matrix-fill-option',
  templateUrl: './matrix-fill-option.component.html',
  styleUrls: ['../../questions.component.scss']
})
export class MatrixFillOptionComponent implements OnInit {

  @Input() question: QuestionBase;
  options: Option[] = [];
  subquestions: LeftQuestion[] = [];
  @Input() idx: number;
  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.subquestions = this.question.leftQuestions;
  }

  onAddItem(question: QuestionBase) {
    let idx = this.subquestions.indexOf(question);
    let newItem = new QuestionBase({
      id: 0,
      name: "请在这里输入题目",
      type: this.subquestions[0].type,
      displayOrder: question.displayOrder + 1
    });
    this.subquestions.splice(idx + 1, 0, newItem);
  }

  onDelItem(question: QuestionBase) {
    let idx = this.subquestions.indexOf(question);
    this.subquestions.splice(idx, 1);
  }
  questionChange(question, foo) {
    if (foo.value.trim().length) {
      question.name = foo.value;
      console.log(question)
    }
  }
}
