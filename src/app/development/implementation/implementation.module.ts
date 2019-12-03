import { ImplementationComponent } from './implementation.component';
import { ImplementationService } from 'app/development/implementation/service/implementation.service';
import { ImplementationRoutingModule } from './implementation-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        ImplementationRoutingModule
    ],
    // tslint:disable-next-line:max-line-length
    declarations: [
        ImplementationComponent,

    ],
    providers: [
        ImplementationService,
    ],
})
export class ImplementationModule { }
