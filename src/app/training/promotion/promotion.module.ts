import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PromotionRoutingModule} from "./promotion-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { ProposedpromotionComponent } from './proposedpromotion/proposedpromotion.component';
import { HaspromotionComponent } from './haspromotion/haspromotion.component';
import {PromotionService} from "../service/promotion.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PromotionRoutingModule
  ],
  declarations: [ProposedpromotionComponent, HaspromotionComponent],
  providers: [PromotionService]
})
export class PromotionModule { }
