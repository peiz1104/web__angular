import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ConsoleuiModule } from 'console-ui-ng';
import { SharedModule } from 'app/shared';
import { FormsModule } from '@angular/forms';
import { TeacherLookupComponent } from './teacher-lookup.component';
import { TrainingClassApiService } from '../../../service/training-class-api.service';

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
    providers: [TrainingClassApiService]
})
export class TeacherLookupModule { }
