import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { OrganizeGroupRoutingModule } from './organize-group-routing.module';
import { OrganizeGroupListComponent } from './views/organize-group-list/organize-group-list.component';
import { OrganizeGroupAddComponent } from './views/organize-group-add/organize-group-add.component';
import { OrganizeGroupService } from './service/organize-group.service';
import { DesignatedPlanService } from 'app/planning/designatedplan/service/designatedplan.service';

@NgModule({
    imports: [
        SharedModule,
        OrganizeGroupRoutingModule
    ],
    exports: [],
    declarations: [OrganizeGroupListComponent, OrganizeGroupAddComponent],
    providers: [OrganizeGroupService, DesignatedPlanService],
})
export class OrganizeGroupModule { }
