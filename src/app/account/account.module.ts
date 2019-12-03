import { MessageService } from './service/message.service';
import { MessageReceiveConfigService } from './service/message-receive-config.service';
import { AccountService } from './service/account.service';
import { SystemPublicModule } from './../system/public/system-public.module';
import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountRoutingModule, accountRoutedComponents } from './account-routing.module';


@NgModule({
    imports: [
        SharedModule,
        SystemPublicModule,
        AccountRoutingModule,
    ],
    providers: [AccountService, MessageReceiveConfigService, MessageService],
    declarations: [...accountRoutedComponents],
    exports: []
})
export class AccountModule { }
