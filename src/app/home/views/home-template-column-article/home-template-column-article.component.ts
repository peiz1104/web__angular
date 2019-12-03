import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-home-template-column-article',
    templateUrl: './home-template-column-article.component.html',
    styleUrls: ['./home-template-column-article.component.scss']
})
export class HomeTemplateColumnArticleComponent implements OnInit, OnChanges {

    @Input() itemConfig?: any;
    @Output() isLoad = new EventEmitter<any>();
    articleInfo: any = [];
    constructor(
        private templateService: HomeTemplateApiService,
    ) { }
    ngOnInit() {
    }
    ngOnChanges() {
        this.loadData();
    }
    loadData() {
        this.templateService.getArticleInfo(this.itemConfig.id).subscribe(
            obj => {
                this.articleInfo = obj.content;
                this.templateService.configInfoAll.forEach(e => {
                    if (e.id == this.itemConfig.id) {
                        e.itemInfo = obj.content;
                    }
                });
                this.isLoad.emit(true);
            },
            err => {
                tipMessage(err);
                this.isLoad.emit(true);
            }
        )
    }

}
