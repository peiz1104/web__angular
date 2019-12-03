import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartauditdeclComponent } from './views/departauditdecl/departauditdecl.component';
import { HourDepartmentComponent } from './hour-department.component';
const routes: Routes = [
    { path: '', component: HourDepartmentComponent },
    { path: ':departId/list', component: DepartauditdeclComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HouraduiDepartRoutingModule { }
export const routedComponents = [
    HourDepartmentComponent,
    DepartauditdeclComponent
]
