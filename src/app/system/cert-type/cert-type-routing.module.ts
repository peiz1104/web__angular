import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertTypeListComponent } from "./views/cert-type-list/cert-type-list.component";
import { CertTypeAddComponent } from "./views/cert-type-add/cert-type-add.component";
import { CertTypeEditComponent } from 'app/system/cert-type/views/cert-type-edit/cert-type-edit.component';
const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CertTypeListComponent },
  { path: 'add', component: CertTypeAddComponent },
  { path: ':id/edit', component: CertTypeEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertTypeRoutingModule { }

export const routedComponents = [];
