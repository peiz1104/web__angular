import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplicableObjectsListComponent} from "./view/applicable-objects-list/applicable-objects-list.component";
import {BusinessEntityDetailResolver} from "../attribute/service/business-entity-detail-resolver.service";
import {EntityListComponent} from "../attribute/views/entity-list/entity-list.component";
import {CustomAttributeComponent} from "../attribute/views/custom-attribute/custom-attribute.component";
import {AddApplicableObjectsComponent} from "./view/add-applicable-objects/add-applicable-objects.component";
import {ApplicableObjectsEditComponent} from "./view/applicable-objects-edit/applicable-objects-edit.component";
const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ApplicableObjectsListComponent },
  { path: 'addapplicableobjects', component: AddApplicableObjectsComponent},
  { path: ':id/edit', component: ApplicableObjectsEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BusinessEntityDetailResolver]
})
export class ApplicableObjectsRoutingModule { }


export const routedComponents = [
];
