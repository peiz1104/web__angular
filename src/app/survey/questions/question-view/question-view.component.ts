import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionBase } from '../base-question.model';
import { Location } from '@angular/common';
import { Option } from '../option.model';
import { RelevantLogic } from '../relevant-logic.model';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-question-view',
    templateUrl: './question-view.component.html',
    styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {

    questions = [];
    surveyId: number;
    loading: boolean;
    logics = [];
    paperInfo: any;

    constructor(
        private questionsService: QuestionsService,
        private dialog: CuiLayer,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit() {
        this.loading = true;
        this.route.params.subscribe(
            (params: Params) => {
                this.surveyId = +params['id'];
                this.questionsService.surveyId = +params['id'];

                // 请求单个调查的信息
                this.questionsService.getSurveyOne(this.surveyId).subscribe(data => {
                    this.paperInfo = data;
                });

                // 请求问题列表
                this.questionsService.getQuestions(this.surveyId)
                    .subscribe(data => {
                        this.questions = [];
                        data.forEach(e => {
                            e.isView = true;
                            this.questions.push(new QuestionBase(e));
                        });
                        this.questionsService.questions = this.questions;
                        this.questionsService.sort();
                        this.questions.forEach(e => {
                            if (e.hasJump) {
                                let jump = this.questionsService.questions.find(q => q.id == e.jumpTo);
                                let cIdx = this.questionsService.questions.indexOf(jump);
                                e.jumpNum = cIdx + 1;
                            }
                            if (e.hasOptionJump) {
                                e.options.forEach(o => {
                                    if (o.jumpTo > 0) {
                                        let jump = this.questionsService.questions.find(q => q.id == o.jumpTo);
                                        let cIdx = this.questionsService.questions.indexOf(jump);
                                        o.jumpNum = cIdx + 1;
                                    }
                                });
                            }
                        })
                        this.loading = false;
                        this.questionsService.questions.forEach(q => {
                            if (q.type === 'MATRIX_MULTIPLE' || q.type === 'MATRIX_FILL') {
                                let ops = [];
                                q.leftQuestions.forEach(left => {
                                    ops = [];
                                    q.options.forEach(o => {
                                        ops.push(new Option({ defaultOpt: false, leftQuestionId: left.id }));
                                    });
                                    left.options = ops;
                                });
                            }
                        });
                    });
            });
    }
    onSubmit() {
        tipMessage('试填后的答卷不会参与结果统计', '', 3000);
    }
    goBack() {
        this.location.back();
    }

}
