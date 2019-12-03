import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import { QuestionsService } from '../questions.service';
import { Option } from '../option.model';

@Component({
  selector: 'spk-assess-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['../questions.component.scss', './choice.component.scss']
})
export class ChoiceComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;
  isVisibleImgMiddle = false;
  currentOpt: any;
  rowWidth: string;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.question.qList = this.getOptionView(this.question);
  }

  onSave() {
    this.question.isEdit = false;
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

  getOptionView(question) {
    question.displayOptionNum = +question.displayOptionNum;
    let a_len = question.options.length;
    let result = [];
    this.rowWidth = (100 / question.displayOptionNum) + '%';
    for (let i = 0; i < a_len; i += question.displayOptionNum) {
      result.push(question.options.slice(i, i + question.displayOptionNum));
    }
    return result;
  }

  showImageModalMiddle(option) {
    this.currentOpt = option;
    this.isVisibleImgMiddle = true;
  }
  cancelImg($event) {
    this.isVisibleImgMiddle = false;
  }
}
