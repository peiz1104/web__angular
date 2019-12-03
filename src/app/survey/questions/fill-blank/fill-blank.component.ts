import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import { QuestionsService } from '../questions.service';
import { Option } from '../option.model';

@Component({
  selector: 'spk-survey-fill-blank',
  templateUrl: './fill-blank.component.html',
  styleUrls: ['../questions.component.scss', './fill-blank.component.scss']
})
export class FillBlankComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;
  list: any;
  fillBlank: any;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.question.qList = this.getOptionView(this.question);
  }
  showOptions() {
    this.question.qList = this.getOptionView(this.question);
  }
  onAddOption() {
    let len = this.question.options.length;
    if (len > 0) {
      len = this.question.options[len - 1].displayOrder;
    }
    let newOption = new Option({
      id: 0,
      name: "请在这里输入选项",
      displayOrder: len + 1
    });
    this.question.options.push(newOption);
    this.question.qList = this.getOptionView(this.question);
  }

  onSave() {
    this.question.isEdit = false;
  }

  onJumpSubject(option?: any, foo?: any) {
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
    if (this.question.type === 'MULTIPLE_FILL') {
      option.defaultOpt = true;
      if (!foo.value) {
        option.defaultOpt = false;
      }
      this.question.options.forEach(o => {
        if (o.defaultOpt) {
          jumpShow = false;
        } else {
          index++;
        }
      });
      if (index === this.question.options.length) {
        jumpShow = true;
      }
    }
    if (num) { this.questionsService.jumpSubject(this.idx, num, jumpShow) };
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
