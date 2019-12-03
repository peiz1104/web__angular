import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { Routes, RouterModule } from '@angular/router';
import { HouraudimanagementModule } from '../houraudimanagement/houraudimanagement.module';
import { HouraduiDepartRoutingModule, routedComponents } from './hour-department-routing.module';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SystemPublicModule,
        HouraduiDepartRoutingModule,
        HouraudimanagementModule,
    ],
    declarations: [...routedComponents]
})
export class HourDepartmentModule { }
