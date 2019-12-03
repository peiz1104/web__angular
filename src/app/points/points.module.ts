import { PointsRuleApiService } from './service/points-rule-api.service';
import { PointsRoutingModule } from './points-routing.module';
import { PointsPublicModule } from './public/points-public.module';
import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsRuleComponent } from 'app/points/views/points-rule-list/points-rule-list.component';
import { PointsDetailListComponent } from './views/points-detail-list/points-detail-list.component';
import { PointsDetailListApiService } from './service/points-detail-list-api.service';
import { PointsMallListApiService } from './service/points-mall-list-api.service';
import { PointsMallListComponent } from 'app/points/views/points-mall-list/points-mall-list.component';
import { PointsMallAddComponent } from 'app/points/views/points-mall-add/points-mall-add.component';
import { PointsMallEditComponent } from 'app/points/views/points-mall-edit/points-mall-edit.component';
import { PointsRuleEditComponent } from './views/points-rule-edit/points-rule-edit.component';

@NgModule({
  imports: [
    SharedModule,
    PointsRoutingModule,
    PointsPublicModule
  ],
  declarations:[
    PointsRuleComponent,
    PointsRuleEditComponent,
    PointsDetailListComponent,
    PointsMallListComponent,
    PointsMallAddComponent,
    PointsMallEditComponent
  ],
  providers: [
  
    PointsRuleApiService,
    PointsDetailListApiService,
    PointsMallListApiService
    
  ]
})
export class PointsModule { }
