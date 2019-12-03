import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingPlanListComponent } from './views/trainingplan-list/trainingplan-list.component';
import { TrainingPlanAddComponent } from './views/trainingplan-add/trainingplan-add.component';
import { TrainingPlanEditComponent } from './views/trainingplan-edit/trainingplan-edit.component';
import { TrainingPlanViewComponent } from './views/trainingplan-view/trainingplan-view.component';
import { TrainingPlanImportComponent } from './views/trainingplan-import/trainingplan-import.component';
import { TrainingPlanCopyComponent } from './views/trainingplan-copy-lastYear/lastyearplan-list.component';
import { TrainingPlanService } from './service/trainingplan.service';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: TrainingPlanListComponent
  },
  { path: 'add', component: TrainingPlanAddComponent },
  { path: 'import', component: TrainingPlanImportComponent },
  { path: 'copy', component: TrainingPlanCopyComponent },
  {
    path: ':id/:planType', resolve: { trainingPlan: TrainingPlanService },
    children: [
      {
        path: '', children: [
          { path: '', redirectTo: 'edit', pathMatch: 'full' },
          { path: 'edit', component: TrainingPlanEditComponent },
          { path: 'view', component: TrainingPlanViewComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPlanRoutingModule { }

export const routedComponents = [TrainingPlanListComponent];
