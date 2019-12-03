import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', children: [
            { path: 'implementation', loadChildren: 'app/development/implementation/implementation.module#ImplementationModule' },
            { path: 'research', loadChildren: 'app/development/research/research.module#ResearchModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DevelopmentRoutingModule { }

export const routedComponents = [];
