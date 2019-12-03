import { CodeStrategyFormComponent } from './public/code-strategy-form/code-strategy-form.component';
import { StrategyModule } from 'app/learning/strategy/strategy.module';
import { SystemPublicModule } from './public/system-public.module';
import { NoticeBoxModule } from './../public-suite/notice-box/notice-box.module';
import { SharedModule } from './../shared/shared.module';
import { UserLookupService } from './service/user-lookup.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleuiModule } from 'console-ui-ng';
import { SystemRoutingModule, routedComponents } from './system-routing.module';
import { UserService } from './service/user.service';
import { UserGroupService } from './service/user-group.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './service/role.service';
import { PrivilegeService } from './service/privilege.service';
import { LogicGroupService } from './service/logic-group.service';
import { PermissionService } from './service/permission.service';
import { UserGroupActivedResolver } from './service/user-group-actived-resolver.service';
import { UserGroupDetailResolver } from './service/user-group-detail-resolver.service';
import { SiteService } from './service/site.service';
import { ContentServerService } from "app/system/service/content-server.service";
import { ContentServerDetailResolver } from "app/system/service/content-server-detail-resolver.service";
import { UserTypesService } from "./service/user-types.service";
import { SiteFormComponent } from './views/site-form/site-form.component';
import { LogicGroupUserService } from './service/logic-group-user.service';
import { CodeStrategyService } from './service/code-strategy-service';
import { CodeStrategyComponent } from './strategy/views/code-strategy/code-strategy.component';
import { SystemMessageBoxService } from 'app/system/service/system-message-box-service';
import { TrainingClassMessageApiService } from '../training/service/training-class-message.service';
import { UserChinaLifeService } from './service/user-china-life.service';
import { FeeTypeService } from 'app/system/service/fee-type-service';
import { FeeTypeComponent } from './strategy/views/fee-type/fee-type.component';
import {ManualCallInterfaceService} from "./service/manual-call-interface.service";


const COMPONENTS = [
    SiteFormComponent,
    CodeStrategyComponent,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ConsoleuiModule,
        SystemPublicModule,
        SystemRoutingModule,
        NoticeBoxModule,
        StrategyModule,
    ],
    declarations: [...routedComponents, ...COMPONENTS],
    providers: [
        UserService,
        UserGroupService,
        RoleService,
        PrivilegeService,
        LogicGroupService,
        LogicGroupUserService,
        PermissionService,
        UserGroupActivedResolver,
        UserGroupDetailResolver,
        SiteService,
        ContentServerService,
        ContentServerDetailResolver,
        UserLookupService,
        UserTypesService,
        CodeStrategyService,
        SystemMessageBoxService,
        TrainingClassMessageApiService,
        UserChinaLifeService,
        FeeTypeService,
      ManualCallInterfaceService
    ],
    exports: [FeeTypeComponent]
})
export class SystemModule { }
