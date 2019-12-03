import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProposedpromotionComponent} from "./proposedpromotion/proposedpromotion.component";
import {HaspromotionComponent} from "./haspromotion/haspromotion.component";


const routes: Routes = [
  { path: 'proposedpromotion', component: ProposedpromotionComponent },
  { path: 'haspromotion', component: HaspromotionComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PromotionRoutingModule { }

export const routedComponents = [];
