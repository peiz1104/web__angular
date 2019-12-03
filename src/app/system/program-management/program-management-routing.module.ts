import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProgramManagementGroupComponent} from "./views/program-management-group/program-management-group.component";
import {ProgramManagermentResolverService} from "./service/program-managerment-resolver.service";
import {ProgramManagermentGuardService} from "./service/program-managerment-guard.service";
import {ProgramManagermentComponent} from "./views/program-managerment/program-managerment.component";
import {ProgramManagementAddComponent} from "./views/program-management-add/program-management-add.component";
import {ProgrammanagementEditComponent} from "./views/programmanagement-edit/programmanagement-edit.component";


const routes: Routes = [
  {
    path: '',
    resolve: {
      programManagementGroup: ProgramManagermentResolverService
    },
    component: ProgramManagementGroupComponent
  },
 {
    path: ':identifier',
    resolve: {
      programmanagementGroup: ProgramManagermentResolverService
    },
    canActivate: [ProgramManagermentGuardService],
    component: ProgramManagementGroupComponent,
    children: [
      {path: '', children: [
        { path: '', redirectTo: 'list', pathMatch: 'full'},
        { path: 'list', component: ProgramManagermentComponent },
        { path: 'add',  component: ProgramManagementAddComponent },
         { path: ':id/edit',  component: ProgrammanagementEditComponent}
      ]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProgramManagermentResolverService, ProgramManagermentGuardService]
})
export class ProgramManagementRoutingModule { }

export const routedComponents = [ProgramManagementGroupComponent];
