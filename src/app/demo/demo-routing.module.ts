import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticeComponent } from './practice/practice.component';

const route: Routes = [
  { path: 'pratice', component: PracticeComponent }
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class DemoRoutingModule { };

export const routesComponent = [PracticeComponent];
