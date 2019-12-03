import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-preview-partition',
    templateUrl: './paper-preview-partition.component.html',
    styleUrls: ['./paper-preview-partition.component.scss']
})

export class PaperPreviewPartitionComponent implements OnInit {
    @Input() paperId: any;
    @Input() partitionId: any;
    spinning: boolean = true;
    partitionData: any;
    // tslint:disable-next-line:max-line-length
    answerList: any[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private exampaperservice: ExamPaperService

    ) { }

    ngOnInit() {
        // this.routeInfo.params.subscribe(params => this.partitionId = params['id']);
        // this.routeInfo.queryParams.subscribe(params => this.paperId = params.paperId);
        this.exampaperservice.getPartitionPreviewData(this.paperId, this.partitionId).subscribe((res) => {
            this.partitionData = res;
            this.spinning = false;
        }, err => {
            tipMessage(err);
            this.spinning = false;
        })
    }
    // 返回
    goBack(event) {
        window.history.back();
    }

}
