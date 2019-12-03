import { BusinessEntityDetailResolver } from './service/business-entity-detail-resolver.service';
import { CustomAttributeComponent } from './views/custom-attribute/custom-attribute.component';
import { EntityListComponent } from './views/entity-list/entity-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: EntityListComponent },
  // { path: ':entityIdentifier/custom', component: CustomAttributeComponent },
  { path: ':entityId/custom', resolve: {entity: BusinessEntityDetailResolver}, component: CustomAttributeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BusinessEntityDetailResolver]
})
export class AttributeRoutingModule { }

export const routedComponents = [
    EntityListComponent,
    CustomAttributeComponent
];
