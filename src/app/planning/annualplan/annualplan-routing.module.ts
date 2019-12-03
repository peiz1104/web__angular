import { AnnualplanListComponent } from './views/annualplan-list/annualplan-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualplanFormComponent } from './public/annualplan-form/annualplan-form.component';
import { AnnualplanAddComponent } from './views/annualplan-add/annualplan-add.component';
import { AnnualplanDetailComponent } from './views/annualplan-detail/annualplan-detail.component';
import { AnnualplanEditComponent } from './views/annualplan-edit/annualplan-edit.component';
import { AnnualplanDetailResolverService } from './service/annualplan-detail-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: AnnualplanListComponent
  },
  { path: 'add', component: AnnualplanAddComponent },
  { path: ':id/childrenplan', loadChildren: 'app/planning/annualplan/childrenplan/childrenplan.module#ChildrenplanModule' },
  {
    path: ':id', component: AnnualplanDetailComponent, resolve: { annualPlan: AnnualplanDetailResolverService },
    children: [
      { path: 'childrenplan', loadChildren: 'app/planning/annualplan/childrenplan/childrenplan.module#ChildrenplanModule' },
      {
        path: '', children: [
          { path: '',  redirectTo: 'edit', pathMatch: 'full' },
          { path: 'edit', component: AnnualplanEditComponent },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnualPlanRoutingModule { }

export const routedComponents = [AnnualplanListComponent];
