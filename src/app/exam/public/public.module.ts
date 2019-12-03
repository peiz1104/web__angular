import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const PUBLIC_COMPONENTS = [

];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...PUBLIC_COMPONENTS],
  exports: [...PUBLIC_COMPONENTS]
})
export class ExamPublicModule { }
