import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingSchoolListComponent } from './views/trainingschool-list/trainingschool-list.component';
import { TrainingSchoolAddComponent } from './views/trainingschool-add/trainingschool-add.component';
import { TrainingSchoolEditComponent } from './views/trainingschool-edit/trainingschool-edit.component';
import { TrainingSchoolService } from './service/trainingschool.service';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: TrainingSchoolListComponent
  },
  { path: 'add', component: TrainingSchoolAddComponent },
  { path: ':id/inner', loadChildren: 'app/planning/trainingschool/innergroup/innergroup.module#InnerGroupModule' },
  {
    path: ':id', component: TrainingSchoolEditComponent, resolve: { trainingSchool: TrainingSchoolService },
    children: [
      {
        path: '', children: [
          { path: '', redirectTo: 'edit', pathMatch: 'full' },
          { path: 'edit', component: TrainingSchoolEditComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingSchoolRoutingModule { }

export const routedComponents = [TrainingSchoolListComponent];
