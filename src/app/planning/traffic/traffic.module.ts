import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { TrafficComponent } from './traffic.component'
import { TrafficService } from './traffic.service'

const routes: Routes = [
    {
        path: '', component: TrafficComponent,
    },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    // tslint:disable-next-line:max-line-length
    declarations: [
        TrafficComponent
    ],
    providers: [
        TrafficService
    ],
})
export class TrafficModule { }
