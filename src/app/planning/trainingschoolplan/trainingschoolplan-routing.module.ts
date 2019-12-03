import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingschoolplanListComponent } from './views/trainingschoolplan-list/trainingschoolplan-list.component';
import { TrainingSchoolPlanViewComponent } from './views/trainingschoolplan-view/trainingschoolplan-view.component';
import { TrainingSchoolPlanService } from './service/trainingschoolplan.service';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: TrainingschoolplanListComponent
  },
  {
    path: ':id', component: TrainingSchoolPlanViewComponent, resolve: { trainingSchoolPlan: TrainingSchoolPlanService },
    children: [
      {
        path: '', children: [
          { path: '', redirectTo: 'view', pathMatch: 'full' },
          { path: 'view', component: TrainingSchoolPlanViewComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingschoolPlanRoutingModule { }

export const routedComponents = [TrainingschoolplanListComponent];
