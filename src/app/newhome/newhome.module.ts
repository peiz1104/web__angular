import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from 'app/shared/shared.module';
import { NewhomeComponent } from './newhome/newhome.component';

const routes: Routes = [
    { path: '', component: NewhomeComponent }
]
@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [NewhomeComponent]
})
export class NewhomeModule { }
