import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ConsoleuiModule } from 'console-ui-ng';
import { WorkspaceComponent } from './workspace/workspace.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardComponent, WorkspaceComponent]
})
export class DashboardModule { }
