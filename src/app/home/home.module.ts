import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ConsoleuiModule } from 'console-ui-ng';
import { HomeTemplateListComponent } from './views/home-template-list/home-template-list.component';
import { HomeRoutingModule } from 'app/home/home-routing.module';
import { HomeTemplateApiService } from 'app/home/services/home-template-api.service';
import { HomeTemplateEditComponent } from './views/home-template-edit/home-template-edit.component';
import { HomeTemplateModulesComponent } from './views/home-template-modules/home-template-modules.component';
import { HomeTemplateColumnComponent } from './views/home-template-column/home-template-column.component';
import { HomeTemplateConfigLogoComponent } from './views/home-template-config-logo/home-template-config-logo.component';
import { HomeTemplateConfigBannerComponent } from './views/home-template-config-banner/home-template-config-banner.component';
import { HomeTemplateConfigArticleComponent } from './views/home-template-config-article/home-template-config-article.component';
import { HomeTemplateColumnBannerComponent } from './views/home-template-column-banner/home-template-column-banner.component';
import { HomeTemplateColumnArticleComponent } from './views/home-template-column-article/home-template-column-article.component';
import { HomeTemplateConfigFooterComponent } from './views/home-template-config-footer/home-template-config-footer.component';
import { HomeTemplateConfigCourseComponent } from './views/home-template-config-course/home-template-config-course.component';
import { HomeTemplateColumnCourseComponent } from './views/home-template-column-course/home-template-column-course.component';
import { HomeTemplateColumnLectuerComponent } from './views/home-template-column-lectuer/home-template-column-lectuer.component';
import { HomeTemplateConfigLectuerComponent } from './views/home-template-config-lectuer/home-template-config-lectuer.component';
import { HomeTemplateDefaultboxComponent } from './views/home-template-defaultbox/home-template-defaultbox.component';
import { HomeTemplateColumnAllcourseComponent } from './views/home-template-column-allcourse/home-template-column-allcourse.component';
import { HomeTemplateColumnNoticeComponent } from './views/home-template-column-notice/home-template-column-notice.component';
import { HomeTemplateColumnBannernewComponent } from './views/home-template-column-bannernew/home-template-column-bannernew.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ConsoleuiModule
  ],
  declarations: [
    HomeTemplateListComponent,
    HomeTemplateEditComponent,
    HomeTemplateModulesComponent,
    HomeTemplateColumnComponent,
    HomeTemplateConfigLogoComponent,
    HomeTemplateConfigBannerComponent,
    HomeTemplateConfigArticleComponent,
    HomeTemplateColumnBannerComponent,
    HomeTemplateColumnArticleComponent,
    HomeTemplateConfigFooterComponent,
    HomeTemplateConfigCourseComponent,
    HomeTemplateColumnCourseComponent,
    HomeTemplateColumnLectuerComponent,
    HomeTemplateConfigLectuerComponent,
    HomeTemplateDefaultboxComponent,
    HomeTemplateColumnAllcourseComponent,
    HomeTemplateColumnNoticeComponent,
    HomeTemplateColumnBannernewComponent
  ],
  providers: [
    HomeTemplateApiService
  ]
})
export class HomeModule { }
