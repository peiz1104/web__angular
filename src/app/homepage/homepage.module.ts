import { HomepageRoutingModule } from './homepage-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage.component'
import { SharedModule } from 'app/shared';
// import { ConsoleuiModule } from 'console-ui-ng';
import { LayoutModule } from '../core/layout/layout.module';
@NgModule({
    declarations: [
        HomepageComponent,
    ],
    imports: [
        CommonModule,
        HomepageRoutingModule,
        LayoutModule,
        SharedModule
    ],
    providers: [],
    bootstrap: []
})
export class HomePageMoudle { }
