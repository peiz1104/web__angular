import { CodeStrategyFormComponent } from './public/code-strategy-form/code-strategy-form.component';
// tslint:disable-next-line:max-line-length
import { UserGroupStrategyAddComponent } from './strategy/views/user-group-strategy/user-group-strategy-add/user-group-strategy-add.component';
import { SiteStrategyAddComponent } from './strategy/views/site-strategy/site-strategy-add/site-strategy-add.component';
import { SystemMessageBoxComponent } from './views/system-message-box/system-message-box.component';
import { UserGroupWizardComponent } from './views/user-group-wizard/user-group-wizard.component';
import { RoleEditComponent } from './views/role-edit/role-edit.component';
import { SysSettingComponent } from './views/sys-setting/sys-setting.component';
import { SystemNoticeBoxComponent } from './views/system-notice-box/system-notice-box.component';
import { CategoryGroupService } from './category/service/category-group.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemIndexComponent } from './views/system-index/system-index.component';
import { UserListComponent } from './views/user-list/user-list.component';
import { UserGroupComponent } from './views/user-group/user-group.component';
import { UserAddComponent } from './views/user-add/user-add.component';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { RoleListComponent } from './views/role-list/role-list.component';
import { RoleAddComponent } from './views/role-add/role-add.component';
import { LogicGroupListComponent } from './views/logic-group-list/logic-group-list.component';
import { LogicGroupEditComponent } from './views/logic-group-edit/logic-group-edit.component';
import { LogicGroupAddComponent } from './views/logic-group-add/logic-group-add.component';
import { UserImportWizardComponent } from './views/user-import-wizard/user-import-wizard.component';
import { PermissionListComponent } from './views/permission-list/permission-list.component';
import { PermissionAddComponent } from './views/permission-add/permission-add.component';
import { UserGroupAddComponent } from './views/user-group-add/user-group-add.component';

import { UserGroupEditComponent } from './views/user-group-edit/user-group-edit.component';
import { UserGroupActivedResolver } from './service/user-group-actived-resolver.service';
import { UserGroupDetailResolver } from './service/user-group-detail-resolver.service';
import { SiteInfoComponent } from './views/site-info/site-info.component';
import { ContentServerListComponent } from "app/system/views/content-server-list/content-server-list.component";
import { ContentServerAddComponent } from "app/system/views/content-server-add/content-server-add.component";
import { ContentServerEditComponent } from "app/system/views/content-server-edit/content-server-edit.component";
import { ContentServerDetailResolver } from "app/system/service/content-server-detail-resolver.service";
import { SiteManageComponent } from './views/site-manage/site-manage.component';
import { LogicGroupLookupFormComponent } from './public/logic-group-lookup-form/logic-group-lookup-form.component';
import { CodeStrategyComponent } from './strategy/views/code-strategy/code-strategy.component';
import { SiteStrategyListComponent } from './strategy/views/site-strategy/site-strategy-list.component';
import { UserGroupStrategyListComponent } from './strategy/views/user-group-strategy/user-group-strategy-list.component';
import { SystemMessageBoxAddComponent } from 'app/system/views/system-message-box-add/system-message-box-add.component';
import { UserManageIndexComponent } from './views/user-manage-index/user-manage-index.component';
import { UserGroupManageIndexComponent } from './views/user-group-manage-index/user-group-manage-index.component';

import { UserImportChinaLifeComponent } from './views/user-import-china-life/user-import-china-life.component';
import { UserAddChinaLifeComponent } from './views/user-add-china-life/user-add-china-life.component';
import { UserEditChinaLifeComponent } from './views/user-edit-china-life/user-edit-china-life.component';
import { UserListNewComponent } from './views/user-list-new/user-list-new.component';
import { StrategyIndexComponent } from './strategy/views/strategy-index/strategy-index.component';
// tslint:disable-next-line:max-line-length
import { UserGroupStrategyIndexComponent } from './strategy/views/user-group-strategy/user-group-strategy-index/user-group-strategy-index.component';
import { UserGroupStrategyEditComponent } from './strategy/views/user-group-strategy/user-group-strategy-edit/user-group-strategy-edit.component';
import { SiteStrategyEditComponent } from './strategy/views/site-strategy/site-strategy-edit/site-strategy-edit.component';
import { FeeTypeComponent } from './strategy/views/fee-type/fee-type.component';
import { ManualCallInterfaceComponent } from "./manual-call-interface/manual-call-interface.component";
import { ReportformComponent } from './reportform/reportform.component';

const routes: Routes = [
    {
        path: '', component: UserGroupManageIndexComponent, children: [
            {
                path: 'userGroup', children: [
                    { path: '', component: UserGroupComponent, resolve: { activedGroup: UserGroupActivedResolver } },
                    { path: 'add', component: UserGroupAddComponent, resolve: { activedGroup: UserGroupActivedResolver } },
                    { path: 'import', component: UserGroupWizardComponent },
                    // { path: ':userGroupId/detail', component: UserGroupComponent },
                    {
                        path: ':userGroupId/edit', component: UserGroupEditComponent,
                        resolve: { activedGroup: UserGroupActivedResolver, userGroup: UserGroupDetailResolver }
                    },
                ]
            },
        ]
    },
    {
        path: 'user', component: UserManageIndexComponent, children: [
            { path: 'list', component: UserListNewComponent },
            { path: 'add', component: UserAddComponent },
            { path: 'import-wizard', component: UserImportWizardComponent },
            { path: 'addchinalife', component: UserAddChinaLifeComponent },
            { path: 'importchinalife', component: UserImportChinaLifeComponent },
            { path: ':userId/editchinalife', component: UserEditChinaLifeComponent },
            { path: ':userId/edit', component: UserEditComponent }
        ]
    },

    {
        path: 'logicGroup', children: [
            { path: '', component: LogicGroupListComponent },
            { path: 'add', component: LogicGroupAddComponent },
            { path: ':logicGroupId/edit', component: LogicGroupEditComponent }
        ]
    },
    {
        path: 'role', children: [
            { path: '', component: RoleListComponent },
            { path: 'add', component: RoleAddComponent },
            { path: ':roleId/edit', component: RoleEditComponent }
        ]
    },
    {
        path: 'permission', children: [
            { path: '', component: PermissionListComponent },
            { path: 'add', component: PermissionAddComponent },
            { path: ':id/edit', component: PermissionAddComponent }
        ]
    },
    {
        path: 'site', children: [
            { path: 'info', component: SiteInfoComponent },
            { path: 'manage', component: SiteManageComponent },
            {
                path: 'message', children: [
                    { path: '', component: SystemMessageBoxComponent },
                    { path: ':messageBoxId/add', component: SystemMessageBoxAddComponent },
                ]
            },
        ]
    },
    {
        path: 'category', loadChildren: 'app/system/category/category.module#CategoryModule'
    },
    {
        path: 'category-group', loadChildren: 'app/system/category/category.module#CategoryModule'
    },
    {
        path: 'cert-type', loadChildren: 'app/system/cert-type/cert-type.module#CertTypeModule'
    },
    {
        path: 'code', component: CodeStrategyComponent
    },
    {
        path: 'server', children: [
            { path: '', component: ContentServerListComponent },
            { path: 'add', component: ContentServerAddComponent },
            { path: ':serverId/edit', component: ContentServerEditComponent, resolve: { server: ContentServerDetailResolver } }
        ]
    },
    // {
    //     path: 'strategy', children: [
    //         { path: '', component: StrategyDetailComponent },
    //         { path: 'site/add', component: SiteStrategyAddComponent },
    //         { path: ':uid/add', component: UserGroupStrategyAddComponent },
    //         { path: ':id/edit', component: SiteStrategyEditComponent }
    //     ]
    // },
    {
        path: 'server', children: [
            { path: '', component: ContentServerListComponent },
            { path: 'add', component: ContentServerAddComponent },
            { path: ':serverId/edit', component: ContentServerEditComponent, resolve: { server: ContentServerDetailResolver } }
        ]
    },
    {
        path: 'strategy', component: StrategyIndexComponent, children: [
            {
                path: 'userGroup', component: UserGroupStrategyIndexComponent, children: [
                    { path: 'list', component: UserGroupStrategyListComponent },
                    { path: 'add', component: UserGroupStrategyAddComponent },
                    { path: ':id/edit', component: UserGroupStrategyEditComponent }
                ]
            },
            {
                path: 'site', children: [
                    { path: 'list', component: SiteStrategyListComponent },
                    { path: 'add', component: SiteStrategyAddComponent },
                    { path: ':id/edit', component: SiteStrategyEditComponent }
                ]
            }
        ]
    },
    {
        path: 'notice-box', component: SystemNoticeBoxComponent
    },
    {
        path: 'setting', component: SysSettingComponent, children: [
            { path: 'attribute', loadChildren: 'app/system/attribute/attribute.module#AttributeModule' }
        ]

    },
    {
        path: 'program-management', loadChildren: 'app/system/program-management/program-management.module#ProgramManagementModule'
    },
    {
        path: 'applicable-objects', loadChildren: 'app/system/applicable-objects/applicable-objects.module#ApplicableObjectsModule'
    },
    {
        path: 'type-management', loadChildren: 'app/system/type-management/type-management.module#TypeManagementModule'
    },
    {
        path: 'manual-call-interface', component: ManualCallInterfaceComponent
    },
    {
        path: 'reportform', component: ReportformComponent
    }

];
/*  {
    path: 'program-management-group', loadChildren: 'app/system/program-management/program-management.module#ProgramManagementModule'
  },*/

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CategoryGroupService]
})
export class SystemRoutingModule { }

export const routedComponents = [
    SystemIndexComponent,
    UserListComponent,
    UserGroupComponent,
    UserAddComponent,
    UserEditComponent,
    RoleListComponent,
    RoleAddComponent,
    LogicGroupListComponent,
    LogicGroupEditComponent,
    LogicGroupAddComponent,
    UserImportWizardComponent,
    PermissionAddComponent,
    PermissionListComponent,
    UserGroupAddComponent,
    UserGroupEditComponent,
    SiteInfoComponent,
    ContentServerListComponent,
    ContentServerEditComponent,
    ContentServerAddComponent,
    SystemNoticeBoxComponent,
    SysSettingComponent,
    RoleEditComponent,
    UserGroupWizardComponent,
    SiteManageComponent,
    LogicGroupLookupFormComponent,
    SiteStrategyAddComponent,
    UserGroupStrategyAddComponent,
    SiteStrategyEditComponent,
    SiteStrategyListComponent,
    UserGroupStrategyListComponent,
    UserManageIndexComponent,
    UserGroupManageIndexComponent,
    UserImportChinaLifeComponent,
    UserAddChinaLifeComponent,
    UserEditChinaLifeComponent,
    UserListNewComponent,
    StrategyIndexComponent,
    UserGroupStrategyIndexComponent,
    UserGroupStrategyEditComponent,
    SystemMessageBoxComponent,
    SystemMessageBoxAddComponent,
    FeeTypeComponent,
    ManualCallInterfaceComponent,
    ReportformComponent
];
