import { ChildrenplanListComponent } from './childrenplan-list/childrenplan-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenplanAddComponent } from './childrenplan-add/childrenplan-add.component';
import { ChildrenplanEditComponent } from './childrenplan-edit/childrenplan-edit.component';
import { ChildrenplanDetailComponent } from './childrenplan-detail/childrenplan-detail.component';
import { ChildrenplanViewComponent } from './childrenplan-view/childrenplan-view.component';
import { AnnualSubPlanDetailResolverService } from '../service/annualsubplan-detail-resolver.service';
import { LastYearPlanListComponent } from './lastyearplan-list/lastyearplan-list.component';
import { ChildrenPlanImportComponent } from './childrenplan-import/childrenplan-import.component';
import { ChildrenPlanExportComponent } from './childrenplan-export/childrenplan-export.component';
import { DesignatedPlanListComponent } from './designatedplan-list/designatedplan-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {
        path: 'list', component: ChildrenplanListComponent
    },
    { path: 'add', component: ChildrenplanAddComponent },
    { path: 'copy', component: LastYearPlanListComponent },
    { path: 'import', component: ChildrenPlanImportComponent },
    { path: 'export', component: ChildrenPlanExportComponent },
    { path: 'introduce', component: DesignatedPlanListComponent },
    {
        path: ':id/:planType', component: ChildrenplanDetailComponent, resolve: { annualSubPlan: AnnualSubPlanDetailResolverService },
        children: [
            {
                path: '', children: [
                    { path: '', redirectTo: ':pageNumber/edit', pathMatch: 'full' },
                    { path: ':pageNumber/edit', component: ChildrenplanEditComponent },
                    { path: 'view', component: ChildrenplanViewComponent }
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChildrenPlanRoutingModule { }

export const routedComponents = [ChildrenplanListComponent];
