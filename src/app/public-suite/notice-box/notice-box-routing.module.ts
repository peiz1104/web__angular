import { NoticeBoxComponent } from './views/notice-box/notice-box.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', component: NoticeBoxComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeBoxRoutingModule { }

export const routedComponents = [NoticeBoxComponent];
