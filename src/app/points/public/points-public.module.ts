
import { RouterModule } from '@angular/router';
import { MallAddFormComponent } from './mall-form/mall-add-form.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ConsoleuiModule } from 'console-ui-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';

import { NgModule } from '@angular/core';


export const POINTS_PUBLIC_COMPONENTS = [
    MallAddFormComponent
];

// export const SYSTEM_PUBLIC_SERVICES = [
//     UserService,
//     UserGroupService,
//     // AuthService
// ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ConsoleuiModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
     //  WidgetModule,
        RouterModule,
      //  AuthzModule,
    ],
    declarations: [...POINTS_PUBLIC_COMPONENTS],
    exports: [...POINTS_PUBLIC_COMPONENTS],
   
})
export class PointsPublicModule { }
