import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../../base-question.model';
import { QuestionsService } from '../../questions.service';
import { Option } from '../../option.model';
import { LeftQuestion } from '../../left-question.model';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-assess-matrix-option',
    templateUrl: './matrix-option.component.html',
    styleUrls: ['./matrix-option.component.scss']
})
export class MatrixOptionComponent implements OnInit {

    @Input() question: QuestionBase;
    options: Option[] = [];
    @Input() idx: number;
    subquestions: LeftQuestion[] = [];
    constructor(private questionsService: QuestionsService) { }

    ngOnInit() {
        this.subquestions = this.question.leftQuestions;
    }

    onInsert(option: Option) {
        let o = this.question.options;
        let idx = o.indexOf(option);
        let newOption = new Option({
            id: 0,
            name: "请在这里输入选项",
            displayOrder: option.displayOrder + 1
        });
        o.splice(idx + 1, 0, newOption);
    }

    onDel(option: Option) {
        let o = this.question.options;
        let idx = o.indexOf(option);
        if ((this.question.options.length - 1) == 0) {
            tipMessage('请至少保留一项');
        } else {
            o.splice(idx, 1);
        }
    }

    onUp(option: Option) {
        let o = this.question.options;
        if (o.length > 1) {
            let idx = o.indexOf(option);
            let preOption = o[idx - 1];
            let displayOrder = preOption.displayOrder;
            preOption.displayOrder = option.displayOrder;
            option.displayOrder = displayOrder;
            o[idx - 1] = option;
            o[idx] = preOption;
        }
    }

    onDown(option: Option) {
        let o = this.question.options;
        let idx = o.indexOf(option);
        if (idx < o.length - 1) {
            let nextOption = o[idx + 1];
            let displayOrder = nextOption.displayOrder;
            nextOption.displayOrder = option.displayOrder;
            option.displayOrder = displayOrder;
            o[idx + 1] = option;
            o[idx] = nextOption;
        }
    }

    onAddItem(question: QuestionBase) {
        let idx = this.subquestions.indexOf(question);
        let newItem = new QuestionBase({
            id: 0,
            name: "请在这里输入题目",
            type: this.subquestions[0].type,
            displayOrder: question.displayOrder + 1
        });
        this.subquestions.splice(idx + 1, 0, newItem);
        let options = [
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
        this.subquestions[idx + 1].options = options;
    }

    onDelItem(question: QuestionBase) {
        let idx = this.subquestions.indexOf(question);
        if ((this.subquestions.length - 1) == 0) {
            tipMessage('请至少保留一项');
        } else {
            this.subquestions.splice(idx, 1);
        }
    }
    optionChange(option, foo) {
        if (foo.value.trim().length) {
            option.name = foo.value;
        }
    }
    questionChange(question, foo) {
        if (foo.value.trim().length) {
            question.name = foo.value;
        }
    }
}
