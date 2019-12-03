import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectRoutingModule, routedComponents } from './subject-routing.module';
import { NoticeBoxModule } from '../public-suite/notice-box/notice-box.module';
import { BannerBoxModule } from '../public-suite/banner-box/banner-box.module';

@NgModule({
  imports: [
    CommonModule,
    SubjectRoutingModule,
    NoticeBoxModule,
    BannerBoxModule
  ],
  declarations: [...routedComponents]
})
export class SubjectModule { }
