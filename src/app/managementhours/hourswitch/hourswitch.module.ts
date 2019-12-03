import { NgModule } from '@angular/core';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { SharedModule } from '../../shared/shared.module';
import { HourswitchComponent } from './hourswitch.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: HourswitchComponent, children: [] }
];
@NgModule({
    imports: [
        SharedModule,
        SystemPublicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HourswitchComponent]
})
export class HourswitchModule { }
