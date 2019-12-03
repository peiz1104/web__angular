import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './views/list/list.component';
import { DetaillistComponent } from './views/detaillist/detaillist.component';

const routes: Routes = [
    { path: '', redirectTo: 'managementhourlist', pathMatch: 'full' },
    { path: 'managementhourlist', component: ListComponent },
    { path: ':id/detaillist/:year', component: DetaillistComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HourannualRoutingModule { }
export const routedComponents = [
    ListComponent,
    DetaillistComponent
]
