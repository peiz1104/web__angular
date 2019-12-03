import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { CertTypeListComponent } from './views/cert-type-list/cert-type-list.component';
import { CertTypeRoutingModule } from "./cert-type-routing.module";
import { CertTypeService } from "./service/cert-type.service";
import { CertTypeAddComponent } from './views/cert-type-add/cert-type-add.component';
import { CertTypeEditComponent } from './views/cert-type-edit/cert-type-edit.component';
import { SystemModule } from "app/system/system.module";
import { CertTypeFormComponent } from 'app/system/cert-type/public/cert-type-form/cert-type-form.component';
@NgModule({
  imports: [
    SharedModule,
    CertTypeRoutingModule
  ],
  declarations: [CertTypeListComponent, CertTypeAddComponent, CertTypeEditComponent,CertTypeFormComponent],
  providers :[CertTypeService]

})
export class CertTypeModule { }
