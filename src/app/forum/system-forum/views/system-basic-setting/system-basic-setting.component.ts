import { SystemForumSetting } from './../../entity/systemForumSetting';
import { Component, OnInit } from '@angular/core';
import { SystemForumSettingService } from '../../service/system-forum-setting.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-system-basic-setting',
    templateUrl: './system-basic-setting.component.html',
    styleUrls: ['./system-basic-setting.component.scss']
})
export class SystemBasicSettingComponent implements OnInit {

    forum: SystemForumSetting;

    constructor(
        private sysForumService: SystemForumSettingService
    ) {
    }

    ngOnInit() {
        this.sysForumService.getOne(255453).subscribe(
            forum => {
                this.forum = forum;
            },
            err => {
                tipMessage(err);
            }
        );
    }
}
