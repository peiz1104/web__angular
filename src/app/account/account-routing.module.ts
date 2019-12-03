import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountMainComponent } from './views/account-main/account-main.component';
import { AccountInfoComponent } from './views/account-info/account-info.component';
import { AccountSecureComponent } from './views/account-secure/account-secure.component';
import { AccountAuthorizationComponent } from './views/account-authorization/account-authorization.component';
import { AccountPreferenceComponent } from './views/account-preference/account-preference.component';

import { NotificationSubscribeComponent } from './views/notification-subscribe/notification-subscribe.component';
import { NotificationMainComponent } from './views/notification-main/notification-main.component';
import { InnerMsgViewComponent } from './views/inner-msg-view/inner-msg-view.component';
import { InnerMsgListComponent } from './views/inner-msg-list/inner-msg-list.component';

const routes: Routes = [
  {
    path: '', component: AccountMainComponent, children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: AccountInfoComponent },
      { path: 'secure', component: AccountSecureComponent },
      { path: 'authorization', component: AccountAuthorizationComponent },
      { path: 'preference', component: AccountPreferenceComponent },
    ]
  },
  {
    path: 'notification', component: NotificationMainComponent, children: [
      { path: '', redirectTo: 'innerMsg', pathMatch: 'full' },
      {
        path: 'innerMsg', children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: ':isRead', component: InnerMsgListComponent },
          { path: 'isRead', component: InnerMsgListComponent },
          { path: 'isRead', component: InnerMsgListComponent },
          { path: ':innerMsgId', component: InnerMsgViewComponent },
        ]
      },
      { path: 'subscribe', component: NotificationSubscribeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }

export const accountRoutedComponents = [
  AccountMainComponent,
  AccountInfoComponent,
  AccountSecureComponent,
  AccountAuthorizationComponent,
  AccountPreferenceComponent,

  NotificationSubscribeComponent,
  NotificationMainComponent,
  InnerMsgViewComponent,
  InnerMsgListComponent,
];
