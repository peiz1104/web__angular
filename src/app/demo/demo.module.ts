import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routesComponent, DemoRoutingModule } from './demo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule
  ],
  declarations: [...routesComponent]
})
export class DemoModule { }
