import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared';
import { PublicModule } from './public/public.module';
import { ServiceService } from './service/service.service';

import { RedclassdetailComponent } from './views/redclassdetail/redclassdetail.component';
import { RedpersonlistComponent } from './views/redpersonlist/redpersonlist.component';
import { RedtrainfeeComponent } from './views/redtrainfee/redtrainfee.component';
import { RedtrainscoreComponent } from './views/redtrainscore/redtrainscore.component';
import { RedtrainworkattendanceComponent } from './views/redtrainworkattendance/redtrainworkattendance.component';
import { RedtraincertificateComponent } from './views/redtraincertificate/redtraincertificate.component';
import { RedtrainTrafficComponent } from './views/redtrain-traffic/redtrain-traffic.component';
import { RedclasslistComponent } from './views/redclasslist/redclasslist.component';

const routes: Routes = [
    { path: '', redirectTo: 'redlist', pathMatch: 'full' },
    { path: 'redlist', component: RedclasslistComponent },
    {
        path: ':redId', component: RedclassdetailComponent,
        children: [
            { path: '', redirectTo: 'redpersonlist', pathMatch: 'full' },
            { path: 'redpersonlist', component: RedpersonlistComponent },
            { path: 'redtrainfee', component: RedtrainfeeComponent },
            { path: 'redtrainscore', component: RedtrainscoreComponent },
            { path: 'redtrainworkattendance', component: RedtrainworkattendanceComponent },
            { path: 'redtraincertificate', component: RedtraincertificateComponent },
            { path: 'redtraintraffic', component: RedtrainTrafficComponent }
        ]
    },
]
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PublicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        RedclassdetailComponent,
        RedpersonlistComponent,
        RedtrainfeeComponent,
        RedtrainscoreComponent,
        RedtrainworkattendanceComponent,
        RedtraincertificateComponent,
        RedtrainTrafficComponent,
        RedclasslistComponent
    ],
    providers: [ServiceService]
})
export class RedtraingclassModule { }
