import { PortalBannerApiService } from './service/portal-banner-api.service';
import { NewsGroupApiService } from './service/news-group-api.service';
import { NewsArticleApiService } from './service/news-article-api.service';
import { PortalPublicModule } from './public/portal-publict.module';
import { PortalRoutingModule, routedComponents } from './portal-routing.module';
import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalNewsViewComponent } from './views/portal-news-view/portal-news-view.component';
import { PortalFooterEditComponent } from './views/portal-footer-edit/portal-footer-edit.component';
import { PortalFooterApiService } from './service/portal-footer-api.service';


@NgModule({
  imports: [
    SharedModule,
    PortalRoutingModule,
    PortalPublicModule
  ],
  declarations: [...routedComponents, PortalNewsViewComponent, PortalFooterEditComponent],
  entryComponents: [PortalNewsViewComponent],
  providers: [
    NewsArticleApiService,
    NewsGroupApiService,
    PortalBannerApiService,
    PortalFooterApiService
  ]
})
export class PortalModule { }
