import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';

@Component({
    selector: 'spk-home-template-column-banner',
    templateUrl: './home-template-column-banner.component.html',
    styleUrls: ['./home-template-column-banner.component.scss']
})
export class HomeTemplateColumnBannerComponent implements OnInit, OnChanges {
    @ViewChild('carousel') carousel: any;
    @Input() itemConfig?: any;
    @Output() isLoad = new EventEmitter<any>();
    bannerInfo: any;
    constructor(
        private templateService: HomeTemplateApiService,
    ) { }

    ngOnInit() {
    }
    ngOnChanges() {
        this.loadData();
    }
    loadData() {
        this.templateService.getBannerInfo(this.itemConfig.id).subscribe(
            obj => {
                this.bannerInfo = obj;
                this.templateService.configInfoAll.forEach(e => {
                    if (e.id == this.itemConfig.id) {
                        e.itemInfo = obj;
                    }
                });
                this.isLoad.emit(true);
            },
            err => {
                this.isLoad.emit(true);
            }
        )
    }
}
