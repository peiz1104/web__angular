import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'home', loadChildren: 'app/assist/assist-home/assist-home.module#AssistHomeModule' },
    { path: 'tbc', loadChildren: 'app/assist/tbc-assist/tbc-assist.module#TbcAssistModule' },
    { path: 'proxy', loadChildren: 'app/assist/proxy-register-assist/proxy-register-assist.module#ProxyRegisterAssistModule' },
    { path: 'period', loadChildren: 'app/assist/period/period.module#PeriodModule' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssistRoutingModule { }

export const routedComponents = [
];
