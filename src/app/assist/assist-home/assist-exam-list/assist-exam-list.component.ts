import { Component, OnInit } from '@angular/core';
import { AssistHomeApiService } from '../assist-home-api.service';
import { Pagination } from 'app/core/';

@Component({
  selector: 'spk-assist-exam-list',
  templateUrl: './assist-exam-list.component.html',
  styleUrls: ['./assist-exam-list.component.scss']
})
export class AssistExamListComponent implements OnInit {

  currentTab = 0;

  tabs = [
    {
      name: '我的监考',
      type: 'JK',
      actionName: '监考',
      action: item => this.toJKDetail(item)
    },
    {
      name: '我的阅卷',
      type: 'PJ',
      actionName: '阅卷',
      action: item => this.toPJDetail(item)
    },
    {
      name: '我的复评',
      type: 'FP',
      actionName: '复评',
      action: item => this.toFPDetail(item)
    },
    {
      name: '报名评审',
      type: 'SP',
      actionName: '评审',
      action: item => this.toSPDetail(item)
    },
    /* {
      name: '考试安排',
      type: 'KC',
      actionName: '安排',
      action: item => this.toKCDetail(item)
    } */
  ];

  loading: boolean = false;
  _data: Pagination<any>;

  get examList() {
    return this._data && this._data.content;
  }

  get assistType() {
    return this.tabs[this.currentTab].type;
  }

  isActive(type) {
    return type == this.assistType;
  }

  constructor(
    private assistHomeApi: AssistHomeApiService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._data = undefined;
    this.loading = true;
    let param = {
      page: 0,
      size: 5,
      stCode: this.assistType
    }
    this.assistHomeApi.examList(param).subscribe(
      data => {
        this._data = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  tabChange(tab) {
    this.currentTab = tab.index;
    this.loadData();
  }

  toJKDetail(exam) {
    let link = `/learner/assistant/invigilator/${exam.examId}`;
    this.openWindow(link);
  }

  toPJDetail(exam) {
    let link = `/learner/assistant/person/${exam.examId}?examName=${exam.examName}&stCode=PJ`;
    this.openWindow(link);
  }

  toFPDetail(exam) {
    let link = `/learner/assistant/person/${exam.examId}?examName=${exam.examName}&stCode=FP`;
    this.openWindow(link);
  }

  toSPDetail(exam) {
    let link = `/learner/assistant/examine?examId=${exam.examId}&images=${exam.images}&examName=${exam.examName}`;
    this.openWindow(link);
  }

  toKCDetail(exam) {
    let link = `/learner/assistant/kabox?examId=${exam.examId}&images=${exam.images}&examName=${exam.examName}`;
    this.openWindow(link);
  }

  openWindow(link) {
    window.open(link, "_blank");
  }
}
