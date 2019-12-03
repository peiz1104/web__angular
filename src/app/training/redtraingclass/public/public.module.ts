import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ConsoleuiModule } from 'console-ui-ng';
import { SharedModule } from 'app/shared';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { UserLookupComponent } from './user-lookup/user-lookup.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        ConsoleuiModule,
        SharedModule,
        FormsModule
    ],
    declarations: [UserLookupComponent],
    exports: [UserLookupComponent],
    providers: [ServiceService]
})
export class PublicModule { }
