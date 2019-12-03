import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import { QuestionsService } from '../questions.service';
import { Option } from '../option.model';
import { Column } from 'console-ui-ng';
import { CuiLayer } from 'console-ui-ng';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'spk-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['../questions.component.scss']
})
export class QuestionEditComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;
  isVisibleJumpMiddle = false;
  isVisibleLogicMiddle = false;
  isVisibleEditMiddle = false;
  logicShow = false;
  jumpList = [];
  logicList = [];
  logicOptions = [];
  typeMap;
  logicItemIdxTemp;
  inputValue: string;

  constructor(private questionsService: QuestionsService,
    private dialog: CuiLayer,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.typeMap = {
      SINGLE: '单选',
      MULTIPLE: '多选',
      SINGLE_FILL: '单项填空',
      MULTIPLE_FILL: '多项填空',
      MATRIX_SINGLE: '矩阵单选',
      MATRIX_MULTIPLE: '矩阵多选',
      MATRIX_FILL: '矩阵填空'
    }
    if (this.question.hasJump) {
      let jump = this.questionsService.questions.find(q => q.id == this.question.jumpTo);
      let cIdx = this.questionsService.questions.indexOf(jump);
      this.question.jumpNum = cIdx + 1;
    }

    if (this.question.hasOptionJump) {
      this.question.options.forEach(o => {
        if (o.jumpTo > 0) {
          let jump = this.questionsService.questions.find(q => q.id == o.jumpTo);
          let cIdx = this.questionsService.questions.indexOf(jump);
          o.jumpNum = cIdx + 1;
        }
      });
    }
    let logicOptionNum = this.question.logicOption;
    if (this.question.hasLogic) {
      let opsNum = [];
      this.question.logicOption = '';
      this.questionsService.logics.forEach(l => {
        this.questionsService.questions.forEach((q, i) => {
          if (q.id === l.optionQuestionId && l.questionId === this.question.id) {
            this.question.logicQuestion = i + 1;
            q.options.forEach((o, j) => {
              if (o.id === l.optionId) {
                opsNum[j] = j + 1;
              }
            });
          }
        });
      });
      opsNum.forEach(ops => {
        this.question.logicOption += (ops + '、');
      })
      this.question.logicOption = this.question.logicOption.substring(0, this.question.logicOption.length - 1);
      if (this.question.logicOption.length == 0) {
        this.question.logicOption = logicOptionNum;
      }
    }
  }

  showJumpModalMiddle() {
    this.jumpList = [];
    if (this.idx < (this.questionsService.questions.length - 1)) {
      this.isVisibleJumpMiddle = true;
      this.questionsService.questions.forEach((q, i) => {
        if (i >= this.idx + 1) {
          this.jumpList.push(q);
        }
      });
    } else {
      if (this.idx == 0) {
        this.dialog.msg('只有一项题目，无法跳转');
      } else {
        this.dialog.msg('最后一题无法跳转');
      }
    }
  }

  handleOkMiddle(e) {
    this.isVisibleJumpMiddle = false;
  }

  handleCancelMiddle(e) {
    this.isVisibleJumpMiddle = false;
  }

  selectItem(jumpItem, cIdx) {
    this.isVisibleJumpMiddle = false;
    this.question.jumpTo = jumpItem.id;
    this.question.jumpNum = cIdx;
    let num = this.questionsService.questions.indexOf(this.question);
  }

  showLogicModalMiddle() {
    this.logicList = [];
    if (this.idx != 0) {
      this.isVisibleLogicMiddle = true;
      this.questionsService.questions.forEach((q, i) => {
        if (i < this.idx) {
          this.logicList.push(q);
        }
      });
    } else {
      this.dialog.msg('第一题无法关联，只能关联当前题目之前的题目');
      this.question.hasLogic = false;
    }
  }

  cancelLogicMiddle(e) {
    this.isVisibleLogicMiddle = false;
    if (!this.question.logicQuestion) {
      this.question.hasLogic = false;
    }
  }
  handleOkLogicMiddle(e) {
    let relevantLogic = [];
    let logicItemIdx = this.logicItemIdxTemp;
    let logicOptionIdx = '';
    let questionOption = this.logicList[logicItemIdx - 1];
    this.logicOptions.forEach((element, index) => {
      if (element['checked']) {
        logicOptionIdx += index + 1 + '、';
        relevantLogic.push({
          'optionId': element.id,
          'optionQuestionId': questionOption.id,
          'questionId': this.question.id,
          'paperId': this.questionsService.surveyId
        });
      }
    });
    this.question.logicOption = logicOptionIdx.substring(0, logicOptionIdx.length - 1);
    if (this.question.logicOption.length == 0) {
      logicItemIdx = 0;
    }
    this.question.logicQuestion = logicItemIdx;
    this.question.relevantLogic = relevantLogic;
    this.isVisibleLogicMiddle = false;
    if (relevantLogic.length === 0) {
      this.question.hasLogic = false;
    }
  }

  showOptions(event, value) {
    if (value != 0) {
      this.logicShow = true;
      this.logicOptions = this.logicList[value - 1].options;
      this.logicOptions.forEach(e => e['checked'] = false);
      this.logicItemIdxTemp = value;
    } else {
      this.logicShow = false;
    }
  }

  jumpOrOption(optionJump) {
    if (optionJump) {
      this.question.hasOptionJump = false;
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
    if (foo.value.trim().length) {
      question.name = foo.value;
    }
  }
}
