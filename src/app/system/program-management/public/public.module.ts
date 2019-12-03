import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ConsoleuiModule } from 'console-ui-ng';
import { SharedModule } from 'app/shared';
import { FormsModule } from '@angular/forms';
import {ProgramManagementService} from "../service/program-management.service";
import { ProgramManagementSelectComponent } from './program-management-select/program-management-select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ConsoleuiModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
    ],
    declarations: [ProgramManagementSelectComponent],
    exports: [ProgramManagementSelectComponent],
    providers: [ProgramManagementService]
})
export class PublicModule { }
