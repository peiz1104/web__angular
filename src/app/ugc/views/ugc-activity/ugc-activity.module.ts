import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { UgcActivityRoutingModule, routedComponents} from "./ugc-activity-routing.module";
import { SharedModule } from 'app/shared';
import { UgcPublicModule } from '../../public/public.mode';
import { OfferingModule } from 'app/learning/offering/offering.module';
import { NoticeBoxModule } from '../../../public-suite/notice-box/notice-box.module';
@NgModule({
    imports: [

        SharedModule,
        UgcPublicModule,
        UgcActivityRoutingModule,
        OfferingModule,
        NoticeBoxModule
    ],
    declarations: [...routedComponents]
})
export class UgcActivityModule { }
