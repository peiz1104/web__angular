import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from '../questions/questions.service';
import { QuestionBase } from '../questions/base-question.model';
import { Option } from '../questions/option.model';
import { AssessService } from '../../assess/assess.service';

@Component({
  selector: 'spk-assess-answer-echo',
  templateUrl: './assess-answer-echo.component.html',
  styleUrls: ['./assess-answer-echo.component.scss']
})
export class AssessAnswerEchoComponent implements OnInit {

  @Input() paperId: number;
  @Input() userId: number;
  @Input() offeringId: number;
  @Input() assessId: number;

  questions = [];
  loading: boolean;
  paperInfo: any;
  answerList: any;

  constructor(
    private questionsService: QuestionsService,
    private assessService: AssessService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.assessService.get(this.assessId).subscribe(assess => {
      this.paperInfo = assess;
    });
    // 请求问题列表
    this.questionsService.getQuestions(this.paperId)
      .subscribe(data => {
        this.questions = [];
        data.forEach(e => {
          this.questions.push(new QuestionBase(e));
        });

      // 请求答案列表
      this.questionsService.getAnswers(this.paperId, this.offeringId, this.userId).subscribe(
        answers => {
        this.answerList = answers;
        // 将答案追加到问题内
        this.questions.forEach(q => {
          this.compareQuestionType(q);
        });
      });
      this.loading = false;
      console.log(this.questions)
      });

  }

  /**
   * 根据题目类型进行循环
   * @param q
   */
  compareQuestionType(q: QuestionBase) {
    // 单选或多选
    if (q.type == 'SINGLE' || q.type == 'MULTIPLE') {
      q.options.forEach(o => {
        this.answerList.forEach(answer => {
          if (answer.questionId == q.id && answer.optionId == o.id) {
            o.defaultOpt = true;
          }
        });
      });
    }
    // 矩阵题
    if (q.type == 'MATRIX_SINGLE' || q.type == 'MATRIX_MULTIPLE') {
      // 循环左侧题目
      q.leftQuestions.forEach(l => {
        // 循环各子题的选项
        l.options.forEach(o => {
          this.answerList.forEach(answer => {
            if (answer.questionId == q.id && answer.optionId == o.id && l.id == answer.leftQuestionId) {
              o.defaultOpt = true;
            }
          });
        });
      });
    }
    // 填空题
    if (q.type == 'SINGLE_FILL' || q.type == 'MULTIPLE_FILL' || q.type == 'SHORT_ANSWER') {
      q.options.forEach(o => {
        this.answerList.forEach(answer => {
          if (answer.questionId == q.id && answer.optionId == o.id) {
            o.content = answer.content;
          }
        });
      });
    }
  }

}
