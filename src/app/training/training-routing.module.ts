import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', children: [
            { path: 'class', loadChildren: 'app/training/training-class/training-class.module#TrainingClassModule' },
            { path: 'planing', loadChildren: 'app/training/planing/planing.module#PlaningModule' },
            { path: 'researchplan', loadChildren: 'app/training/researchplan/researchplan.module#ResearchplanModule' }, // 研修院计划实施
            { path: 'promotion', loadChildren: 'app/training/promotion/promotion.module#PromotionModule' },
            { path: 'redclassmanage', loadChildren: 'app/training/redtraingclass/redtraingclass.module#RedtraingclassModule' },
            { path: 'statistics', loadChildren: 'app/training/statistics/statistics.module#StatisticsModule' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TrainingRoutingModule { }

export const routedComponents = [];
