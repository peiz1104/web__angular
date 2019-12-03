///<reference path="view/applicable-objects-edit/applicable-objects-edit.component.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApplicableObjectsRoutingModule} from "./applicable-objects-routing.module";
import {ApplicableObjectsService} from "./service/applicable-objects.service";
import { ApplicableObjectsListComponent } from './view/applicable-objects-list/applicable-objects-list.component';
import {SharedModule} from "../../shared/shared.module";
import { AddApplicableObjectsComponent } from "./view/add-applicable-objects/add-applicable-objects.component";
import { ApplicableObjectsFormComponent } from './view/applicable-objects-form/applicable-objects-form.component';
import { ApplicableObjectsEditComponent } from './view/applicable-objects-edit/applicable-objects-edit.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ApplicableObjectsRoutingModule
  ],
  declarations: [ApplicableObjectsListComponent, AddApplicableObjectsComponent, ApplicableObjectsFormComponent, ApplicableObjectsEditComponent],
  providers: [ApplicableObjectsService]
})


export class ApplicableObjectsModule { }
