import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'spk-review-answer-box',
    templateUrl: './review-answer-box.component.html',
    styleUrls: ['./review-answer-box.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReviewAnswerBoxComponent implements OnInit {

    @Input() data: any = null;
    @Input() number: any;       // 序号
    @Input() answer: any; // 所有答案数据
    @Input() rightKey: any; // 正确答案
    @Input() childNum: any;      // 阅读理解题子题序号
    @Output() handleImgView = new EventEmitter<any>();
    answers: any; // 当前答案数据
    rightKeys: any;
    ppValue: any; // 匹配题专用
    dxContent: any[]; // 多选
    childName = true;
    isSign: any;
    content: any; // 答案
    status: any = {}

    tkRightKey: any;
    tkUserAsw: any;
    pdRightKey: any;
    pdUserAsw: any;
    dxRightKey: any;

    markingData: any = [] // 阅卷数据
    reviewData: any = [] // 复评
    arbitrationData: any = [] // 仲裁

    constructor() { }


    ngOnInit() {
        this.childName = this.childNum ? false : true;
        this.answers = this.answer[this.data.queId] || {};
        this.rightKeys = this.rightKey[this.data.queId];
        this.markingData = this.answers.markingList || [];
        this.reviewData = this.answers.reviewList || [];
        this.arbitrationData = this.answers.arbitrateList || [];
        this.setAnswer();
        this.setContntValue();
        this.childNum = this.childNum ? `(${this.childNum})` : undefined;
    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterContentInit() {
        setTimeout(() => {
            this.addImgClick();
        }, 0);
    }
    addImgClick = () => {
        let that = this;
        let dom = document.getElementsByTagName('img');
        // dom.addEventListener();
        for (let i = 0; i < dom.length; i++) {
            dom[i].setAttribute('alt', '');
            dom[i].setAttribute('title', '');
            dom[i].setAttribute('onerror', 'this.src="assets/images/imgerror.png"');
            let isClick = dom[i].getAttribute('isNoClick');
            if (!isClick) {
                dom[i].onclick = function (event) {
                    that.handleImgView.emit({
                        'event': event,
                        'src': dom[i].src
                    });
                };
            }
        }
    }
    setAnswer() {
        if (typeof this.rightKeys.content == 'object') {
            let tkRight = [], tkUser = []
            // tslint:disable-next-line:forin
            for (let key in this.rightKeys.content) {
                tkRight.push(this.rightKeys.content[key])
            }
            // tslint:disable-next-line:forin
            for (let key in this.answers.userAns) {
                tkUser.push(this.answers.userAns[key])
            }
            this.tkRightKey = tkRight;
            this.tkUserAsw = tkUser
        }
        if (this.data.baseType == 'PD') {
            this.rightKeys.content == 'yes' ? this.pdRightKey = '对' : this.pdRightKey = '错';
            this.answers.userAns == 'yes' ? this.pdUserAsw = '对' : this.pdUserAsw = '错';
        }
        // if (this.data.baseType == 'JD' || this.data.baseType == 'ALFX') {
        //     console.log(this.data, this.rightKeys, this.answers)
        // }
        if (this.data.baseType == 'DANX') {
            this.data.opionList.map((item, i) => {
                if (item.opId == this.rightKeys.content) {
                    this.rightKeys.content = String.fromCharCode(65 + i);
                }
                if (item.opId == this.answers.userAns) {
                    this.answers.value = this.answers.userAns;
                    this.answers.userAns = String.fromCharCode(65 + i);
                }
            })
        }
        if (this.data.baseType == 'DUOX') {
            let dxRight = [], dxAnswer = [];
            this.data.opionList.map((item, i) => {
                this.rightKeys.content.map((cell) => {
                    if (item.opId == cell) {
                        dxRight.push(String.fromCharCode(65 + i))
                    }
                })
                // tslint:disable-next-line:no-unused-expression
                this.answers.userAns && this.answers.userAns.map((cell) => {
                    if (item.opId == cell) {
                        dxAnswer.push(String.fromCharCode(65 + i))
                    }
                })
            })
            this.rightKeys.value = dxRight;
            this.answers.value = dxAnswer;
        }
        if (this.data.baseType == 'PP') {
            let ppRight = [], ppAnswer = [];
            let answerList = {};
            this.data.childQueList.map((item) => {
                answerList[item.queId] = '无';
            })

            // tslint:disable-next-line:forin
            for (let key in this.rightKeys.content) {// 标准答案
                this.data.opionList.map((item, i) => {
                    if (item.opId == this.rightKeys.content[key]) {
                        ppRight.push(String.fromCharCode(65 + i))
                    }
                })
            }

            // tslint:disable-next-line:forin
            for (let key in this.answers.userAns) {
                answerList[key] = this.answers.userAns[key]
            }

            this.data.opionList.map((item, i) => {
                for (let key in answerList) {
                    if (item.opId == answerList[key]) {
                        answerList[key] = String.fromCharCode(65 + i)
                    }
                }
            })
            // tslint:disable-next-line:forin
            for (let key in answerList) {
                ppAnswer.push(answerList[key])
            }
            this.rightKeys.value = ppRight;
            this.answers.value = ppAnswer;
        }
    }

    // 设置初始值
    setContntValue = () => {
        if (this.data.baseType == 'DUOX') { // 多选题
            this.content = this.answers && this.answers.userAns || [];
            this.dxContent = this.data.opionList || [];
        } else if (this.data.baseType == 'PP' || this.data.baseType == 'TK') { // 匹配题
            this.content = this.answers && this.answers.userAns || {};
        } else if (this.data.baseType == 'ALFX' || this.data.baseType == 'JD') { // 案例分析和简答
            this.content = this.answers && this.answers.isImg == 'Y' ? '' : this.answers.userAns;
        } else {
            this.content = this.answers && this.answers.userAns;
        }
    }
    getCharCode(i) {
        return String.fromCharCode(65 + i);
    }

}
