import { CategoryPulbicModule } from './public/category-public.module';
import { CategorySelectComponent } from './public/category-select/category-select.component';
import { CategoryTreeComponent } from './views/category-tree/category-tree.component';
import { SharedModule } from './../../shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { NgModule } from '@angular/core';
import { CategoryGroupService } from './service/category-group.service';
import { CategoryService } from './service/category.service';
import { CategoryComponent } from './views/category/category.component';
import { CategoryGroupComponent } from './views/category-group/category-group.component';
import { CategoryAddComponent } from './views/category-add/category-add.component';
import { CategoryFormComponent } from './views/category-form/category-form.component';
import { CategoryEditComponent } from './views/category-edit/category-edit.component';

@NgModule({
  imports: [
    SharedModule,
    CategoryRoutingModule,
    CategoryPulbicModule
  ],
  declarations: [CategoryComponent,  CategoryGroupComponent, CategoryTreeComponent, CategoryAddComponent,
    CategoryFormComponent, CategoryEditComponent],
  providers: [
    CategoryService,
    CategoryGroupService,
  ]
})
export class CategoryModule { }
