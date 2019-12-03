import { InnerHtmlPipe } from './pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsoleuiModule } from 'console-ui-ng';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupSelectComponent } from './user-group-select/user-group-select.component';
import { UserLookupComponent } from './user-lookup/user-lookup.component';
import { UserGroupTreeComponent } from './user-group-tree/user-group-tree.component';
import { ViewPaperComponent } from './view-paper/view-paper.component';
import { GetTextPipe } from './pipes/get-text/get-text.pipe';
import { QmDatepickerComponent } from './qm-datepicker/qm-datepicker.component';
import { NewUserLookupComponent } from './new-user-lookup/new-user-lookup.component';
import { UserPopoverComponent } from './user-popover/user-popover.component';
import { UserGroupPopoverComponent } from './user-group-popover/user-group-popover.component';
import { VideoPlayComponent } from './video-play/video-play.component';
import { ChinalifePublicUserLookupComponent } from './chinalife-public-user-lookup/chinalife-public-user-lookup.component';
import { LogicGroupSelectComponent } from './logic-group-select/logic-group-select.component';
import { CategoryPopoverComponent } from './category-popover/category-popover.component';
const WIDGETS = [
    UserGroupTreeComponent,
    UserGroupSelectComponent,
    UserLookupComponent,
    InnerHtmlPipe,
    GetTextPipe,
    ViewPaperComponent,
    QmDatepickerComponent,
    NewUserLookupComponent,
    UserPopoverComponent,
    UserGroupPopoverComponent,
    VideoPlayComponent,
    LogicGroupSelectComponent,
    ChinalifePublicUserLookupComponent,
    CategoryPopoverComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        ConsoleuiModule,
        ReactiveFormsModule
    ],
    declarations: [...WIDGETS, ViewPaperComponent, NewUserLookupComponent, LogicGroupSelectComponent],
    exports: [...WIDGETS]
})
export class WidgetModule { }
