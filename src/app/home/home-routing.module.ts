import { HomeTemplateListComponent } from './views/home-template-list/home-template-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeTemplateEditComponent } from './views/home-template-edit/home-template-edit.component';
import { HomeTemplateModulesComponent } from './views/home-template-modules/home-template-modules.component';


const routes: Routes = [
    {
        path: 'template', children: [
            { path: '', component: HomeTemplateListComponent },
            { path: 'add', component: HomeTemplateEditComponent },
            { path: ':id/edit', component: HomeTemplateEditComponent },
            {
                path: ':id/module', children: [
                    { path: '', component: HomeTemplateModulesComponent },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }

export const routedComponents = [
    HomeTemplateListComponent,
    HomeTemplateEditComponent
];
