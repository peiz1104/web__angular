import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';
import { AssistHomeComponent } from './assist-home.component';
import { RouterModule, Routes } from '@angular/router';
import { AssistTbcListComponent } from './assist-tbc-list/assist-tbc-list.component';
import { AssistHomeApiService } from './assist-home-api.service';
import { AssistExamListComponent } from './assist-exam-list/assist-exam-list.component';

const routes: Routes = [
  { path: '', component: AssistHomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AssistHomeComponent,
    AssistTbcListComponent,
    AssistExamListComponent
  ],
  exports: [
    AssistHomeComponent
  ],
  providers: [
    AssistHomeApiService
  ]
})
export class AssistHomeModule { }
