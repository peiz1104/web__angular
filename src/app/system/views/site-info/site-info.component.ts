import { Component, OnInit } from '@angular/core';
import { Site } from '../../entity/site';
import { SiteService } from '../../service/site.service';
import { SiteInfoService } from 'app/core/service/site-info.service';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-site-info',
    templateUrl: './site-info.component.html',
    styleUrls: ['./site-info.component.scss']
})
export class SiteInfoComponent implements OnInit {
    site: Site;
    success;
    err;
    loading: boolean = false;

    constructor(
        private siteService: SiteService,
        private siteInfoService: SiteInfoService,
    ) { }

    ngOnInit() {
        this.siteService.getCurrentSite().subscribe(
            site => this.site = site
        );
    }

    onSave(e) {
        this.loading = true;
        let value = e.value;
        value.id = this.site.id;
        this.siteService.update(value).subscribe(
            site => {
                this.loading = false;
                tipMessage('修改成功', 'success');
                this.siteInfoService.loadSiteInfo();
            },
            err => {
                this.loading = false;
                tipMessage('保存失败：', 'error');
            }
        );
    }
}
