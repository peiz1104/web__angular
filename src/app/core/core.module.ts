import { GLOBAL_SERVICE_REGS } from './service/global-service-regs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpkHttpModule } from './http/spk-http.module';
import { AuthModule } from './auth/auth.module';
import { ErrorModule } from './error/error.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    SpkHttpModule,
    AuthModule,
    ErrorModule,
    LayoutModule
  ],
  declarations: [],
  providers: [
    ...GLOBAL_SERVICE_REGS
  ]
})
export class CoreModule { }
