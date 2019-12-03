import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewheaderComponent } from './newheader/newheader.component';
import { NewLayoutComponent } from './new-layout/new-layout.component';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HeaderService } from 'app/core/service/header.service';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgZorroAntdModule,
        SharedModule
    ],
    declarations: [NewheaderComponent, NewLayoutComponent],
    exports: [NewheaderComponent, NewLayoutComponent],
    providers: [HeaderService]
})
export class NewlayoutModule { }
