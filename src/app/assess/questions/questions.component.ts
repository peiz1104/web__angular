import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from './questions.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AssessService } from '../assess.service';
import { PaperService } from '../paper.service';
import { QuestionBase } from './base-question.model';
import { NzModalService } from 'ng-zorro-antd';
import { QuestionViewComponent } from './question-view/question-view.component';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

    questions = [];
    @Input() paperId?: number;
    @Input() isAssess?: boolean;
    @Input() assessId?: number;
    @Input() outSide?: string;

    isLoading: boolean = false;
    isLoadingOne: boolean = false;


    constructor(private assessService: AssessService,
        private questionsService: QuestionsService,
        private router: Router,
        private route: ActivatedRoute,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.assessId = this.assessId || +params['id'];
                if (this.paperId) {
                    this.questionsService.getQuestions(this.paperId).subscribe(
                        data => {
                            this.questions = [];
                            data.forEach(e => {
                                this.questions.push(new QuestionBase(e));
                            });
                            this.questionsService.questions = this.questions;
                            this.questionsService.sort();
                        });
                } else {
                    this.assessService.get(this.assessId).subscribe(assess => {
                        this.paperId = assess.paper.id;
                        this.questionsService.getQuestions(this.paperId).subscribe(
                            data => {
                                this.questions = [];
                                data.forEach(e => {
                                    this.questions.push(new QuestionBase(e));
                                });
                                this.questionsService.questions = this.questions;
                                this.questionsService.sort();
                            });
                    });
                }
            });
    }

    onAddQuestion(type) {
        this.questionsService.addQuestion(type);
    }

    onAddMatrixQuestion(type) {
        this.questionsService.addMatrixQuestion(type);
    }

    saveQuestions() {
        this.questionsService.modified(this.paperId).subscribe(
            num => {
                if (num > 0) {
                    tipMessage('该问卷已作答不允许修改');
                } else {
                    this.isLoading = true;
                    this.questionsService.saveQuestions(this.paperId).subscribe(
                        ret => {
                            this.isLoading = false;
                            tipMessage('保存成功', 'success');
                            this.questionsService.getQuestions(this.paperId).subscribe(
                                data => {
                                    this.questions = [];
                                    data.forEach(e => {
                                        this.questions.push(new QuestionBase(e));
                                    });
                                    this.questionsService.questions = this.questions;
                                    this.questionsService.sort();
                                });
                        },
                        err => {
                            this.isLoading = false;
                        }
                    );
                }
            }
        );
    }

    toView() {
        this.isLoadingOne = true;
        this.questionsService.saveQuestions(this.paperId).subscribe(
            ret => {
                this.isLoadingOne = false;
                // this.questionsService.getQuestions(this.paperId).subscribe(
                //   data => {
                //     this.questions = [];
                //     data.forEach(e => {
                //       this.questions.push(new QuestionBase(e));
                //     });
                //     this.questionsService.questions = this.questions;
                //     this.questionsService.sort();
                //   });
                this.openPreview();
            },
            err => {
                this.isLoadingOne = false;
            }
        );
    }

    confirm() {
        this.questionsService.saveQuestions(this.assessId).subscribe(
            ret => {
                this.router.navigate(['../../'], { relativeTo: this.route });
            }
        );
    }

    cancel() {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }

    openPreview() {
        this.modal.open({
            title: `预览`,
            content: QuestionViewComponent,
            footer: false,
            width: 1000,
            maskClosable: true,
            componentParams: {
                assessId: this.assessId,
                questions: this.questionsService.questions
            }
        });
    }
}
