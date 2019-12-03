import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemBasicSettingComponent } from './views/system-basic-setting/system-basic-setting.component';
import { NonliceWordComponent } from './views/nonlice-word/nonlice-word.component';
import { SiteForumComponent } from './views/site-forum/site-forum.component';
import { ForumDetailResolver } from './service/site-forum-detail-resolver.service';
import { SystemImpeachComponent } from './views/system-impeach/system-impeach.component';

const routes: Routes = [
  { path: 'base-setting', component: SystemBasicSettingComponent },
  {
    path: 'siteForum', component: SiteForumComponent, resolve: { siteForum: ForumDetailResolver },
    children: [
      // tslint:disable-next-line:max-line-length
      { path: '', loadChildren: 'app/forum/ordinary-forum/ordinary-forum.module#OrdinaryForumModule', resolve: { forum: ForumDetailResolver }, },
    ]
  },
  { path: 'impeach', component: SystemImpeachComponent },
  { path: 'nonlicetWord', component: NonliceWordComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ForumDetailResolver,
  ]
})
export class SystemForumRoutingModule { }

export const routedComponents = [
  SystemBasicSettingComponent,
  NonliceWordComponent,
  SiteForumComponent,
  SystemImpeachComponent
];


