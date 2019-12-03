import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { TrainingClassificationRoutingModule } from './training-classification-routing.module';
import { TrainingClassificationListComponent } from './views/training-classification-list/training-classification-list.component';
import { TrainingClassificationAddComponent } from './views/training-classification-add/training-classification-add.component';
import { TrainingClassificationEditComponent } from './views/training-classification-edit/training-classification-edit.component';
import { TrainingClassificationService } from './service/training-classification.service';

@NgModule({
  imports: [
    SharedModule,
    TrainingClassificationRoutingModule,
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [TrainingClassificationListComponent, TrainingClassificationAddComponent, TrainingClassificationEditComponent],
  providers: [TrainingClassificationService],
})
export class TrainingClassificationModule { }
