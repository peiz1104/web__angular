import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../../base-question.model';
import { QuestionsService } from '../../questions.service';
import { Option } from '../../option.model';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'spk-fill-option',
  templateUrl: './fill-option.component.html',
  styleUrls: ['../../questions.component.scss']
})
export class FillOptionComponent implements OnInit {

  @Input() question: QuestionBase;
  options: Option[] = [];
  @Input() idx: number;
  isVisibleDescriptionMiddle = false;
  inputValue: string;
  currentOption: Option;
  constructor(private questionsService: QuestionsService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.options = this.question.options;
  }

  onInsert(option: Option) {
    let idx = this.options.indexOf(option);
    let newOption = new Option({
      id: 0,
      name: "请在这里输入选项",
      displayOrder: option.displayOrder + 1
    });
    this.options.splice(idx + 1, 0, newOption);
    this.question.qList = this.getOptionView(this.question);
  }

  onDel(option: Option) {
    let idx = this.options.indexOf(option);
    this.options.splice(idx, 1);
    this.question.qList = this.getOptionView(this.question);
  }

  onUp(option: Option) {
    if (this.options.length > 1) {
      let idx = this.options.indexOf(option);
      let preOption = this.options[idx - 1];
      let displayOrder = preOption.displayOrder;
      preOption.displayOrder = option.displayOrder;
      option.displayOrder = displayOrder;
      this.options[idx - 1] = option;
      this.options[idx] = preOption;
      this.question.qList = this.getOptionView(this.question);
    }
  }

  onDown(option: Option) {
    let idx = this.options.indexOf(option);
    if (idx < this.options.length - 1) {
      let nextOption = this.options[idx + 1];
      let displayOrder = nextOption.displayOrder;
      nextOption.displayOrder = option.displayOrder;
      option.displayOrder = displayOrder;
      this.options[idx + 1] = option;
      this.options[idx] = nextOption;
      this.question.qList = this.getOptionView(this.question);
    }
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
  showDescriptionModalMiddle(option) {
    this.currentOption = option;
    this.inputValue = '';
    if (this.currentOption.description) {
      this.inputValue = this.currentOption.description;
    }
    this.isVisibleDescriptionMiddle = true;
  }
  okDescription($event) {
    this.currentOption.description = this.inputValue;
    this.currentOption.innerDescription = this.sanitizer.bypassSecurityTrustHtml(this.inputValue);
    this.isVisibleDescriptionMiddle = false;
  }
  cancelDescription($event) {
    this.isVisibleDescriptionMiddle = false;
  }
  optionChange(option, foo) {
    if (foo.value.trim().length) {
      option.name = foo.value;
    }
  }
}
