import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HourauditlistComponent } from './views/hourauditlist/hourauditlist.component';
import { HourdeclarationlistComponent } from './views/hourdeclarationlist/hourdeclarationlist.component';
import { DeclarationeditComponent } from './views/declarationedit/declarationedit.component';
import { AduitpassrefuseComponent } from './views/aduitpassrefuse/aduitpassrefuse.component';
import { HourimportComponent } from './views/hourimport/hourimport.component';
import { PersonlistComponent } from './views/personlist/personlist.component';
import { AttchmentlistComponent } from './views/attchmentlist/attchmentlist.component';
import { HourauditdeclarelistComponent } from './views/hourauditdeclarelist/hourauditdeclarelist.component';
import { HournewimportComponent } from './views/hournewimport/hournewimport.component';
import { HourCarryoverDetailResolver } from './../managementservice/hour-carryover-resolver.service';

const routes: Routes = [
    { path: '', redirectTo: 'hourauditdeclarelist', pathMatch: 'full' },
    //{ path: 'hourauditlist', component: HourauditlistComponent },
    { path: 'hourauditdeclarelist', component: HourauditdeclarelistComponent },
    { path: ':id/aduitpassrefuse', component: AduitpassrefuseComponent },
    { path: 'hourdeclarationlist', component: HourdeclarationlistComponent },
    { path: 'declarationedit', resolve: { carryoverDetail: HourCarryoverDetailResolver }, component: DeclarationeditComponent },
    { path: 'hourdeclarationimport', component: HournewimportComponent },
    { path: ':id/personlist', component: PersonlistComponent },
    { path: ':id/attachmentlist', component: AttchmentlistComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [HourCarryoverDetailResolver]
})
export class HouraduiRoutingModule { }
export const routedComponents = [
    HourauditlistComponent,
    HourauditdeclarelistComponent,
    HourdeclarationlistComponent,
    DeclarationeditComponent,
    AduitpassrefuseComponent,
    HourimportComponent,
    PersonlistComponent,
    AttchmentlistComponent,
    HourauditdeclarelistComponent,
    HournewimportComponent
]
