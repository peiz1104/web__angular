import { Component, OnInit } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-home-template-column-notice',
    templateUrl: './home-template-column-notice.component.html',
    styleUrls: ['./home-template-column-notice.component.scss']
})
export class HomeTemplateColumnNoticeComponent implements OnInit {

    notice: any;
    curPage: number = 0;
    noticeList: any;
    hasPrev: boolean;
    hasNext: boolean;
    constructor(
        private templateService: HomeTemplateApiService,
    ) { }

    ngOnInit() {
        this.loadData();
    }
    loadData() {
        let param = {
            page: this.curPage,
            size: 10
        }
        this.templateService.getNotice(param).subscribe(
            obj => {
                this.notice = obj;
                this.noticeList = obj.content;
                this.curPage = obj.number;
                this.hasPrev = !!this.notice.number;
                this.hasNext = (this.notice.totalPages - 1) != this.notice.number;
            },
            err => {
                tipMessage(err);
            }
        )
    }
    goPrev() {
        if (this.hasPrev) {
            this.curPage--;
            this.loadData();
        } else {
            tipMessage('已经到第一页', 'warning')
        }
    }
    goNext() {
        if (this.hasNext) {
            this.curPage++;
            this.loadData();
        } else {
            tipMessage('已经到最后一页', 'warning')
        }
    }

}
