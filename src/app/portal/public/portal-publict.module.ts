import { SharedModule } from 'app/shared';
import { NewsArticleFormComponent } from './news-article-form/news-article-form.component';
import { NgModule } from '@angular/core';
import { NewsGroupSelectComponent } from './news-group-select/news-group-select.component';

const PORTAL_PUBLIC_COMPONENTS = [
    NewsArticleFormComponent
];

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [...PORTAL_PUBLIC_COMPONENTS, NewsGroupSelectComponent],
    exports: [...PORTAL_PUBLIC_COMPONENTS],
    providers: [],
})
export class PortalPublicModule { }
