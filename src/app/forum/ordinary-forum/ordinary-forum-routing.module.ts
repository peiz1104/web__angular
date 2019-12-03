import { ImpeachComponent } from './views/impeach/impeach.component';
import { TopicListComponent } from './views/topic/topic-list/topic-list.component';
import { BoardEditComponent } from './views/board/board-edit/board-edit.component';
import { BoardListComponent } from './views/board/board-list/board-list.component';
import { OrdinaryForumComponent } from './ordinary-forum.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdinaryBasicSettingComponent } from './views/forum/ordinary-basic-setting/ordinary-basic-setting.component';

const routes: Routes = [
  {
    path: '', component: OrdinaryForumComponent, children: [
      {
        path: '', children: [
          { path: '', component: BoardListComponent },
          { path: 'basicInfo', component: OrdinaryBasicSettingComponent },
          { path: 'topic/:boardId', component: TopicListComponent },
          { path: 'impeach', component: ImpeachComponent }
          // { path: 'materials', component: CourseMaterialComponent },
          // { path: 'strategy', component: CourseStrategyComponent}
        ]
      }
    ]
  },
  { path: ':boardId', component: BoardEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdinaryForumRoutingModule { }

export const routedComponents = [
  OrdinaryForumComponent,
  BoardListComponent,
  BoardEditComponent,
  OrdinaryBasicSettingComponent,
  TopicListComponent,
  ImpeachComponent,
];


