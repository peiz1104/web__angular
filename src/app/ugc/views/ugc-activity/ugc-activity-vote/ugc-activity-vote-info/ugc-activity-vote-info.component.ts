import { ActivatedRoute, UrlSegment } from '@angular/router';
import { UgcActivity } from '../../../../entity/ugc-activity';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'spk-ugc-activity-vote-info',
    templateUrl: './ugc-activity-vote-info.component.html',
    styleUrls: ['./ugc-activity-vote-info.component.scss']
})
export class UgcActivityVoteInfoComponent implements OnInit {

    ugcActivity: UgcActivity;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
        })
    }

}
