import { COURSE_API_SERVICES } from './course/service/index';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { LearningRoutingModule } from './learning-routing.module';

@NgModule({
  imports: [
    SharedModule,
    LearningRoutingModule,
  ],
  declarations: [],
  providers: [...COURSE_API_SERVICES]
})
export class LearningModule { }
