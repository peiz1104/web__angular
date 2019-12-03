import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared';
import { PlanRoutingModule, routedComponents } from './plain-manege-routing.module'
import { TrainingClassDetailModule } from 'app/training/training-class/training-class-detail.module';
import { TbcPlanApiService } from './service/plan-management-service'

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PlanRoutingModule,
        TrainingClassDetailModule.forAssist()
    ],
    declarations: [...routedComponents],
    providers: [
        TbcPlanApiService
    ]
})
export class PlainmanagentModule { }
