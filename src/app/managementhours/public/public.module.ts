import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ConsoleuiModule } from 'console-ui-ng';
import { SharedModule } from 'app/shared';
import { FormsModule } from '@angular/forms';
import { CategoryselectComponent } from './categoryselect/categoryselect.component';
import { CategorytreeComponent } from './categorytree/categorytree.component';
import { HourService } from '../managementservice/hour.service';
import { PublictreeComponent } from './publictree/publictree.component';
import { CategorygrouptreeComponent } from './categorygrouptree/categorygrouptree.component';
import { HouruserlookupComponent } from './houruserlookup/houruserlookup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ConsoleuiModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        SharedModule
    ],
    // tslint:disable-next-line:max-line-length
    declarations: [CategoryselectComponent, CategorytreeComponent, PublictreeComponent, CategorygrouptreeComponent, HouruserlookupComponent],
    exports: [CategoryselectComponent, CategorytreeComponent, PublictreeComponent, CategorygrouptreeComponent, HouruserlookupComponent],
    providers: [HourService]
})
export class PublicModule { }
