import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProxyRegisterTbclistComponent } from './proxy-register-tbclist/proxy-register-tbclist.component';
import { ProxyRegisterTermComponent } from './proxy-register-term/proxy-register-term.component';
const routes: Routes = [
  { path: '', component: ProxyRegisterTbclistComponent },
  { path: ':tbcId', component: ProxyRegisterTermComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProxyRegisterAssistRoutingModule { }

export const routedComponents = [
  ProxyRegisterTbclistComponent
];
