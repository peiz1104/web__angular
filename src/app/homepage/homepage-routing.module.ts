import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { AuthGuard } from 'app/core/auth/auth-guard.service';
const routes: Routes = [
    {
        path: '', component: HomepageComponent,
        canActivate: [AuthGuard],
        // children: [
        //     { path: '', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },

        // ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomepageRoutingModule { }
