import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { TrainingLevelRoutingModule } from './training-level-routing.module';
import { TrainingLevelListComponent } from './views/training-level-list/training-level-list.component';
import { TrainingLevelAddComponent } from './views/training-level-add/training-level-add.component';
import { TrainingLevelEditComponent } from './views/training-level-edit/training-level-edit.component';
import { TrainingLevelService } from './service/training-level.service';

@NgModule({
  imports: [
    SharedModule,
    TrainingLevelRoutingModule,
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [TrainingLevelListComponent, TrainingLevelAddComponent, TrainingLevelEditComponent],
  providers: [TrainingLevelService],
})
export class TrainingLevelModule { }
