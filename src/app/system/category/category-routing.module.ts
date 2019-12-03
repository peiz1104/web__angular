import { CategoryEditComponent } from './views/category-edit/category-edit.component';
import { CategoryAddComponent } from './views/category-add/category-add.component';
import { CategoryGroupGuard } from './service/category-group-guard.service';
import { CategoryGroupResolver } from './service/category-group-resolver.service';
import { CategoryComponent } from './views/category/category.component';
import { CategoryGroupComponent } from './views/category-group/category-group.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', resolve: {
      categoryGroup: CategoryGroupResolver
    },
    component: CategoryGroupComponent
  },
  {
    path: ':identifier',
    resolve: {
      categoryGroup: CategoryGroupResolver
    },
    canActivate: [CategoryGroupGuard],
    component: CategoryGroupComponent,
    children: [
      {path: '', children: [
        { path: '', redirectTo: 'list', pathMatch: 'full'},
        { path: 'list', component: CategoryComponent },
        { path: 'add',  component: CategoryAddComponent },
        { path: ':id/edit',  component: CategoryEditComponent }
      ]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CategoryGroupResolver, CategoryGroupGuard]
})
export class CategoryRoutingModule { }

export const routedComponents = [CategoryGroupComponent];
