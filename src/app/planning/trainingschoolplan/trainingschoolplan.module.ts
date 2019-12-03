import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { TrainingschoolPlanRoutingModule } from './trainingschoolplan-routing.module';
import { TrainingschoolplanListComponent } from './views/trainingschoolplan-list/trainingschoolplan-list.component';
import { TrainingSchoolPlanService } from './service/trainingschoolplan.service';
import { TrainingSchoolPlanViewComponent } from './views/trainingschoolplan-view/trainingschoolplan-view.component';
import { AnnualSubPlanService } from 'app/planning/annualplan/service/annualsubplan.service';

@NgModule({
  imports: [
    SharedModule,
    TrainingschoolPlanRoutingModule
  ],
  declarations: [TrainingschoolplanListComponent, TrainingSchoolPlanViewComponent],
  providers: [
    TrainingSchoolPlanService,
    AnnualSubPlanService,
  ],
})
export class TrainingschoolplanModule { }
