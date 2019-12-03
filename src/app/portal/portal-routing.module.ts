import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalBannerListComponent } from './views/portal-banner-list/portal-banner-list.component';
import { PortalNewsListComponent } from './views/portal-news-list/portal-news-list.component';
import { PortalNewsAddComponent } from './views/portal-news-add/portal-news-add.component';
import { PortalNewsEditComponent } from './views/portal-news-edit/portal-news-edit.component';
import { PortalNewsGroupComponent } from './views/portal-news-group/portal-news-group.component';
import { PortalFooterEditComponent } from 'app/portal/views/portal-footer-edit/portal-footer-edit.component';


const routes: Routes = [
    {
        path: '', children: [
            {
                path: 'banner', children: [
                    { path: '', component: PortalBannerListComponent }
                ]
            },
            {
                path: 'news', children: [
                    { path: '', component: PortalNewsListComponent },
                    { path: 'add', component: PortalNewsAddComponent },
                    { path: 'group', component: PortalNewsGroupComponent },
                    { path: ':articleId/edit', component: PortalNewsEditComponent },
                ]
            },
            {
                path: 'footer', children: [
                    { path: '', component: PortalFooterEditComponent },
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PortalRoutingModule { }

export const routedComponents = [
    PortalBannerListComponent,

    PortalNewsListComponent,
    PortalNewsAddComponent,
    PortalNewsEditComponent,
    PortalNewsGroupComponent,
];
