import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { BannerBoxComponent } from './views/banner-box/banner-box.component';
import { BannerListComponent } from './views/banner-list/banner-list.component';
import { BannerBoxService } from './service/banner-box.service';
import { BannerService } from './service/banner.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [BannerListComponent, BannerBoxComponent],
    exports: [BannerBoxComponent],
    providers: [BannerBoxService, BannerService]
})
export class BannerBoxModule { }
