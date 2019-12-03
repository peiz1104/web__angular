import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraintypemanageComponent } from 'app/managementhours/hourconfiguration/views/traintypemanage/traintypemanage.component';
import { TraintypenameComponent } from './views/traintypename/traintypename.component';
import { TraintypenumberComponent } from './views/traintypenumber/traintypenumber.component';
import { AddtrainComponent } from './views/addtrain/addtrain.component';
import { TrainsourceComponent } from './views/trainsource/trainsource.component';
import { EditcreateComponent } from './views/editcreate/editcreate.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'traintypename', pathMatch: 'full' },
            { path: 'traintypename', component: TraintypenameComponent },
            { path: 'traintitem', component: TraintypenumberComponent },
            { path: 'trainchannel', component: AddtrainComponent },
            { path: 'trainsource', component: TrainsourceComponent },
            { path: 'edit', component: EditcreateComponent },
        ], component: TraintypemanageComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HourconfigurationRoutingModule { }
export const routedComponents = [
    TraintypemanageComponent,
    TraintypenameComponent,
    TraintypenumberComponent,
    AddtrainComponent,
    TrainsourceComponent,
    EditcreateComponent
]
