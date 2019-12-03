import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { DesignatedPlanRoutingModule } from './designatedplan-routing.module';
import { DesignatedPlanListComponent } from './views/designatedplan-list/designatedplan-list.component';
import { DesignatedPlanService } from './service/designatedplan.service';
import { PersonnelClassificationService } from './../personnel-classification/service/personnel-classification.service';
import { TrainingClassificationService } from './../training-classification/service/training-classification.service';
import { TrainingLevelService } from './../training-level/service/training-level.service';

@NgModule({
  imports: [
    SharedModule,
    DesignatedPlanRoutingModule,
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [DesignatedPlanListComponent],
  providers: [DesignatedPlanService, PersonnelClassificationService, TrainingClassificationService,
    TrainingLevelService]
})
export class DesignatedPlanModule { }
