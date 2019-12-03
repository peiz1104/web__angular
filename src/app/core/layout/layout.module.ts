import { AuthzModule } from './../../shared/authz/authz.modult';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { ConsoleuiModule } from 'console-ui-ng';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { HeaderService } from 'app/core/service/header.service';
import { AssistLayoutComponent } from './assist-layout/assist-layout.component';
import { AssistHeaderComponent } from './assist-header/assist-header.component';

@NgModule({
    imports: [
        CommonModule,
        AuthzModule,
        ConsoleuiModule,
        NgZorroAntdModule,
        RouterModule
    ],
    declarations: [MainLayoutComponent, HeaderComponent, NavLeftComponent, AssistLayoutComponent,AssistHeaderComponent],
    exports: [MainLayoutComponent, AssistLayoutComponent,HeaderComponent,AssistHeaderComponent],
    providers: [HeaderService]
})
export class LayoutModule { }
