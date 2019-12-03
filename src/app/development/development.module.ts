import { DevelopmentRoutingModule } from './development-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        DevelopmentRoutingModule
    ],
    declarations: [

    ],
    providers: [

    ],
})
export class DevelopmentModule { }
