import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignatedPlanListComponent } from './views/designatedplan-list/designatedplan-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: DesignatedPlanListComponent
  },
  { path: ':id', loadChildren: 'app/planning/designatedplan/trainingplan/trainingplan.module#TrainingPlanModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignatedPlanRoutingModule { }

export const routedComponents = [DesignatedPlanListComponent];
