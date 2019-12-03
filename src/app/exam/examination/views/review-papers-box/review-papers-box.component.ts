// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, Renderer, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
    selector: 'spk-review-papers-box',
    templateUrl: './review-papers-box.component.html',
    styleUrls: ['./review-papers-box.component.scss'],
})
export class ReviewPapersBoxComponent implements OnInit {
    @Input() data: any;
    @Input() number: any;
    @Input() answer: any;
    @Input() rightKey: any;
    @Input() answersReading: any;
    // @Output() numMasked = new EventEmitter<string>();
    // @Output() numRespond = new EventEmitter<string>();

    @ViewChild('imgBox') imgBox: ElementRef;
    @ViewChild('showImg') showImg: ElementRef;

    type: any = '';  // 填空题TK 单选题DX 多选题TX 判断题PD 简答题(案例分析题（ALFX）/论述题(lS)/名词解释(MCJS)/问答题(WD))JD   阅读理解(组合题)YDLJ 匹配题（PP）
    quesType: any = 'QJD';  // QJD QPP QYDLJ QPD
    name: any;       // 类型名
    viewUrl: string = ''; // 图片大图展示路径
    viewImg: boolean = false;
    rotate: number = 0;
    isViewClick: boolean = false; // 控制预览图片频率
    oldWidth: number = 0;
    constructor(private renderer: Renderer) { }

    ngOnInit() {
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
                    that.handleImgView({
                        'event': event,
                        'src': dom[i].src
                    });
                };
            }
        }
    }
    handleImgView = (params?) => {
        console.log('预览：', params);
        if (this.isViewClick) {
            return;
        }
        this.isViewClick = true;
        setTimeout(() => {
            this.isViewClick = false;
        }, 500);
        params = params || {};
        this.viewUrl = params.src;
        this.rotate = 0;
        this.viewImg = !this.viewImg;
        if (!this.viewImg) {
            this.renderer.setElementStyle(this.showImg.nativeElement, 'width', 'auto');
        }
        const event = params.event || {};
        // tslint:disable-next-line:no-unused-expression
        event.preventDefault && event.preventDefault();
        // tslint:disable-next-line:no-unused-expression
        event.stopPropagation && event.stopPropagation();
        event.returnValue = false;
        event.cancelBubble = true;
    }
    // 旋转图片
    rotateImg(type) {
        if (type == 'left') {
            this.rotate -= 90;
        } else {
            this.rotate += 90;
        }
        if (this.rotate !== 0 && this.rotate % 180 !== 0) {
            let box = this.imgBox.nativeElement.clientHeight * 0.95;
            let img = this.showImg.nativeElement.clientWidth;
            this.oldWidth = img;
            if (img > box) {
                this.renderer.setElementStyle(this.showImg.nativeElement, 'width', box + 'px');
            }
        } else {
            this.renderer.setElementStyle(this.showImg.nativeElement, 'width', this.oldWidth + 'px');
        }
    }
}
