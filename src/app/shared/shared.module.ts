import { AuthzModule } from './authz/authz.modult';
import { AuthzService } from './authz/authz.service';
import { SHARED_APIS } from './api';
import { WidgetModule } from './widget/widget.module';
import { CategoryPulbicModule } from './../system/category/public/category-public.module';
import { SystemPublicModule } from './../system/public/system-public.module';
import { CategoryService } from './../system/category/service/category.service';
import { UserGroupService } from './../system/service/user-group.service';
import { ConsoleuiModule, CuiTreeModule } from 'console-ui-ng';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DateMomentPipe } from './pipes/date-moment.pipe';
import { SortablejsModule } from 'angular-sortablejs';
import { TextFilteringPipe } from './pipes/text-filtering.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ConsoleuiModule,
        NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: '../../assets/fonts/iconfont' }),
        ReactiveFormsModule,

        SystemPublicModule,
        CategoryPulbicModule,

        WidgetModule,
        AuthzModule,
        SortablejsModule.forRoot({ animation: 150 }),
    ],
    declarations: [
        DateMomentPipe,
        TextFilteringPipe,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ConsoleuiModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        SystemPublicModule,
        CategoryPulbicModule,
        WidgetModule,
        AuthzModule,
        DateMomentPipe,
        SortablejsModule,
        TextFilteringPipe,
    ]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [...SHARED_APIS, AuthzService]
        };
    }

}
