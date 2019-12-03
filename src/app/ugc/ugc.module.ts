import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UgcRoutingModule, routedComponents } from "./ugc-routing.module";
import { SharedModule } from 'app/shared';
import { NoticeBoxModule } from '../public-suite/notice-box/notice-box.module';
import { UgcPublicModule } from './public/public.mode';
import { SystemModule } from 'app/system/system.module';
@NgModule({
    imports: [
        SharedModule,
        // SystemModule,
        CommonModule,
        NoticeBoxModule,
        UgcRoutingModule,
        UgcPublicModule
    ],
    declarations: [...routedComponents]
})
export class UgcModule { }
