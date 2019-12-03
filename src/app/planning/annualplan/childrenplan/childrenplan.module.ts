import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';
import { ChildrenPlanRoutingModule } from './childrenplan-routing.module';
import { ChildrenplanListComponent } from '../childrenplan/childrenplan-list/childrenplan-list.component';
import { ChildrenplanAddComponent } from './childrenplan-add/childrenplan-add.component';
import { ChildrenplanEditComponent } from './childrenplan-edit/childrenplan-edit.component';
import { ChildrenplanDetailComponent } from './childrenplan-detail/childrenplan-detail.component';
import { ChildrenplanViewComponent } from './childrenplan-view/childrenplan-view.component';
import { ChildrenPlanImportComponent } from './childrenplan-import/childrenplan-import.component';
import { ChildrenPlanExportComponent } from './childrenplan-export/childrenplan-export.component';
import { AnnualSubPlanService } from '../service/annualsubplan.service';
import { OtherPlanService } from '../service/otherplan.service';
import { ResearchPlanService } from '../service/researchplan.service';
import { TrainingPlanService } from '../service/trainingplan.service';
import { AnnualSubPlanDetailResolverService } from '../service/annualsubplan-detail-resolver.service';
import { LastYearPlanListComponent } from './lastyearplan-list/lastyearplan-list.component';
import { DesignatedPlanListComponent } from './designatedplan-list/designatedplan-list.component';
import { TrainingSchoolService } from './../../trainingschool/service/trainingschool.service';
import { PersonnelClassificationService } from './../../personnel-classification/service/personnel-classification.service';
import { TrainingClassificationService } from './../../training-classification/service/training-classification.service';
import { TrainingLevelService } from './../../training-level/service/training-level.service';
import { DesignatedPlanService } from '../service/designatedplan.service';
import { CourseService } from './../../../learning/course/service/course.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ChildrenPlanRoutingModule
    ],
    // tslint:disable-next-line:max-line-length
    declarations: [
        ChildrenplanListComponent, ChildrenplanAddComponent,
        ChildrenplanEditComponent, ChildrenplanDetailComponent,
        ChildrenplanViewComponent, LastYearPlanListComponent,
        ChildrenPlanImportComponent, ChildrenPlanExportComponent,
        DesignatedPlanListComponent
    ],
    providers: [
        AnnualSubPlanService, OtherPlanService,
        ResearchPlanService, TrainingPlanService,
        AnnualSubPlanDetailResolverService, TrainingSchoolService,
        PersonnelClassificationService, TrainingClassificationService,
        TrainingLevelService, DesignatedPlanService, CourseService
    ]
})
export class ChildrenplanModule { }
