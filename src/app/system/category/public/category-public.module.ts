import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ConsoleuiModule } from 'console-ui-ng';
import { SharedModule } from 'app/shared';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from './../service/category.service';
import { CategorySelectComponent } from './category-select/category-select.component';
import { NgModule } from '@angular/core';

export const CATEGORY_PUBLIC_COMPONENTS = [
    CategorySelectComponent
];

export const CATEGORY_PUBLIC_SERVICES = [
    CategoryService
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ConsoleuiModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
    ],
    exports: [...CATEGORY_PUBLIC_COMPONENTS],
    declarations: [...CATEGORY_PUBLIC_COMPONENTS],
    providers: [...CATEGORY_PUBLIC_SERVICES],
})
export class CategoryPulbicModule { }
