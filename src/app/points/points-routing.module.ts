import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PointsRuleComponent } from './views/points-rule-list/points-rule-list.component';
import { PointsDetailListComponent } from './views/points-detail-list/points-detail-list.component';
import { PointsMallListComponent } from './views/points-mall-list/points-mall-list.component';
import { PointsMallAddComponent } from './views/points-mall-add/points-mall-add.component';
import { PointsMallEditComponent } from './views/points-mall-edit/points-mall-edit.component';



const routes: Routes = [
    
              { path: 'rule', component: PointsRuleComponent },
              {
              path: 'mall', children: [
                { path: '', component: PointsMallListComponent },
                { path: 'list', component: PointsMallListComponent },
                { path: 'add', component: PointsMallAddComponent },
                { path: ':Id/edit', component: PointsMallEditComponent },
                { path: ':userGroupIdselected/add', component: PointsMallAddComponent }
              ] },
              { path: 'import-wizard', component: PointsRuleComponent },
           
              { path: 'detaillist', component: PointsDetailListComponent }
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PointsRoutingModule { }
  
  export const routedComponents = [
    PointsRuleComponent,
    PointsDetailListComponent,
    PointsMallListComponent,
    PointsMallAddComponent,
    PointsMallEditComponent
  ];
