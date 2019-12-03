import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelClassificationListComponent } from './views/personnel-classification-list/personnel-classification-list.component';
import { PersonnelClassificationAddComponent } from './views/personnel-classification-add/personnel-classification-add.component';
import { PersonnelClassificationEditComponent } from './views/personnel-classification-edit/personnel-classification-edit.component';
import { PersonnelClassificationService } from './service/personnel-classification.service';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: PersonnelClassificationListComponent
  },
  { path: 'add', component: PersonnelClassificationAddComponent },
  {
    path: ':id', component: PersonnelClassificationEditComponent, resolve: { personnelClassification: PersonnelClassificationService },
    children: [
      {
        path: '', children: [
          { path: '', redirectTo: 'edit', pathMatch: 'full' },
          { path: 'edit', component: PersonnelClassificationEditComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonnelClassificationRoutingModule { }

export const routedComponents = [PersonnelClassificationListComponent];
