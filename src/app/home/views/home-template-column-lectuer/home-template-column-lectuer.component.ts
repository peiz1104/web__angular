import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-home-template-column-lectuer',
    templateUrl: './home-template-column-lectuer.component.html',
    styleUrls: ['./home-template-column-lectuer.component.scss']
})
export class HomeTemplateColumnLectuerComponent implements OnInit, OnChanges {

    @Input() itemConfig?: any;
    @Output() isLoad = new EventEmitter<any>();
    lectuerInfo: any = [];
    constructor(
        private templateService: HomeTemplateApiService
    ) { }
    ngOnInit() {
    }
    ngOnChanges() {
        this.loadData();
    }
    loadData() {
        this.templateService.getModuleTeacher(this.itemConfig.id).subscribe(
            data => {
                this.lectuerInfo = data;
                this.templateService.configInfoAll.forEach(e => {
                    if (e.id == this.itemConfig.id) {
                        e.itemInfo = data;
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
    rankFn(rank) {
        if (rank == 'I') {
            return '预备讲师'
        } else if (rank == 'II') {
            return '助理讲师'
        } else if (rank == 'III') {
            return '中级讲师'
        } else if (rank == 'IV') {
            return '高级讲师'
        } else {
            return '暂无'
        }
    }

}
