import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { TrainingSchoolListComponent } from './views/trainingschool-list/trainingschool-list.component';
import { TrainingSchoolRoutingModule } from './trainingschool-routing.module';
import { TrainingSchoolAddComponent } from './views/trainingschool-add/trainingschool-add.component';
import { TrainingSchoolEditComponent } from './views/trainingschool-edit/trainingschool-edit.component';
import { TrainingSchoolService } from './service/trainingschool.service';

@NgModule({
  imports: [
    SharedModule,
    TrainingSchoolRoutingModule,
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [TrainingSchoolListComponent, TrainingSchoolAddComponent, TrainingSchoolEditComponent],
  providers: [TrainingSchoolService],
})
export class TrainingSchoolModule { }
