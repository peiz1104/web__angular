import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'spk-survey-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['../questions.component.scss', './matrix.component.scss']
})
export class MatrixComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;
  childQuestion = [];

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {}

  onSave() {
    this.question.isEdit = false;
  }
  onJumpSubject(option?: any, foo?: any, q?: any) {
    let num;
    if (this.question.hasJump) {
      num = this.question.jumpNum;
    }else if (this.question.hasOptionJump) {
      num = option.jumpNum;
    }
    let jumpShow = false;
    if (!foo.value) {
      jumpShow = true
    }
    let index = 0;
    if (this.question.type === 'MATRIX_MULTIPLE') {
      let optIndex = this.question.options.indexOf(option);
      this.question.leftQuestions.forEach(left => {
        left.options.forEach((o, i) => {
            if (o.leftQuestionId === q.id && optIndex === i) {
                o.defaultOpt = !o.defaultOpt;
                if (o.defaultOpt) {
                  jumpShow = false;
                }
            }
            if (!o.defaultOpt) {
               index++;
            }
        });
      });
     if (index === this.question.options.length * 2) {
      jumpShow = true;
     }
    }
    if (num) {this.questionsService.jumpSubject(this.idx, num, jumpShow)};
   }
}
