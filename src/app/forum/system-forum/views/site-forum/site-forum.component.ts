import { Component, OnInit } from '@angular/core';
import { Forum } from '../../../ordinary-forum/entity/forum';
import { ActivatedRoute } from '@angular/router';
import { SiteForumApiService } from '../../service/site-forum.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-site-forum',
    templateUrl: './site-forum.component.html',
    styleUrls: ['./site-forum.component.scss']
})
export class SiteForumComponent implements OnInit {

    forum: Forum;

    constructor(
        private route: ActivatedRoute,
        private siteForumApiService: SiteForumApiService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(({ siteForum }: { siteForum: Forum }) => {
            this.forum = siteForum;
        });
    }

    initCondition() {
        this.siteForumApiService.initForum().subscribe(
            ok => {
                this.forum = ok;
            },
            err => {
                tipMessage(err);
            }
        );
    }

}
