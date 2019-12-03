import { BusinessEntityApiService } from './service/business-entity-api.service';
import { AttributeApiService } from './service/attribute-api.service';
import { AttributeRoutingModule, routedComponents } from './attribute-routing.module';
import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeValidValueControlComponent } from './views/attribute-valid-value-control/attribute-valid-value-control.component';

@NgModule({
  imports: [
    SharedModule,
    AttributeRoutingModule,
  ],
  declarations: [...routedComponents, AttributeValidValueControlComponent],
  providers: [AttributeApiService, BusinessEntityApiService]
})
export class AttributeModule { }
