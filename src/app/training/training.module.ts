
import { TrainingApiModule } from './service/training-api.module';
import { TrainingRoutingModule } from './training-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionModule } from "./promotion/promotion.module";

@NgModule({
    imports: [
        CommonModule,
        TrainingApiModule,
        TrainingRoutingModule,
        PromotionModule
    ],
    declarations: []
})
export class TrainingModule { }
