import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingClassificationListComponent } from './views/training-classification-list/training-classification-list.component';
import { TrainingClassificationAddComponent } from './views/training-classification-add/training-classification-add.component';
import { TrainingClassificationEditComponent } from './views/training-classification-edit/training-classification-edit.component';
import { TrainingClassificationService } from './service/training-classification.service';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: TrainingClassificationListComponent
  },
  { path: 'add', component: TrainingClassificationAddComponent },
  {
    path: ':id', component: TrainingClassificationEditComponent, resolve: { trainingClassification: TrainingClassificationService },
    children: [
      {
        path: '', children: [
          { path: '', redirectTo: 'edit', pathMatch: 'full' },
          { path: 'edit', component: TrainingClassificationEditComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingClassificationRoutingModule { }

export const routedComponents = [TrainingClassificationListComponent];
