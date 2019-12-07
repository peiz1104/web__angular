import { SharedModule } from 'app/shared';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConsoleuiModule } from 'console-ui-ng';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { CoreModule } from './core';
import { NewlayoutModule } from './newlayout/newlayout.module';
import { DemoModule } from './demo/demo.module'
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    BrowserAnimationsModule,
    ConsoleuiModule,
    CoreModule,
    DemoModule,
    NewlayoutModule,
    AppRoutingModule,
    SharedModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
