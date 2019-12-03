import { ImpeachService } from './service/impeach.service';
import { OrdinaryForumRoutingModule, routedComponents } from './ordinary-forum-routing.module';
import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from './service/board.service';
import { ForumService } from './service/forum.service';
import { TopicService } from './service/topic.service';
import { BoardEditComponent } from './views/board/board-edit/board-edit.component';
import { BoardListComponent } from './views/board/board-list/board-list.component';
import { OrdinarySettingFormComponent } from './public/ordinary-setting-form/ordinary-setting-form.component';
import { OrdinaryBasicSettingComponent } from './views/forum/ordinary-basic-setting/ordinary-basic-setting.component';
import { OrdinaryForumComponent } from './ordinary-forum.component';
import { TopicListComponent } from './views/topic/topic-list/topic-list.component';
import { TopicFormComponent } from './public/topic-form/topic-form.component';
import { ImpeachComponent } from './views/impeach/impeach.component';
import { ImpeachShowInfoComponent } from './public/impeach-show-info/impeach-show-info.component';
import { BoardSelectComponent } from './public/board-select/board-select.component';

const services = [
  BoardService,
  ForumService,
  TopicService,
  ImpeachService,
]

const components = [
  BoardEditComponent,
  BoardListComponent,
  OrdinarySettingFormComponent,
  OrdinaryBasicSettingComponent,
  OrdinaryForumComponent,
  TopicListComponent,
  OrdinarySettingFormComponent,
  TopicFormComponent,
  ImpeachComponent,
  BoardSelectComponent
]

const exportComponents = [
  ImpeachShowInfoComponent
]

@NgModule({
  imports: [
    SharedModule,
    OrdinaryForumRoutingModule,
  ],
  declarations: [...routedComponents, components, ImpeachShowInfoComponent],
  providers: [services],
  exports: [...exportComponents]
})
export class OrdinaryForumModule { }
