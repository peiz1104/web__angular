import { NgModule } from '@angular/core';
import { ResearchplanComponent } from './researchplan.component';
import { Routes, RouterModule } from '@angular/router';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: ResearchplanComponent }
];
@NgModule({
    imports: [
        SharedModule,
        SystemPublicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ResearchplanComponent]
})
export class ResearchplanModule { }
