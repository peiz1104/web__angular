import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { Site } from '../../../system/entity/site';
import { AuthService } from 'app/core/auth/auth.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-home-template-column',
    templateUrl: './home-template-column.component.html',
    styleUrls: ['./home-template-column.component.scss']
})
export class HomeTemplateColumnComponent implements OnInit, OnChanges {

    @Input() templateId?: number;
    @Input() itemConfig?: any;
    @Output() isLoad = new EventEmitter<any>();
    site: Site;
    logoInfo: any;
    footerInfo: any;
    navigation: any;
    constructor(
        private authService: AuthService,
        private templateService: HomeTemplateApiService,
    ) {
        authService.getCurrentSite().subscribe(site => this.site = site);
    }

    ngOnInit() {
        // this.itemConfig.moduleType == 'LOGO' ? this.loadLogoInfo() : this.loadFooterInfo();
    }
    ngOnChanges() {
        this.itemConfig.moduleType == 'LOGO' ? this.loadLogoInfo() : this.loadFooterInfo();
    }
    loadLogoInfo() {
        // tslint:disable-next-line:no-unused-expression
        this.itemConfig && this.templateService.getLogoInfo(this.itemConfig.id).subscribe(
            obj => {
                this.logoInfo = obj.moduleObject;
                // 排序
                obj.navigation.sort((a, b) => a.displayOrder - b.displayOrder);
                this.navigation = obj.navigation;
                this.templateService.configInfoAll.forEach(e => {
                    if (e.id == this.itemConfig.id) {
                        e.itemInfo = obj.moduleObject;
                        e.navigation = obj.navigation;
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
    loadFooterInfo() {
        // tslint:disable-next-line:no-unused-expression
        this.itemConfig && this.templateService.getFooterInfo(this.templateId).subscribe(
            obj => {
                this.footerInfo = obj;
                this.templateService.configInfoAll.forEach(e => {
                    if (e.id == this.itemConfig.id) {
                        e.itemInfo = obj;
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
