import { QuestionActionComponent } from './../questions/question-action/question-action.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssessService } from '../assess.service';
import { AssessPaper } from '../assessPaper.model';
import { QuestionBase } from '../questions/base-question.model';
import { CuiPagination } from 'console-ui-ng';
import { NzModalService } from 'ng-zorro-antd';
import { AssessAnswerEchoComponent } from '../assess-answer-echo/assess-answer-echo.component';

@Component({
  selector: 'spk-assess-analysis',
  templateUrl: './assess-analysis.component.html',
  styleUrls: ['./assess-analysis.component.scss']
})
export class AssessAnalysisComponent implements OnInit {

  paperId: number;
  assessId: number;
  offeringId: number;
  assess: AssessPaper;
  questions: QuestionBase[];
  assessType: string;
  pagination: CuiPagination;
  columns;
  assessList: AssessPaper[];
  searchtext: string;
  isVisible: boolean = false;


  detailColumns;
  detailList: QuestionBase[];
  detailPag: CuiPagination;
  detailText: string;
  optionId: number;

  totalAnswer: number = 0;
  totalAvg: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assessService: AssessService,
    private modal: NzModalService
  ) {
    this.columns = [
      { title: '用户名', data: 'username' },
      { title: '姓名', data: 'displayName' },
      { title: '手机号码', data: 'phoneNumber' },
      { title: '电子邮件', data: 'email' },
      { title: '所属组织', data: 'groupName' },
    ];
    this.detailColumns = [
      { title: '用户名', data: 'username' },
      { title: '姓名', data: 'displayName' },
      { title: '作答问题', data: 'questionName' },
      { title: '作答选项', data: 'optionName' },
      { title: '作答结果', data: 'content' }
    ];
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['paperId']) {
          this.paperId = +params['paperId'];
          // 查询汇总
          this.assessService.getAnalysis(this.paperId).subscribe(
            data => {
              // 请求该问卷的所有作答人数
              this.assessService.getTotalAnswer(this.offeringId, this.paperId).subscribe(
                allAnswer => {
                  this.totalAnswer = allAnswer;
                  this.questions = data;
                  this.questions.forEach(q => {
                    if ( q.type == 'MATRIX_SINGLE' || q.type == 'MATRIX_MULTIPLE') {
                      let t = 0;
                      q.leftQuestions.forEach(l => {
                        t += l.avgScore;
                      });
                      q.avgScore = +(t / this.totalAnswer).toFixed(1);
                    }
                  });
                  // if (allAnswer) {
                  //   this.totalAvg = +(this.totalAvg / this.totalAnswer).toFixed(1);
                  // }
                });
            });
        }
      });
    this.route.queryParams.subscribe(
      ({assessId, offeringId, assessType}) => {
        this.assessId = assessId;
        this.offeringId = offeringId;
        this.assessType = assessType;
        console.log(this.assessType, 999)
        // 查询评估信息
        if (assessType == 'ASSESS') {
          this.assessService.get(this.assessId).subscribe(
            data => {
             this.assess = data;
             console.log(this.assess, 88995566)
            });
        } else {
          this.assessService.getSurvey(this.assessId).subscribe(
            data => {
             this.assess = data;
            });
        }
      });
  }

  _tabChange(event) {
    if (event.index == 1) {
      this.getUserAnswerList();
    }
  }

  getUserAnswerList(page?: CuiPagination) {
      this.pagination = page;
      let params = {
        searchText: this.searchtext,
        page: page ? page.number : 0,
        size: page ? page.size : '10',
        sort: page && page.sort ? page.sort : ''
      };
      this.assessService.getUserAnswerList(this.offeringId, this.paperId, params).subscribe(
        pag => {
          this.pagination = pag;
          this.assessList = pag.content;
      });
  }

  openDetail(option) {
    this.isVisible = true;
    this.optionId = option.id;
    this.loadList()
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }
  loadList(page?: CuiPagination) {
    this.detailPag = page;
      let params = {
        detailText: this.detailText,
        page: page ? page.number : 0,
        size: page ? page.size : '10',
        sort: page && page.sort ? page.sort : ''
      };
    this.assessService.getAnswerDetailList(this.optionId, params).subscribe(
      pag => {
        this.detailPag = pag;
        this.detailList = pag.content;
    });
  }

  getPercent(option, question) {
    let result = (option.totalNum / question.totalNum);
    result = +result.toFixed(1) * 100;
    return result;
  }

  openEcho(row) {
    this.modal.open({
      title: `回顾`,
      content: AssessAnswerEchoComponent,
      footer: false,
      width: 1000,
      maskClosable: false,
      componentParams: {
        paperId: this.paperId,
        offeringId: this.offeringId,
        assessId: this.assessId,
        userId: row.id
      }
    });
  }
}
