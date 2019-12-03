import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import { QuestionsService } from '../questions.service';
import { Option } from '../option.model';

@Component({
  selector: 'spk-question-action',
  templateUrl: './question-action.component.html',
  styleUrls: ['../questions.component.scss']
})
export class QuestionActionComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;
  addHtml: string;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.addHtml = '在此题后插入新题';
  }

  onInsertQuestion() {
    this.questionsService.questions.forEach(q => {
      q.isBordered = false;
    });
    this.questionsService.insertIdx = undefined;
    this.addHtml = (this.addHtml == '取消插入新题') ? '在此题后插入新题' : '取消插入新题';
    if (this.addHtml == '取消插入新题') {
      this.question.isBordered = true;
      this.questionsService.insertIdx = this.idx;
    }
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
  }

  onEdit() {
    this.questionsService.questions
      .filter(q => q.isEdit)
      .forEach(q => q.isEdit = false);
    this.question.isEdit = !this.question.isEdit;
  }

  onCopy() {
    this.questionsService.questions.forEach((q, i) => {
      if (i > this.idx) {
        q.displayOrder += 1;
      }
    });
    let srcQue = this.questionsService.questions[this.idx];
    let copied: QuestionBase = <QuestionBase>{ ...srcQue, id: undefined, displayOrder: srcQue.displayOrder + 1 };
    copied.options = copied.options.map(it => {
      return { ...it, id: undefined };
    });
    copied.leftQuestions = copied.leftQuestions.map(it => {
      return { ...it, id: undefined };
    });
    this.questionsService.questions.splice(this.idx + 1, 0, copied);
  }

  onSave() {
    this.question.isEdit = false;
  }

  onDel() {
    // 如果有删除的题目关联了本项题目则需要删除对应的关联关系
    let delQ = this.questionsService.questions[this.idx];
    console.log(delQ)
    this.questionsService.questions.forEach((q, i) => {
      if (q.jumpTo == delQ.id) {
        q.hasJump = false;
        q.jumpTo = null;
      }
    });
    this.questionsService.questions.splice(this.idx, 1);
  }

  onMoveUp() {
    if (this.idx > 0) {
      let order = this.questionsService.questions[this.idx - 1].displayOrder;
      this.questionsService.questions[this.idx - 1].displayOrder = this.question.displayOrder;
      this.question.displayOrder = order;
      this.questionsService.sort();
    }
    this.clearJump();
  }
  onMoveDown() {
    let len = this.questionsService.questions.length;
    if (this.idx != len - 1) {
      let order = this.questionsService.questions[this.idx + 1].displayOrder;
      this.questionsService.questions[this.idx + 1].displayOrder = this.question.displayOrder;
      this.question.displayOrder = order;
      this.questionsService.sort();
    }
    this.clearJump();
  }

  onFirst() {
    if (this.idx != 0) {
      this.questionsService.questions[0].displayOrder = this.question.displayOrder;
      this.question.displayOrder = 0;
      this.questionsService.sort();
    }
    this.clearJump();
  }

  onLast() {
    let len = this.questionsService.questions.length;
    if (this.idx != len - 1) {
      const last = this.questionsService.questions[len - 1].displayOrder;
      this.questionsService.questions[len - 1].displayOrder = this.question.displayOrder;
      this.question.displayOrder = last + 1;
      this.questionsService.sort();
    }
    this.clearJump();
  }

  clearJump() {
    this.questionsService.questions.forEach(q => {
      q.hasJump = false;
      q.hasOptionJump = false;
      q.hasLogic = false;
    });
  }
}
