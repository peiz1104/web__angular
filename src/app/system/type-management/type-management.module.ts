import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {TypeManagementModuleRoutingModule} from "./type-management-routing.module";
import { TypeManagementListComponent } from './view/type-management-list/type-management-list.component';
import { AddTypeManagementComponent } from './view/add-type-management/add-type-management.component';
import { TypeManagementFormComponent } from './view/type-management-form/type-management-form.component';
import {TypeManagementService} from "./service/type-management.service";
import {ProgramManagementService} from "../program-management/service/program-management.service";
import {PublicModule} from "../program-management/public/public.module";
import { EditTypeManagementComponent } from './view/edit-type-management/edit-type-management.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    TypeManagementModuleRoutingModule,
    PublicModule
  ],
  declarations: [TypeManagementListComponent, AddTypeManagementComponent, TypeManagementFormComponent, EditTypeManagementComponent],
  providers: [TypeManagementService, ProgramManagementService]
})
export class TypeManagementModule { }
