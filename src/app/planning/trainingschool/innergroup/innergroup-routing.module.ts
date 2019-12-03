import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnerGroupListComponent } from './views/innergroup-list/innergroup-list.component';
import { InnerGroupService } from './service/innergroup.service';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: InnerGroupListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InnerGroupRoutingModule { }

export const routedComponents = [InnerGroupListComponent];
