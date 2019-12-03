import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-view-paper',
    templateUrl: './view-paper.component.html',
    styleUrls: ['./view-paper.component.scss']
})
export class ViewPaperComponent implements OnInit {
    @Input() paperId: any;

    dataList: any;
    comeType: string;
    spinning: boolean = true;
    queNum: number;
    // tslint:disable-next-line:max-line-length
    chooseArray: any[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private exampaperservice: ExamPaperService
    ) { }


    ngOnInit() {
        this.exampaperservice.getPreviewPaper(this.paperId).subscribe(
            list => {
                this.dataList = list;
                this.spinning = false;
                if (this.dataList.paperPartList) {
                    this.queNum = 0;
                    for (let i = 0, paperList = this.dataList.paperPartList; i < paperList.length; i++) {
                        this.queNum += paperList[i].pqlist.length;
                    }
                }
            },
            err => {
                this.spinning = false;
                tipMessage(err)
            })
        setTimeout(() => {
            console.log(this.paperId, this.dataList, 333)
        }, 1000)

    }
    returnPPList = (list, type?) => { // 返回匹配题问题/选项列表
        let test = [];
        let answer = [];
        (list || []).forEach((item, i) => {
            if (item.isCorrect) { // 表示是问题
                test.push(item);
            } else {
                answer.push(item);
            }
        });
        if (type) {
            return test;
        } else {
            return answer;
        }
    }

}
