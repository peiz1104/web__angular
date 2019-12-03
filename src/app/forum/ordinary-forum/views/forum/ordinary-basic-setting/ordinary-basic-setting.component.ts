import { ActivatedRoute } from '@angular/router';
import { ForumService } from './../../../service/forum.service';
import { Forum } from './../../../entity/forum';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ordinary-basic-setting',
    templateUrl: './ordinary-basic-setting.component.html',
    styleUrls: ['./ordinary-basic-setting.component.scss']
})
export class OrdinaryBasicSettingComponent implements OnInit {

    forum: Forum;

    constructor(
        private forumService: ForumService,
        private route: ActivatedRoute,
        private _location: Location,
    ) {
    }

    ngOnInit() {
        let id;
        this.route.data.subscribe((data: { forum: Forum }) => {
            id = +data.forum.id;
            console.log(id);
            this.forumService.getOne(id).subscribe(
                form => {
                    this.forum = form;
                },
                err => {
                    tipMessage("获取活动讨论失败");
                    this._location.back();
                }
            );
        });
    }
}
