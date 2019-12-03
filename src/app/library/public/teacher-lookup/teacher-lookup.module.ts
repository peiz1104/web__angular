import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ConsoleuiModule } from 'console-ui-ng';
import { SharedModule } from 'app/shared';
import { FormsModule } from '@angular/forms';
import { TeacherLookupComponent } from './teacher-lookup.component';
import { TeacherService } from '../../service/teacher.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ConsoleuiModule,
        FormsModule,
        SharedModule
    ],
    declarations: [TeacherLookupComponent],
    exports: [TeacherLookupComponent],
    providers: [TeacherService]
})
export class TeacherLookupModule { }
