import { BasicSettingFormComponent } from './public/basic-setting-form/basic-setting-form.component';
import { SystemForumRoutingModule, routedComponents } from './system-forum-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';
import { NonliceWordComponent } from './views/nonlice-word/nonlice-word.component';
import { SiteForumComponent } from './views/site-forum/site-forum.component';
import { SiteForumApiService } from './service/site-forum.service';
import { SystemForumSettingService } from './service/system-forum-setting.service';
import { NonlicetWordService } from './service/nonlicet-word.service';
import { SystemImpeachComponent } from './views/system-impeach/system-impeach.component';
import { OrdinaryForumModule } from '../ordinary-forum/ordinary-forum.module';

const providersService = [
  SystemForumSettingService,
  NonlicetWordService,
  SiteForumApiService,
];

const Components = [
  BasicSettingFormComponent,
];

@NgModule({
  imports: [
    SystemForumRoutingModule,
    SharedModule,
    OrdinaryForumModule
  ],
  declarations: [...routedComponents, Components, SystemImpeachComponent],
  providers: [providersService],
})

export class SystemForumModule { }

