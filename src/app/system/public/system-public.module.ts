import { AuthzModule } from './../../shared/authz/authz.modult';
import { RouterModule } from '@angular/router';
import { WidgetModule } from './../../shared/widget/widget.module';
import { UserGroupFormComponent } from './user-group-form/user-group-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UgLookupComponent } from './ug-lookup/ug-lookup.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { PrivilegeFormControlComponent } from './privilege-form-control/privilege-form-control.component';
import { ContentServerFormComponent } from './content-server-form/content-server-form.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ConsoleuiModule } from 'console-ui-ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';
import { UserGroupService } from './../service/user-group.service';
import { UserService } from './../service/user.service';
import { NgModule } from '@angular/core';
import { CodeStrategyFormComponent } from './code-strategy-form/code-strategy-form.component';
import { UserFormNewComponent } from './user-form-new/user-form-new.component';


export const SYSTEM_PUBLIC_COMPONENTS = [
    ContentServerFormComponent,
    PrivilegeFormControlComponent,
    RoleFormComponent,
    UgLookupComponent,
    UserFormComponent,
    UserGroupFormComponent,
    CodeStrategyFormComponent,
    UserFormNewComponent
];

export const SYSTEM_PUBLIC_SERVICES = [
    UserService,
    UserGroupService,
    // AuthService
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ConsoleuiModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        WidgetModule,
        RouterModule,
        AuthzModule,
    ],
    declarations: [...SYSTEM_PUBLIC_COMPONENTS],
    exports: [...SYSTEM_PUBLIC_COMPONENTS],
    providers: [...SYSTEM_PUBLIC_SERVICES],
})
export class SystemPublicModule { }
