import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskeditComponent } from './views/taskedit/taskedit.component';
import { HourtasklistComponent } from './views/hourtasklist/hourtasklist.component';
import { HourtaskviewComponent } from './views/hourtaskview/hourtaskview.component';
import { HourrulelistComponent } from './views/hourrulelist/hourrulelist.component';
import { HourruleviewComponent } from './views/hourruleview/hourruleview.component';
import { HourruleimportComponent } from './views/hourruleimport/hourruleimport.component';
import { HourTaskDetailResolver } from './../managementservice/hour-task-resolver.service';

const routes: Routes = [
    { path: '', redirectTo: 'rulelist', pathMatch: 'full' },
    { path: 'rulelist', component: HourrulelistComponent },
    { path: ':ruleId/:nowYear/viewrule', resolve: { hourtaskdetail: HourTaskDetailResolver }, component: HourruleviewComponent },
    { path: ':ruleId/:nowYear/ruleimport', component: HourruleimportComponent },
    { path: 'tasklist', component: HourtasklistComponent },
    { path: 'taskedit', component: TaskeditComponent },
    { path: ':hourId/:hourYear/viewdetail', component: HourtaskviewComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [HourTaskDetailResolver]
})
export class HourtaskRoutingModule { }
export const routedComponents = [
    TaskeditComponent,
    HourtasklistComponent,
    HourtaskviewComponent,
    HourrulelistComponent,
    HourruleviewComponent,
    HourruleimportComponent
]
