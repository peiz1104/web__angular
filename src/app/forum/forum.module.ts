import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';
import { ForumRoutingModule, routedComponents} from './forum-routing.module';
import { SystemForumModule } from './system-forum/system-forum.module';

@NgModule({
  imports: [
    ForumRoutingModule,
    SharedModule,
    SystemForumModule,
  ],
})
export class ForumModule { }
