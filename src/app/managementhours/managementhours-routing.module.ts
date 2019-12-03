import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'hourswitch', pathMatch: 'full' },
    { path: 'hourswitch', loadChildren: 'app/managementhours/hourswitch/hourswitch.module#HourswitchModule' },
    { path: 'hourannual', loadChildren: 'app/managementhours/hourannual/hourannual.module#HourannualModule' },
    { path: 'grouphour', loadChildren: 'app/managementhours/grouphour/grouphour.module#GrouphourModule' },
    { path: 'hourconfiguration', loadChildren: 'app/managementhours/hourconfiguration/hourconfiguration.module#HourconfigurationModule' },
    { path: 'hourtask', loadChildren: 'app/managementhours/hourtask/hourtask.module#HourtaskModule' },
    { path: 'houraduitmanage', loadChildren: 'app/managementhours/houraudimanagement/houraudimanagement.module#HouraudimanagementModule' },
    { path: 'hourassist', loadChildren: 'app/managementhours/hourassist/hourassist.module#HourassistModule' },
    { path: 'deparmenthour', loadChildren: 'app/managementhours/hour-department/hour-department.module#HourDepartmentModule' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagementRoutingModule { }
export const routedComponents = [
]
