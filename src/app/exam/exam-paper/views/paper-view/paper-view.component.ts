/*
 * @Author: peimingjun
 * @Date: 2017-11-01 17:47:39
 * @Last Modified by: peimingjun
 * @Last Modified time: 2017-11-17 15:22:46
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-view',
    templateUrl: './paper-view.component.html',
    styleUrls: ['./paper-view.component.scss']
})
export class PaperViewComponent implements OnInit {
    paperId: any;
    dataList: any;
    comeType: string;
    spinning: boolean = true;
    // tslint:disable-next-line:max-line-length
    chooseArray: any[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private exampaperservice: ExamPaperService,
    ) { }

    ngOnInit() {
        // SC:单选题；RC：阅读理解题；SA：简答题；MQ：匹配题；CA：案例分析题；FB：填空题；MC：多选题
        this.routeInfo.params.subscribe((params) => this.paperId = params['id']);
        this.exampaperservice.getPreviewPaper(this.paperId).subscribe(
            list => {
                this.dataList = list;
                this.spinning = false;
            },
            err => {
                this.spinning = false;
                tipMessage(err)
            })
    }

    goback = () => {
        window.history.back();
    }
}
