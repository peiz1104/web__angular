import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingLevelListComponent } from './views/training-level-list/training-level-list.component';
import { TrainingLevelAddComponent } from './views/training-level-add/training-level-add.component';
import { TrainingLevelEditComponent } from './views/training-level-edit/training-level-edit.component';
import { TrainingLevelService } from './service/training-level.service';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: TrainingLevelListComponent
  },
  { path: 'add', component: TrainingLevelAddComponent },
  {
    path: ':id', component: TrainingLevelEditComponent, resolve: { trainingLevel: TrainingLevelService },
    children: [
      {
        path: '', children: [
          { path: '', redirectTo: 'edit', pathMatch: 'full' },
          { path: 'edit', component: TrainingLevelEditComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingLevelRoutingModule { }

export const routedComponents = [TrainingLevelListComponent];
