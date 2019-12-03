import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeclarePeriodComponent } from './declare-period/declare-period.component';
import { PeriodAuditingComponent } from './period-auditing/period-auditing.component';
import { PeriodDeclareComponent } from './period-declare/period-declare.component';
import { PeriodHistoryComponent } from './period-history/period-history.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SystemPublicModule } from 'app/system/public/system-public.module';
import { PeriodApiService } from './period-api.service';
import { AuthService } from 'app/core/auth/auth.service';
import { AssistPeriodwResolver } from 'app/core/auth/period-auth-guard.service';
import { PeriodDepartmentComponent } from './period-department/period-department.component';

const routes: Routes = [
    { path: '', resolve: { AssistPeriodwResolver }, component: DeclarePeriodComponent },
    { path: ':departId/list', resolve: { AssistPeriodwResolver }, component: PeriodAuditingComponent }
];
const ROUTERDECLAR = [
    DeclarePeriodComponent,
    PeriodAuditingComponent,
    PeriodDeclareComponent,
    PeriodHistoryComponent,
    PeriodDepartmentComponent
]
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SystemPublicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [...ROUTERDECLAR],
    providers: [PeriodApiService, AuthService, AssistPeriodwResolver]
})
export class PeriodModule { }
