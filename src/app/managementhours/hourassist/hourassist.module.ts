import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { AssistManagementComponent } from './views/assist-management/assist-management.component';
import { HourService } from '../managementservice/hour.service';
const routes: Routes = [
    { path: '', component: AssistManagementComponent }
];
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SystemPublicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [AssistManagementComponent],
    providers: []
})
export class HourassistModule { }
