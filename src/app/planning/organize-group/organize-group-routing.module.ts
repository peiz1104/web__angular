import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizeGroupListComponent } from './views/organize-group-list/organize-group-list.component';
import { OrganizeGroupAddComponent } from './views/organize-group-add/organize-group-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: OrganizeGroupListComponent },
  { path: 'add/:id', component: OrganizeGroupAddComponent },
  { path: 'add', component: OrganizeGroupAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizeGroupRoutingModule { }

// export const routedComponents = [OrganizeGroupComponent];
