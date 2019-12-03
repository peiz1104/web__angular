import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupHourListComponent } from './views/group-hour-list/group-hour-list.component';
import { DetaillistComponent } from './views/detaillist/detaillist.component';

const routes: Routes = [
    { path: '', redirectTo: 'grouphourlist', pathMatch: 'full' },
    { path: 'grouphourlist', component: GroupHourListComponent },
    { path: ':id/detaillist/:year', component: DetaillistComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GrouphourRoutingModule { }
export const routedComponents = [
    GroupHourListComponent,
    DetaillistComponent
]
