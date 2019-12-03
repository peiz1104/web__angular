import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectSettingApiService } from "./../service/subject-setting-api.service";
import { BannerBox } from 'app/public-suite/banner-box/entity/banner-box';

@Component({
    selector: 'spk-subjcet-banner-box-list',
    templateUrl: './subject-banner-box-list.component.html',
    styleUrls: ['./subject-banner-box-list.component.scss']
})
export class SubjcetBannerBoxListComponent implements OnInit {

    bannerBox: BannerBox = new BannerBox();
    constructor(private router: Router, private route: ActivatedRoute,
        private settingApiService: SubjectSettingApiService) { }



    ngOnInit() {
        this.settingApiService.findBannerBox().subscribe(bannerBox => {
            this.bannerBox = bannerBox;
        })
    }

    afterBoxInited(event) {
        this.bannerBox = event;
        this.settingApiService.initBannerBox(this.bannerBox.id).subscribe(obj => {
            this.bannerBox = obj;
            console.log("组件初始成功");
        });
    }
}
