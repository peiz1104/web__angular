import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TestViewComponent } from './test-view/test-view.component';
import { ConsoleuiModule } from 'console-ui-ng';
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConsoleuiModule,
    NgZorroAntdModule
  ],
  declarations: [TestViewComponent],
  exports: [TestViewComponent]
})
export class ViewTestModule { }
