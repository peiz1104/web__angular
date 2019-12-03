import { Injectable } from '@angular/core';
import { QuestionBase } from './base-question.model';
import { RelevantLogic } from './relevant-logic.model';
import { Option } from './option.model';
import { LeftQuestion } from './left-question.model';
import { HttpUtils } from '../../core/http/http-utils';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Pagination } from '../../core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class QuestionsService {

  questions: QuestionBase[] = [];
  logics: RelevantLogic[] = [];
  surveyId: number;
  childQuestions: QuestionBase[] = [];
  insertIdx: any;

  constructor(private http: Http,
    private sanitizer: DomSanitizer) { }

  saveQuestions(surveyId): Observable<void> {
    this.questions.forEach(question => {
      if (!question.hasDesc) {
        question.description = '';
      }
      if (question.type === 'SINGLE_FILL' || question.type === 'MATRIX_FILL') {
        if (question.options.length == 0) {
          question.options.push(new Option({ name: question.name }));
        } else {
          question.options[0].name = question.name;
        }
      }
      if (!question.hasJump) {
        question.jumpTo = null;
        question.jumpNum = null;
      } else {
        if (!question.jumpTo) {
          question.hasJump = false;
        }
      }
      if (!question.hasOptionJump) {
        question.options.forEach(o => {
          o.jumpNum = null;
          o.jumpTo = null;
        });
      } else {
        question.options.forEach(o => {
          if (!o.jumpTo) {
            question.hasJump = false;
          }
        });
      }
    });
    return this.http.post(`/api/survey/papers/${surveyId}/questions/save`, this.questions)
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }
  modified(paperId: number): Observable<number> {
    return this.http.get(`/api/assess/${paperId}/modified`)
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }
  sort() {
    this.questions.sort((a, b) => a.displayOrder - b.displayOrder);
    this.questions.forEach(q => {
      if (q.description != null) {
        q.innerDescription = this.sanitizer.bypassSecurityTrustHtml(q.description);
      }
      if (q.options != null && q.options.length > 0) {
        q.options.forEach(o => {
          if (o.description != null) {
            o.innerDescription = this.sanitizer.bypassSecurityTrustHtml(o.description);
          }
        });
      }
      if (q.options) {
        q.options.sort((a, b) => a.displayOrder - b.displayOrder);
      }
      if (q.leftQuestions) {
        q.leftQuestions.sort((a, b) => a.displayOrder - b.displayOrder);
      }
    });
  }

  splitArrAvg(arr, len: number) {
    let a_len = arr.length;
    let result = [];
    for (let i = 0; i < a_len; i += len) {
      result.push(arr.slice(i, i + len));
    }
    return result;
  }

  addQuestion(type, idx?) {
    let len = this.questions.length;
    let maxDisplayOrder = 0;
    if (len > 0 && this.insertIdx === undefined) {
      maxDisplayOrder = this.questions[len - 1].displayOrder;
    }
    if (this.insertIdx != undefined) {
      maxDisplayOrder = this.questions[this.insertIdx].displayOrder;
      this.questions.forEach((q, i) => {
        if (i >= this.insertIdx + 1) {
          q.displayOrder += 1;
        }
      });
    }
    let question = new QuestionBase({
      id: 0,
      name: '请在这里输入题目标题',
      displayOrder: maxDisplayOrder + 1,
      type: type,
      options: [
        new Option({
          id: 0,
          name: "请在这里输入选项",
          displayOrder: 1
        }),
        new Option({
          id: 0,
          name: "选项",
          displayOrder: 2
        })
      ]
    });

    if (type == 'SINGLE_FILL') {
      question = new QuestionBase({
        id: 0,
        name: '请在这里输入题目标题',
        displayOrder: maxDisplayOrder + 1,
        type: type
      });
    }
    question.isEdit = true;
    if (this.insertIdx === undefined) {
      this.questions.push(question);
    } else {
      this.questions.splice(this.insertIdx + 1, 0, question);
    }
    this.insertIdx = undefined;
  }

  addMatrixQuestion(type, idx?) {
    let len = this.questions.length;
    let maxDisplayOrder = 0;
    if (len > 0 && this.insertIdx === undefined) {
      maxDisplayOrder = this.questions[len - 1].displayOrder;
    }
    if (this.insertIdx != undefined) {
      maxDisplayOrder = this.questions[this.insertIdx].displayOrder;
      this.questions.forEach((q, i) => {
        if (i >= this.insertIdx + 1) {
          q.displayOrder += 1;
        }
      });
    }
    let question = new QuestionBase({
      id: 0,
      name: '请在这里输入题目标题',
      displayOrder: maxDisplayOrder + 1,
      type: type,
      leftQuestions: [
        new LeftQuestion({
          name: '外观',
          type: type,
          displayOrder: maxDisplayOrder + 1
        }),
        new LeftQuestion({
          name: '外观',
          type: type,
          displayOrder: maxDisplayOrder + 2
        })
      ],
      options: [
        new Option({
          id: 0,
          name: "很不满意",
          displayOrder: 1
        }),
        new Option({
          id: 0,
          name: "不满意",
          displayOrder: 2
        }),
        new Option({
          id: 0,
          name: "一般",
          displayOrder: 3
        }),
        new Option({
          id: 0,
          name: "满意",
          displayOrder: 4
        }),
        new Option({
          id: 0,
          name: "很满意",
          displayOrder: 5
        })
      ]
    }
    );
    question.isEdit = true;
    if (this.insertIdx === undefined) {
      this.questions.push(question);
    } else {
      this.questions.splice(this.insertIdx + 1, 0, question);
    }
    this.insertIdx = undefined;
  }

  addMatrixFillQuestion(type, idx?) {
    let len = this.questions.length;
    let maxDisplayOrder = 0;
    if (len > 0 && this.insertIdx === undefined) {
      maxDisplayOrder = this.questions[len - 1].displayOrder;
    }
    if (this.insertIdx != undefined) {
      maxDisplayOrder = this.questions[this.insertIdx].displayOrder;
      this.questions.forEach((q, i) => {
        if (i >= this.insertIdx + 1) {
          q.displayOrder += 1;
        }
      });
    }
    let question = new QuestionBase({
      id: 0,
      name: '请在这里输入题目标题',
      displayOrder: maxDisplayOrder + 1,
      type: type,
      leftQuestions: [
        new LeftQuestion({
          name: '外观',
          type: type,
          displayOrder: maxDisplayOrder + 1
        }),
        new LeftQuestion({
          name: '外观',
          type: type,
          displayOrder: maxDisplayOrder + 2,
        })
      ]
    }
    );
    question.isEdit = true;
    if (this.insertIdx === undefined) {
      this.questions.push(question);
    } else {
      this.questions.splice(this.insertIdx + 1, 0, question);
    }
    this.insertIdx = undefined;
  }
  getQuestions(surveyId: number): Observable<any[]> {
    return this.http.get(`/api/survey/papers/${surveyId}/questions`)
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }

  getLogics(surveyId: number): Observable<any[]> {
    return this.http.get(`/api/survey/papers/${surveyId}/logics`)
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }

  getSurveyOne(surveyId: number): Observable<any[]> {
    return this.http.get(`/api/survey/papers/${surveyId}`)
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }

  jumpSubject(curNum, jumpNum, jumpShow) {
    this.questions.forEach((q, i) => {
      if (i > curNum && i < (jumpNum - 1)) {
        q.isShow = jumpShow;
      }
      // 控制间隔跳转的逻辑
      if (i >= (jumpNum - 1)) {
        q.isShow = true;
      }
    })
  }
}
