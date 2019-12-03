import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'spk-matrix-fill-blank',
  templateUrl: './matrix-fill-blank.component.html',
  styleUrls: ['../questions.component.scss']
})
export class MatrixFillBlankComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;
  childQuestion = [];
  fillBlank: any;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() { }

  onSave() {
    this.question.isEdit = false;
  }
  onJumpSubject(option?: any, foo?: any, q?: any) {
    let num;
    if (this.question.hasJump) {
      num = this.question.jumpNum;
    } else if (this.question.hasOptionJump) {
      num = option.jumpNum;
    }
    let jumpShow = false;
    if (!foo.value && this.question.type != 'MATRIX_FILL') {
      jumpShow = true
    }
    let index = 0;
    if (this.question.type === 'MATRIX_FILL') {
      this.question.leftQuestions.forEach(left => {
        let leftQ = left.options[0];
        if (leftQ.leftQuestionId === q.id) {
          leftQ.defaultOpt = true;
          if (!foo.value) { leftQ.defaultOpt = false }
          if (leftQ.defaultOpt) { jumpShow = false }
        }
        if (!leftQ.defaultOpt) { index++ }
      });
      if (index === this.question.options.length * 2) { jumpShow = true }
    }
    if (num) { this.questionsService.jumpSubject(this.idx, num, jumpShow) };
  }

}
