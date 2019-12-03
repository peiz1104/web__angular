import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExamPaperService } from '../../../service/exam-paper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-review-papers-frame',
    templateUrl: './review-papers-frame.component.html',
    styleUrls: ['./review-papers-frame.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReviewPapersFrameComponent implements OnInit {

    rightKey: any = {}; // 正确答案
    submitModal: boolean = false; // 交卷状态框
    answers: any = {}; // 用户答案数据
    answersReading: any = {}; // 阅读理解题数据
    pageSize: any = 10; // 每页条数
    paper: any = {}; // 试卷信息
    questions: any[] = []; // 试题列表
    examInfo: any = {}; // 考试基本信息
    checkCode: any; // 私钥
    renderQuestion: any[] = []; // 分页后数据
    offSetTop: any; // 移动滚动条
    ing: boolean = false; // 滚动状态
    submitMessage: any = {}; // 交卷状态信息
    uceId: any; // 考试轨迹Id
    noDaNum: number = 0;
    nzLoading: boolean = false;
    thisScore: any; // 考试得分
    totalScore: any; // 考试总分
    examSeq: number;
    user: any;
    isSpinning: boolean = false;
    name: string;
    userName: string;

    radioValue: string = 'all'; // 筛选

    constructor(
        private examPaperService: ExamPaperService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.uceId = this.activatedRoute.snapshot.params['uceId'];
        this.examInfo = JSON.parse(localStorage.getItem('examInfo'));
    }

    ngOnInit() {
        this.getReviewExamInfo();
    }

    getReviewExamInfo = () => {
        this.isSpinning = true;
        // tslint:disable-next-line:no-unused-expression
        this.uceId && this.examPaperService.getReviewPapers({ uceId: this.uceId }).subscribe(
            (data) => {
                // tslint:disable-next-line:no-unused-expression
                this.renderQuestion = this.parseQuestion(data);
                this.answers = data.scantron.userAnswer || {};
                this.examSeq = data.scantron.examSeq;
                this.paper = data.userPaper || {};
                this.rightKey = data.answer.examAnswer || {};
                this.name = data.name || '暂无';
                this.userName = data.userName || '暂无';
                this.isSpinning = false;
            },
            (error) => {
                tipMessage(error);
                this.isSpinning = false;
                setTimeout(() => {
                    window.close();
                }, 3000);
            }
        );
    }

    // 格式化数据，方便分页处理
    parseQuestion = (data) => {
        let questions = [];
        let partData = data.userPaper.partList && data.userPaper.partList[0];
        let answers = data.answer;
        let userAnswers = data.scantron;
        // 解析问题
        let index = 1;
        (data.userPaper.partList || []).map(part => { // 遍历分区list
            (part.queList || []).map((item, j) => { // 遍历分区下试题list
                if (j == 0) { // 如果是第一个
                    item.part = part;
                }
                let answer = answers.examAnswer[item.queId];
                let userAnswer = userAnswers.userAnswer[item.queId];
                item.userAnswer = userAnswer;
                item.answer = answer;
                item.que_num = index++;
                questions.push(item);
            });

        });
        return questions;

    }
    screenSubject() {
        this.getReviewExamInfo();
    }

}
