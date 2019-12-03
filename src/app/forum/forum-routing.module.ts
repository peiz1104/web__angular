import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'systemForum', loadChildren: 'app/forum/system-forum/system-forum.module#SystemForumModule' },
    ]
  }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ForumRoutingModule { }

  export const routedComponents = [
  ];


