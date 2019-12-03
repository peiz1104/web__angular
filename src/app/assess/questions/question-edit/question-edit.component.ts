import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import { QuestionsService } from '../questions.service';
import { Option } from '../option.model';
import { Column } from 'console-ui-ng';
import { CuiLayer } from 'console-ui-ng';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'spk-assess-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['../questions.component.scss']
})
export class QuestionEditComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;
  isVisibleEditMiddle = false;
  typeMap;
  inputValue: string;

  constructor(private questionsService: QuestionsService,
    private dialog: CuiLayer,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.typeMap = {
      SINGLE: '单选',
      MULTIPLE: '多选',
      SHORT_ANSWER: '问答题'
    }
  }

  showEditModalMiddle(option) {
    this.inputValue = this.question.description;
    this.question.hasHighEdit = true;
    this.isVisibleEditMiddle = true;
  }
  cancelEdit($event) {
    this.isVisibleEditMiddle = false;
  }
  okEdit($event) {
    if (this.inputValue == '') {
      this.question.hasHighEdit = false;
    }
    this.question.description = this.inputValue;
    this.question.innerDescription = this.sanitizer.bypassSecurityTrustHtml(this.inputValue);
    this.isVisibleEditMiddle = false;
  }
  showRequired() {
    this.question.required = !this.question.required;
  }

  questionChange(question, foo) {
    question.name = foo.value;
  }
}
