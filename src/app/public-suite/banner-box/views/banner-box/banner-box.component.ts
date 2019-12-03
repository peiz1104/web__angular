import { BannerBox } from './../../entity/banner-box';
import { Banner } from './../../entity/banner';
import { BannerBoxService } from './../../service/banner-box.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'spk-banner-box',
    templateUrl: './banner-box.component.html',
    styleUrls: ['./banner-box.component.scss']
})
export class BannerBoxComponent implements OnInit {

    @Input() bannerBox: BannerBox;
    @Output() afterBoxInited = new EventEmitter();

    currentBanner: Banner;
    constructor(private boxService: BannerBoxService) { }

    ngOnInit() {
    }

    initBox() {
        this.boxService.initBannerBoxBox().subscribe(
            box => {
                this.bannerBox = box;
                this.afterBoxInited.emit(box);
            }
        );
    }
}
