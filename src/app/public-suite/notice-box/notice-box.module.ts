import { NoticeService } from './service/notice.service';
import { NoticeBoxService } from './service/notice-box.service';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { NoticeListComponent } from './views/notice-list/notice-list.component';
import { NoticeBoxComponent } from './views/notice-box/notice-box.component';
import { NoticeFormComponent } from './views/notice-form/notice-form.component';
import { NoticeAddComponent } from './views/notice-add/notice-add.component';
import { NoticeEditComponent } from './views/notice-edit/notice-edit.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [NoticeListComponent, NoticeBoxComponent, NoticeFormComponent, NoticeAddComponent, NoticeEditComponent],
  exports: [NoticeBoxComponent],
  providers: [NoticeBoxService, NoticeService]
})
export class NoticeBoxModule { }
