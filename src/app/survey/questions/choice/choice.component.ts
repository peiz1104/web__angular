import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import { QuestionsService } from '../questions.service';
import { Option } from '../option.model';

@Component({
  selector: 'spk-survey-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['../questions.component.scss', './choice.component.scss']
})
export class ChoiceComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;
  list: any;
  isVisibleImgMiddle = false;
  currentOpt: any;
  rowWidth: string;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.question.qList = this.getOptionView(this.question);
    if (!this.question.displayOptionNum) {
      this.question.displayOptionNum = 1;
    }
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
    this.question.isEdit = !this.question.isEdit;
  }
  onJumpSubject(option?: any, foo?: any, question?: any) {
    // 判断跳题逻辑的显示与隐藏
    this.saveJump(option, foo);
    // 判断是够加载关联逻辑
    this.saveLogic(option, foo, question);
  }

  saveLogic(option?: any, foo?: any, question?: any) {
    this.question.relevantLogic.forEach(l => {
      this.questionsService.questions.forEach(q => {
        if (q.id === l.questionId && option.id === l.optionId) {
          q.hasLogic = false;
          // 如果多选题可以取消回显
          if (this.question.type === 'MULTIPLE') {
            if (option.defaultOpt) {
              q.hasLogic = !!q.hasLogic;
            } else {
              let cal = true;
              question.options.forEach(o => {
                this.question.relevantLogic.forEach(oo => {
                  if (q.id === l.questionId && o.id === oo.optionId) {
                    if (o.defaultOpt) {
                      cal = false;
                    }
                  }
                });
              });
              q.hasLogic = cal;
            }
          }
        }
        if (this.question.type === 'SINGLE') {
          if (q.id === l.questionId && option.id != l.optionId) {
            q.hasLogic = true;
          }
        }
      });
    });
  }
  saveJump(option?: any, foo?: any) {
    let num;
    if (this.question.hasJump) {
      num = this.question.jumpNum;
    } else if (this.question.hasOptionJump) {
      num = option.jumpNum;
    }
    let jumpShow = false;
    if (!foo.value) {
      jumpShow = true
    }
    let index = 0;
    if (this.question.type === 'MULTIPLE') {
      option.defaultOpt = !option.defaultOpt;
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
