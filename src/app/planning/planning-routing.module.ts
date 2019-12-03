import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', children: [
            { path: 'annualplan', loadChildren: 'app/planning/annualplan/annualplan.module#AnnualplanModule' },
            { path: 'trainingschoolplan', loadChildren: 'app/planning/trainingschoolplan/trainingschoolplan.module#TrainingschoolplanModule' },
            { path: 'trainingschool', loadChildren: 'app/planning/trainingschool/trainingschool.module#TrainingSchoolModule' },
            { path: 'designatedplan', loadChildren: 'app/planning/designatedplan/designatedplan.module#DesignatedPlanModule' },
            { path: 'organize', loadChildren: 'app/planning/organize-group/organize-group.module#OrganizeGroupModule' },
            // tslint:disable-next-line:max-line-length
            { path: 'personnelclassification', loadChildren: 'app/planning/personnel-classification/personnel-classification.module#PersonnelClassificationModule' },
            { path: 'trainingclassification', loadChildren: 'app/planning/training-classification/training-classification.module#TrainingClassificationModule' },
            { path: 'traininglevel', loadChildren: 'app/planning/training-level/training-level.module#TrainingLevelModule' },
            { path: 'traffic', loadChildren: 'app/planning/traffic/traffic.module#TrafficModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlanningRoutingModule { }

export const routedComponents = [];
