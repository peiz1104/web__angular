import { MessageReceiveConfig } from './../../entity/message-receive-config';
import { MessageReceiveConfigService } from './../../service/message-receive-config.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-notification-subscribe',
    templateUrl: './notification-subscribe.component.html',
    styleUrls: ['./notification-subscribe.component.scss']
})
export class NotificationSubscribeComponent implements OnInit {
    messageConfigs: MessageReceiveConfig[];
    constructor(private route: ActivatedRoute, private messageReceiveConfigService: MessageReceiveConfigService,
    ) { }

    ngOnInit() {
        this.findMessageReceiveConfig();
    }

    findMessageReceiveConfig() {
        this.messageReceiveConfigService.getAll().subscribe(
            configs => { this.messageConfigs = configs; },
            err => { tipMessage(err) }
        )
    }

    saveMessageReceiveConfig(editConfig: MessageReceiveConfig, operationFlag: string) {
        if (!editConfig.userId) {
            this.messageReceiveConfigService.create(editConfig).subscribe(
                config => { editConfig.userId = config.userId },
                err => { tipMessage(err) }
            );
        } else {
            let param = {
                userId: editConfig.userId,
            }
            if (operationFlag == 'email') {
                param['receiveEmail'] = editConfig.receiveEmail;
                this.messageReceiveConfigService.updateReceiveEmailConfig(param).subscribe(
                    config => { },
                    err => { tipMessage(err) }
                );
            } else {
                param['receiveSms'] = editConfig.receiveSms;
                this.messageReceiveConfigService.updateReceiveSmsConfig(param).subscribe(
                    config => { },
                    err => { tipMessage(err) }
                );
            }
        }
    }

    resetMessageConfig() {
        this.messageReceiveConfigService.resetMessageConfig().subscribe(
            ok => {
                this.findMessageReceiveConfig();
            },
            err => {
                tipMessage(err);
            }
        )
    }
}
