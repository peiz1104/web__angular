import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinessEntityDetailResolver} from "../attribute/service/business-entity-detail-resolver.service";
import {TypeManagementListComponent} from "./view/type-management-list/type-management-list.component";
import {AddTypeManagementComponent} from "app/system/type-management/view/add-type-management/add-type-management.component";
import {EditTypeManagementComponent} from "app/system/type-management/view/edit-type-management/edit-type-management.component";

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TypeManagementListComponent},
  { path: 'addtypemanagement', component: AddTypeManagementComponent},
  { path: ':id/edit', component: EditTypeManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BusinessEntityDetailResolver]
})
export class TypeManagementModuleRoutingModule { }


export const routedComponents = [
];
