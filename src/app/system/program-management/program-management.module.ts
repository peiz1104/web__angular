import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgramManagementRoutingModule} from "./program-management-routing.module";
import { ProgramManagementGroupComponent } from './views/program-management-group/program-management-group.component';
import { ProgramManagermentComponent } from './views/program-managerment/program-managerment.component';
import {ProgramManagermentGroupService} from "./service/program-managerment-group.service";
import { ProgramManagementTreeComponent } from './views/program-management-tree/program-management-tree.component';
import {ProgramManagementService} from "./service/program-management.service";
import {SharedModule} from "../../shared/shared.module";
import {CategoryPulbicModule} from "../category/public/category-public.module";
import { ProgramManagementAddComponent } from './views/program-management-add/program-management-add.component';
import { ProgramManagementFormComponent } from './views/program-management-form/program-management-form.component';

import { ProgrammanagementEditComponent } from './views/programmanagement-edit/programmanagement-edit.component';
import {PublicModule} from './public/public.module';

@NgModule({
  imports: [
    SharedModule,
    ProgramManagementRoutingModule,
    CategoryPulbicModule,
    PublicModule
  ],
  declarations: [ProgramManagementGroupComponent, ProgramManagermentComponent, ProgramManagementTreeComponent, ProgramManagementAddComponent, ProgramManagementFormComponent, ProgrammanagementEditComponent],
  providers: [ProgramManagermentGroupService, ProgramManagementService]
})
export class ProgramManagementModule { }
